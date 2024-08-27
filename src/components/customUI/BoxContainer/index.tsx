import { ReactNode } from "react"

const BoxContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-[60vh] min-w-full flex justify-center items-center">
            {children}
        </div>
    )
}

export default BoxContainer;