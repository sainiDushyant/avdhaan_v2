import { ErrorInfo } from "react";

export const logError = (error: Error, info: ErrorInfo) => {
    // Do something with the error, e.g. log to an external API
    console.error(error)
    console.error(info)
};