import { FC } from "react";
import BoxContainer from "@/components/customUI/BoxContainer";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import Spinner from "@/components/customUI/Loaders/Spinner";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


interface CommandHistoryHelperProps {
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const CommandHistoryHelper: FC<CommandHistoryHelperProps> = ({ isLoading, isError, error }) => {

  if (isLoading) return (
    <BoxContainer>
      <Spinner />
    </BoxContainer>
  )

  if (isError) return <ErrorScreen error={error as object} customCss="h-auto min-h-[40vh]" />

  return null;
}

export default CommandHistoryHelper