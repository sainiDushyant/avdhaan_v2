import Navigation from "./navigation";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";

const error = console.error;
console.error = (...args: string[]) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const App = () => {
  return (
    <main className="theme">
      <Toaster />
      <Navigation />
    </main>
  );
}

export default App;
