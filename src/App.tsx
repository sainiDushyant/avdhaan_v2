import Navigation from "./navigation";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { fetchToken } from "./lib/utils";
import "./index.css";

const error = console.error;
console.error = (...args: string[]) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const App = () => {

  useEffect(() => {


    fetchToken();
  }, []);

  return (
    <main className="theme">
      <Toaster />
      <Navigation />
    </main>
  );
}

export default App;
