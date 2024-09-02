import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RuleTableAPIResponse } from "../types";
import { AddRule, RuleActivation, RuleConditions, RuleDetails, RuleRecord, RulesTypeConditions } from "../types/records/rule";
import { Option } from "../types/other"
import { CACHING_TIME } from "@/store/utils";

export const ruleEndPoints = (
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
    getAllRulesByName: builder.query<RuleTableAPIResponse, { searchQuery: string }>({
      query: ({ searchQuery }) => ({
        url: `/rules/${searchQuery}`,
        method: "GET",
      }),
      providesTags: ["Rules"],
      keepUnusedDataFor: CACHING_TIME,
    }),
    
    getRuleDetail: builder.query<RuleRecord, { id: string }>({
      query: ({ id}) => ({
        url: `/rules/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: 'RuleDetails', id }],
      keepUnusedDataFor: CACHING_TIME,
    }),

    getAllRulesTable: builder.query<RuleTableAPIResponse, { searchQuery: string }>({
        query: ({ searchQuery }) => ({
          url: `/rules/fetch${searchQuery}`,
          method: "GET",
        }),
        providesTags: ["Rules"],
        keepUnusedDataFor: CACHING_TIME,
    }),
    updateRuleActivation: builder.mutation<void, RuleActivation>({
      query: ({ ruleId, isActive }) => ({
        url: `/rules/${ruleId}/activation`,
        method: "PUT",
        params: { is_active: isActive },
      }),
      invalidatesTags: ["Rules"],
    }),
    addRule: builder.mutation<void, AddRule>({
      query: (data) => ({ 
        url: "/rules/create", 
        method: "POST", 
        body: data 
      }),
      invalidatesTags: ["Rules"],
    }),
    deleteRule: builder.mutation<void, { ruleId: string }>({
      query: ({ ruleId }) => ({
        url: `/rules/${ruleId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["HeadGroups" ,"RuleGroups", "Rules"],
    }),
    updateRuleDetails: builder.mutation<void, RuleDetails>({
      query: (data) => ({
        url: `/rules/${data.id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HeadGroups" ,"RuleGroups", "Rules"],
    }),
    getAllRulesTypes: builder.query<Option[], void>({
      query: () => ({ 
        url: "/supplementary/fetch_rule_types",
        method: "GET" 
      }),
      transformResponse: (response: { rule_types: string[] }): Option[] => {
        return response.rule_types.map(item => ({ 
          label: item.split("_").join(" "), value: item 
        }))
      },
    }),
    getRulesTypeConditions: builder.query<RuleConditions, { rule_type: string }>({
      query: (params) => ({
        url: `/supplementary/fetch_condition_types_and_params`,
        method: "GET",
        params,
      }),
      transformResponse: (response: RulesTypeConditions): RuleConditions => {
        const { field_names, condition_types, method, max_spike_percentage, pdp_count } = response
        const fieldNames = field_names.map(item => ({ 
          label: item.split("_").join(" "), value: item 
        }));
        const conditionTypes = condition_types.map(item => ({ 
          label: item.split("_").join(" "), value: item 
        }));
        const ruleMethod = method ? method.map(item => ({ 
          label: item.split("_").join(" "), value: item 
        })) :  null
        return { fieldNames, conditionTypes, method: ruleMethod, max_spike_percentage, pdp_count }
      },
    }),
});
