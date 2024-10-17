import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import {
  BatchCommandHistoryResponse,
  CommandHistoryResponse,
  CommandInfoResponse,
  ExecutionHistoryDetailsResponse,
  ExecutionHistoryDetailsResponseModified,
  ResponseBaseWithOutPagination,
  UploadCSVFileResponse
} from '../../types';
import {
  CommandInfoRecordTransformed,
  ExecuteCommandPayload,
  ExecutionHistoryDetailsRecordModified
} from '../../types/records/command-execution';

export const commandExecutionEndpoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    'hesApi'
  >
) => ({
  getCommandInfo: builder.query<
    CommandInfoRecordTransformed[],
    { name?: string; limit?: number }
  >({
    query: (searchQuery) => ({
      url: `/command-execution/command-info`,
      method: 'GET',
      params: searchQuery
    }),
    transformResponse: (
      response: CommandInfoResponse
    ): CommandInfoRecordTransformed[] => {
      return response.data.records.map((record) => ({
        ...record,
        label: record.name,
        value: record.name
      }));
    }
  }),
  getBatchCommandExecutionHistory: builder.query<
    BatchCommandHistoryResponse,
    { searchParams: string }
  >({
    query: ({ searchParams }) => ({
      url: `/command-execution/batch-execution-history${searchParams}`,
      method: 'GET'
    }),
    providesTags: ['batch-execution-history']
  }),
  getCommandExecutionHistory: builder.query<
    CommandHistoryResponse,
    { searchParams: string }
  >({
    query: ({ searchParams }) => ({
      url: `/command-execution/execution-history${searchParams}`,
      method: 'GET'
    })
  }),
  executeCommand: builder.mutation<
    ResponseBaseWithOutPagination<null>,
    ExecuteCommandPayload
  >({
    query: (data) => ({
      url: '/command-execution/execute-command',
      method: 'POST',
      body: data
    }),
    invalidatesTags: ['batch-execution-history']
  }),
  uploadFileWithProgress: builder.mutation<
    UploadCSVFileResponse,
    {
      formData: FormData;
      onProgress: (progress: number) => void;
      signal: AbortSignal; // Accept AbortSignal to handle cancellation
    }
  >({
    queryFn: async ({ formData, onProgress, signal }) => {
      const baseUrl = `${import.meta.env.VITE_HES_BASE_URL}/${
        import.meta.env.VITE_HES_API_VERSION
      }/device-management/upload-device-identifier-list`;

      return new Promise((resolve, reject) => {
        // Initialize XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Open the request
        xhr.open('POST', baseUrl);

        // Set Authorization header if token exists
        const token = sessionStorage.getItem('hes_token');
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        // Monitor the upload progress
        xhr.upload.onprogress = function (e: ProgressEvent<EventTarget>) {
          const percentComplete = Math.ceil((e.loaded / e.total) * 100);
          onProgress(percentComplete); // Update progress
        };

        // Handle successful response
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ data: JSON.parse(xhr.responseText) });
          } else {
            reject({
              error: { status: xhr.status, data: xhr.responseText }
            });
          }
        };

        // Handle errors during the request
        xhr.onerror = () => {
          reject({
            error: { status: xhr.status, data: xhr.responseText }
          });
        };

        // Listen for request cancellation via AbortSignal
        signal.addEventListener('abort', () => {
          xhr.abort(); // Abort the XMLHttpRequest
          reject({ error: { status: xhr.status, data: 'Upload aborted!' } });
        });

        // Send the formData to the server
        xhr.send(formData);
      });
    }
  }),

  uploadCSVfile: builder.mutation<UploadCSVFileResponse, FormData>({
    query: (data) => ({
      url: 'device-management/upload-device-identifier-list',
      method: 'POST',
      body: data
    })
  }),
  getCommandExecutionHistoryDetails: builder.query<
    ExecutionHistoryDetailsResponseModified,
    { searchParams: string }
  >({
    query: ({ searchParams }) => ({
      url: `/command-execution/command-response${searchParams}`,
      method: 'GET'
    }),
    transformResponse: (
      response: ExecutionHistoryDetailsResponse
    ): ExecutionHistoryDetailsResponseModified => {
      const records = response.data.records.map((record) => {
        const { response, pendingStatusReason, ...rest } = record;
        let finalResponse: ExecutionHistoryDetailsRecordModified = { ...rest };
        if (pendingStatusReason)
          finalResponse['pendingStatusReason'] = pendingStatusReason.reason;
        if (response) {
          const { responseData, ...other } = response;
          finalResponse = { ...finalResponse, ...other };
          if (responseData) {
            finalResponse = { ...finalResponse, ...responseData };
          }
        }

        return finalResponse;
      });

      return {
        ...response,
        data: {
          ...response.data,
          records
        }
      };
    }
  })
});
