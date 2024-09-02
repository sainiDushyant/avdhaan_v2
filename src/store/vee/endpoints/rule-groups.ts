import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RuleGroupDetailAPIResponse, RuleGroupTableAPIResponse } from "../types";
import { BaseObjWithoutId } from "../types/records";
import { CACHING_TIME } from "@/store/utils";
import { UpdateRuleGroup } from "../types/records/rule-groups";

export const ruleGroupEndPoints = (
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
    getAllRulesGroupsByName: builder.query<RuleGroupTableAPIResponse, { searchQuery: string }>({
      query: ({ searchQuery }) => ({
        url: `/rulegroups/${searchQuery}`,
        method: "GET",
      }),
      providesTags: ['RuleGroups'],
      keepUnusedDataFor: CACHING_TIME,
    }),
    getAllRuleGroupsTable: builder.query<RuleGroupTableAPIResponse, { searchQuery: string }>({
        query: ({ searchQuery }) => ({
          url: `/rulegroups/fetch${searchQuery}`,
          method: "GET",
        }),
        providesTags: ['RuleGroups'],
        keepUnusedDataFor: CACHING_TIME,
    }),
    getRuleGroupDetailTable: builder.query<RuleGroupDetailAPIResponse, { id: string }>({
        query: ({ id}) => ({
          url: `/rulegroups/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, { id }) => [{ type: 'RuleGroupDetails', id }],
        keepUnusedDataFor: CACHING_TIME,
    }),
    addRuleGroup: builder.mutation<void, BaseObjWithoutId>({
      query: (data) => ({ 
        url: "/rulegroups/create", 
        method: "POST", 
        body: data 
      }),
      invalidatesTags: ['RuleGroups'],
    }),
    updateRuleGroupDetails: builder.mutation<void, UpdateRuleGroup>({
      query: (data) => ({ 
        url: `/rulegroups/${data.id}/update`, 
        method: 'PUT', 
        body: {  } 
      }),
      invalidatesTags: (result, error, { id, }) => ['RuleGroups', { type: 'RuleGroupDetails', id }],
    }),
    deleteRuleGroup: builder.mutation<void, { id: string }>({
      query: ({id}) => ({ 
        url: `rulegroups/${id}/delete`, 
        method: 'DELETE' 
      }),
      invalidatesTags: ['HeadGroups', 'RuleGroups'],
    }),
    addRuleToRuleGroup: builder.mutation<void, { ruleGroupId: string, ruleIds: string[] }>({
      query: ({ ruleGroupId, ruleIds }) => ({
        url: `/rulegroups/${ruleGroupId}/rules/add`,
        method: 'POST', body: ruleIds
      }),
      invalidatesTags: (result, error, { ruleGroupId }) => [{ type: 'RuleGroupDetails', id: ruleGroupId }],
    }),
});
