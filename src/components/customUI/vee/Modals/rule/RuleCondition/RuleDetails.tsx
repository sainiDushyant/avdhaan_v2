import { FC } from "react";
import { RuleRecord } from "@/store/vee/types/records/rule";
import { Input } from "@/components/ui/input";

interface RuleDetailsProps {
  ruleDetails: RuleRecord;
  cb?: () => void;
}

const RuleDetails: FC<RuleDetailsProps> = ({ ruleDetails }) => {
  return (
    <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto scrollable-content-all">
      <div className="space-y-2">
        <label htmlFor="rule-name">Rule Name</label>
        <Input
          name="rule-name"
          defaultValue={ruleDetails.name}
          disabled
          style={{ opacity: "0.8", cursor: "text" }}
          className="flex flex-wrap h-auto"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="rule-description">Rule Description</label>
        <textarea
          readOnly
          name="rule-description"
          defaultValue={ruleDetails.description}
          disabled
          style={{ opacity: "0.8", cursor: "text", resize: "none" }}
          className="w-full h-auto rounded-md  border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      {ruleDetails.condition.type && ruleDetails.condition.type !== null && (
        <div className="space-y-2">
          <label htmlFor="type">Rule Type</label>
          <Input
            name="type"
            defaultValue={ruleDetails.condition.type}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto"
          />
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="field_name">Field Name</label>
        <Input
          name="field_name"
          defaultValue={ruleDetails.condition.field_name}
          disabled
          style={{ opacity: "0.8", cursor: "text" }}
          className="flex flex-wrap h-auto"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="condition_type">Condition Type</label>
        <Input
          name="condition_type"
          defaultValue={ruleDetails.condition.condition_type}
          disabled
          style={{ opacity: "0.8", cursor: "text" }}
          className="flex flex-wrap h-auto"
        />
      </div>

      {ruleDetails.condition.first_value !== null && (
        <div className="space-y-2">
          <label htmlFor="first_value">First Value</label>
          <Input
            name="first_value"
            defaultValue={ruleDetails.condition.first_value}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto"
          />
        </div>
      )}
      {ruleDetails.condition.second_value !== null && (
        <div className="space-y-2">
          <label htmlFor="second_value">Second Value</label>
          <Input
            name="second_value"
            defaultValue={ruleDetails.condition.second_value}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto"
          />
        </div>
      )}
      {ruleDetails.condition.method !== null && (
        <div className="space-y-2">
          <label htmlFor="second_value">Method</label>
          <Input
            name="method"
            defaultValue={ruleDetails.condition.method}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto"
          />
        </div>
      )}
      {ruleDetails.condition.pdp_count !== null && (
        <div className="space-y-2">
          <label htmlFor="second_value">Previous data point count</label>
          <Input
            name="method"
            defaultValue={ruleDetails.condition.pdp_count}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto"
          />
        </div>
      )}
      {ruleDetails.condition.max_spike_percentage !== null && (
        <div className="space-y-2">
          <label htmlFor="second_value">Max Spike Percentage</label>
          <Input
            name="method"
            defaultValue={ruleDetails.condition.max_spike_percentage}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto"
          />
        </div>
      )}
      {ruleDetails.condition.other_params !== null &&
        ruleDetails.condition.other_params.length > 0 && (
          <div className="space-y-2">
            <label htmlFor="other_params">Other Params</label>
            {ruleDetails.condition.other_params.map((param, index) => (
              <Input
                key={`${param}_${index}`}
                name={index === 0 ? "other_params" : `param_${index}`}
                defaultValue={param}
                disabled
                style={{ opacity: "0.8", cursor: "text" }}
                className="flex flex-wrap h-auto"
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default RuleDetails;
