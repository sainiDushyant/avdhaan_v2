import { useEffect } from "react";
import Navigation from "./navigation";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/customUI/ErrorBoundary/Fallback";
import { Toaster } from "@/components/ui/toaster";
import { fetchToken } from "./lib/utils";
import { logError } from "./components/customUI/ErrorBoundary/utils";
import "./index.css";

// const error = console.error;
// console.error = (...args: string[]) => {
//   if (/defaultProps/.test(args[0])) return;
//   error(...args);
// };

const App = () => {

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <ErrorBoundary 
      FallbackComponent={Fallback}
      onError={logError}
    >
      <main className="theme">
        <Toaster />
        <Navigation />
      </main>
    </ErrorBoundary>
  );
}

export default App;
