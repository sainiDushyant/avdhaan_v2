import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import Button from "@/components/ui/button";

const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert" className="w-screen h-screen flex flex-col items-center justify-center">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }} className="text-wrap">{error.message}</pre>
            <Button
                type="submit" variant="ghost"
                onClick={resetErrorBoundary}
                className="w-auto h-[40px] md:flex-none px-5 hover:bg-[none] hover:text-[none] primary-vee-btn select-none"
            >
                Reset App
            </Button>
        </div>
    );
}

export default Fallback