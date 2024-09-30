import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { HESTokenResponse } from "../../types";
import { HESAuthToken } from "../../types/records/login";

export const loginEndpoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    "hesApi"
  >
) => ({
    updateTokenForAuth: builder.mutation<HESAuthToken, { authID: string }>({
        query: (data) => ({ 
          url: "/auth/token", 
          method: "POST", 
          body: data
        }),
        transformResponse: (response: HESTokenResponse): HESAuthToken  => {
            if(!response.data.records) return { token: "" }
            return response.data.records[0]
        },
    }),
});
