import { FC } from "react";

interface CaretRightProps {
    height?: string;
    width?: string;
    customFill?: string;
    customCss?: string;
}

const CaretRight: FC<CaretRightProps> = ({ height, width, customFill, customCss }) => {

    const fill = customFill || "#000000";

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "30px"}
            height={height || "30px"}
            viewBox="0 0 24 24"
            fill={"none"}
            className={customCss}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.79289 6.29289C9.18342 5.90237 9.81658 5.90237 10.2071 6.29289L15.2071 11.2929C15.5976 11.6834 15.5976 12.3166 15.2071 12.7071L10.2071 17.7071C9.81658 18.0976 9.18342 18.0976 8.79289 17.7071C8.40237 17.3166 8.40237 16.6834 8.79289 16.2929L13.0858 12L8.79289 7.70711C8.40237 7.31658 8.40237 6.68342 8.79289 6.29289Z"
                fill={fill}
                className="svg-path"
            />
        </svg>

    )
}

export default CaretRight