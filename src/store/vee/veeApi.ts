import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery, VEE_TAG_TYPES } from "../utils";
import { summaryEndPoints } from "./endpoints/summary";
import { summaryDetailsEndPoints } from "./endpoints/summary-details";
import { headGroupEndPoints } from "./endpoints/head-groups";
import { ruleGroupEndPoints } from "./endpoints/rule-groups";
import { ruleEndPoints } from "./endpoints/rule";
import { estimationRuleEndPoints } from "./endpoints/estimation-rules";

const veeApi = createApi({
  reducerPath: "veeApi",
  baseQuery: customBaseQuery({
    baseUrl: `${import.meta.env.VITE_VEE_BASE_URL}/${import.meta.env.VITE_VEE_API_VERSION}/`,
    credentials: 'same-origin',
    setHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),

  tagTypes: VEE_TAG_TYPES,
  endpoints: (builder) => ({
    ...summaryEndPoints(builder),
    ...summaryDetailsEndPoints(builder),

    ...headGroupEndPoints(builder),
    ...ruleGroupEndPoints(builder),
    ...ruleEndPoints(builder),
    ...estimationRuleEndPoints(builder),
  }),
});

export const { 
  useGetGeneralSummaryDataQuery, 
  useGetSummaryGraphDetailsQuery,
  useGetSummaryTableDetailsQuery,

  useGetAllHeadGroupsTableQuery,
  useGetHeadGroupDetailTableQuery,
  useAddHeadGroupMutation,
  useUpdateHeadGroupDetailsMutation,
  useDeleteHeadGroupMutation,
  useAddRuleGroupToHeadGroupMutation,
  useAddRuleToHeadGroupMutation,

  useLazyGetAllRulesGroupsByNameQuery,
  useGetAllRuleGroupsTableQuery,
  useLazyGetAllRuleGroupsTableQuery,
  useGetRuleGroupDetailTableQuery,
  useAddRuleGroupMutation,
  useUpdateRuleGroupDetailsMutation,
  useDeleteRuleGroupMutation,
  useAddRuleToRuleGroupMutation,

  useLazyGetAllRulesByNameQuery,
  useGetAllRulesTableQuery,
  useLazyGetAllRulesTableQuery,
  useUpdateRuleActivationMutation,
  useDeleteRuleMutation,
  useAddRuleMutation,
  useGetAllRulesTypesQuery,
  useGetRulesTypeConditionsQuery,
  useLazyGetRulesTypeConditionsQuery,
  useUpdateRuleDetailsMutation,
  useGetRuleDetailQuery,

  useGetAllEstimationRulesTableQuery,
  useUpdateEstimationRuleActivationMutation,
  useAddEstimationRuleMutation,
  useUpdateEstimationRuleDetailsMutation,
  useDeleteEstimationRuleMutation,
  useGetAllEstimationRuleConditionsQuery,
  
  usePrefetch 
} = veeApi;

export default veeApi;
