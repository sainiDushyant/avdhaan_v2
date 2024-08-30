import {  useSearchParams } from "react-router-dom";
import BlockLoadTable from "./includes/blockLoadTable";
import { useState } from "react";
const BlockLoad = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const mapParams = (params: URLSearchParams) => {
        const mappedParams = new URLSearchParams();
        if (params.has("site_ids")) mappedParams.set("site_id", params.get("site_ids")!);
        if (params.has("pss_ids")) mappedParams.set("pss_id", params.get("pss_ids")!);
        if (params.has("feeder_ids")) mappedParams.set("feeder_id", params.get("feeder_ids")!);
        if (params.has("dtr_ids")) mappedParams.set("dtr_id", params.get("dtr_ids")!);
        return mappedParams;
    };
    const mappedSearchParams = mapParams(searchParams);;

    return (
        <div className="px-5 py-3 w-full">
            <div className="flex relative flex-col md:flex-row mt-8">
                
                <div className=" p-5 flex-1 overflow-x-scroll">
                    <h1 className="capitalize secondary-title lg:main-title">
                        <span className="font-bold text-[#0A3690] p-2">Block Load</span>
                    </h1>
                   


                    <div className="">
                        <BlockLoadTable groupName={'Block Load'} search={mappedSearchParams.toString()} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlockLoad