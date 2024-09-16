const Eye = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill={"none"}
            stroke="#0A3690"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 cursor-pointer"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx={12} cy={12} r={3} />
        </svg>
    )
}

export default Eye