import Navigation from "./navigation";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/customUI/ErrorBoundary/Fallback";
import { Toaster } from "@/components/ui/toaster";
import { logError } from "./components/customUI/ErrorBoundary/utils";
import "./index.css";


const App = () => {
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
