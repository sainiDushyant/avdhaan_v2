import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EstimationRuleAPIResponse } from "../types";
import { CACHING_TIME } from "@/store/utils";
import { RuleActivation } from "../types/records/rule";
import { EstimationParameters, EstimationParams, EstimationRuleMutation } from "../types/records/estimation-rules";
import { MeterInfo } from "../types/records/head-groups";

export const estimationRuleEndPoints = (
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
    getAllEstimationRulesTable: builder.query<EstimationRuleAPIResponse, { searchQuery: string }>({
        query: ({ searchQuery }) => ({
          url: `/estimations_rules/${searchQuery}`,
          method: "GET",
        }),
        providesTags: ["EstimationRules"],
        keepUnusedDataFor: CACHING_TIME,
    }),
    updateEstimationRuleActivation: builder.mutation<void, RuleActivation>({
      query: ({ ruleId, isActive }) => ({
        url: `/estimations_rules/${ruleId}/set_default`,
        method: "PUT",
        params: { is_default: isActive },
      }),
      invalidatesTags: ["EstimationRules"],
    }),
    addEstimationRule: builder.mutation<void, EstimationRuleMutation>({
      query: (data) => ({ 
        url: "/estimations_rules/create", 
        method: "POST", 
        body: data 
      }),
      invalidatesTags: ["EstimationRules"],
    }),
    updateEstimationRuleDetails: builder.mutation<void, {ruleId: string; data: EstimationRuleMutation}>({
      query: ({ ruleId, data }) => ({
        url: `/estimations_rules/${ruleId}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EstimationRules"],
    }),
    deleteEstimationRule: builder.mutation<void, { ruleId: string }>({
      query: ({ ruleId }) => ({
        url: `/estimations_rules/${ruleId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["EstimationRules"],
    }),
    getAllEstimationRuleConditions: builder.query<EstimationParams, MeterInfo>({
      query: (params) => ({ 
        url: "/estimations_rules/create_rule_essentials",
        method: "GET",
        params
      }),
      transformResponse: (response: EstimationParameters): EstimationParams => {
        const methods = response.methods.map(item => ({  label: item, value: item }));
        const selectionType = response.selection_type.map(item => ({ 
          label: item.split("_").join(" "), value: item 
        }));
        return {
          methods, params: response.params, 
          selection_type: selectionType,
          previousDataPointCount: response.previous_data_point_count
        }
      },
    }),
});
