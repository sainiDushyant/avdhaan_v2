import { type FC } from "react";

interface EmptyScreenProps {
    title: string;
    description?: string;
}

const EmptyScreen: FC<EmptyScreenProps> = ({ title, description }) => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold capitalize">{title}</h2>
            {description && <p className="text-md italic">{description}</p>}
        </div>
    );
};

export default EmptyScreen;
