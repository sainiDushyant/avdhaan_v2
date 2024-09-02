import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {  HeadGroupDetailAPIReponse, HeadGroupTableAPIResponse } from "../types";
import { AddHeadGroup, EditHeadGroup } from "../types/records/head-groups";
import { CACHING_TIME } from "@/store/utils";

export const headGroupEndPoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    "veeApi"
  >
) => ({
  getAllHeadGroupsTable: builder.query<HeadGroupTableAPIResponse, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `/headgroups/${searchQuery}`,
      method: "GET",
    }),
    providesTags: ['HeadGroups'],
    keepUnusedDataFor: CACHING_TIME,
  }),
  getHeadGroupDetailTable: builder.query<HeadGroupDetailAPIReponse, { id: string }>({
    query: ({ id}) => ({
      url: `/headgroups/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, { id }) => [{ type: 'HeadGroupDetails', id }],
    keepUnusedDataFor: CACHING_TIME,
  }),
  addHeadGroup: builder.mutation<void, AddHeadGroup>({
    query: (data) => ({ 
      url: "/headgroups/create", 
      method: "POST", 
      body: data, 
    }),
    invalidatesTags: ['HeadGroups'],
  }),
  updateHeadGroupDetails: builder.mutation<void, EditHeadGroup>({
    query: (data) => ({ 
      url: `/headgroups/${data.id}/update`, 
      method: 'PUT', 
      body: data 
    }),
    invalidatesTags: (result, error, { id }) => ['HeadGroups', { type: 'HeadGroupDetails', id }],
  }),
  deleteHeadGroup: builder.mutation<void, { id: string }>({
    query: ({ id }) => ({ 
        url: `/headgroups/${id}/delete`, 
        method: 'DELETE' 
    }),
    invalidatesTags: ['HeadGroups'],
  }),
  addRuleGroupToHeadGroup: builder.mutation<void, { headGroupId: string, ruleGroupIds: string[] }>({
    query: ({ headGroupId, ruleGroupIds }) => ({ 
      url: `/headgroups/${headGroupId}/groups/add`, 
      method: 'POST', 
      body: ruleGroupIds
    }),
    invalidatesTags: (result, error, { headGroupId }) => [{ type: 'HeadGroupDetails', id: headGroupId }],
  }),
  addRuleToHeadGroup: builder.mutation<void, { headGroupId: string, ruleIds: string[] }>({
    query: ({headGroupId, ruleIds}) => ({
      url: `/headgroups/${headGroupId}/rules/add`,
      method: 'POST', 
      body: ruleIds
    }),
    invalidatesTags: (result, error, { headGroupId }) => [{ type: 'HeadGroupDetails', id: headGroupId }],
  }),
});
        