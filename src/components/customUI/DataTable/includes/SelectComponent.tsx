import { useMemo, useCallback } from "react";
import Button from "@/components/ui/button";

const SelectComponent = (data: {
  selected: { id: string }[];
  onSelectSubmit?: (selectedItemIds: string[]) => void;
}) => {
  const selectedIds = useMemo(() => {
    return data.selected.map((item) => item.id);
  }, [data]);

  const handleClick = useCallback(() => {
    if (data.onSelectSubmit) data.onSelectSubmit(selectedIds);
  }, [ data, selectedIds ]);

  if (selectedIds.length === 0) return null;

  return (
    <Button
      variant="destructive"
      className="absolute top-1/2 transform -translate-y-1/2"
      onClick={handleClick}
    >
      Remove
    </Button>
  );
};

export default SelectComponent;