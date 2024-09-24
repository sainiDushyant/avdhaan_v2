import { useGetCommandInfoQuery } from "@/store/hes/hesApi";

const useCommandOptions = () => {

    const { data, isLoading } = useGetCommandInfoQuery({ limit: 500 });

    return {
        commandData: data, 
        commandLoading: isLoading,
    }
}

export default useCommandOptions