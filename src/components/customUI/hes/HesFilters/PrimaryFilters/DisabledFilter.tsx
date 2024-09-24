import AsyncSelect from 'react-select/async'

const DisabledFilter = () => {
    return (
        <>
            <AsyncSelect
                isMulti
                className={"md:min-w-[170px] flex-none"}
                placeholder={`Search Cluster`}
                isLoading={false}
                required={false}
                isDisabled={true}
            />
            <AsyncSelect
                isMulti
                className={"md:min-w-[170px] flex-none"}
                placeholder={`Search Zone`}
                isLoading={false}
                required={false}
                isDisabled={true}
            />
            <AsyncSelect
                isMulti
                className={"md:min-w-[170px] flex-none"}
                placeholder={`Search Circle`}
                isLoading={false}
                required={false}
                isDisabled={true}
            />
            <AsyncSelect
                isMulti
                className={"md:min-w-[170px] flex-none"}
                placeholder={`Search Div`}
                isLoading={false}
                required={false}
                isDisabled={true}
            />
            <AsyncSelect
                isMulti
                className={"md:min-w-[170px] flex-none"}
                placeholder={`Search Sub-Div`}
                isLoading={false}
                required={false}
                isDisabled={true}
            />
        </>
    )
}

export default DisabledFilter