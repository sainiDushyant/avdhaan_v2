import useGetBasePath from "@/hooks/useGetBasePath";

const GroupDetailsHeader = () => {
    
    const basePath = useGetBasePath(1);
    return (
        <div className="w-full lg:w-auto flex items-center gap-x-6 p-5 my-3">
            <h1 className="capitalize secondary-title lg:main-title text-[#0A3690] font-medium">
                {basePath} Summary
            </h1>
        </div>
    )
}

export default GroupDetailsHeader