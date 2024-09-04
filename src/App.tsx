import Navigation from "./navigation";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./index.css";

const error = console.error;
console.error = (...args: string[]) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const App = () => {

  useEffect(() => {
    const fetchToken = async () => {
      let token: string | null = localStorage.getItem('token');

      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Token is expired, fetching a new one...");
          token = await getNewToken();
        }
      } else {
        token = await getNewToken();
      }

      if (token) {
        console.log("Token is valid or newly fetched");
      }
    };

    const getNewToken = async (): Promise<string | null> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_HES_BASE_URL}/v1/auth/token`, {
          method: 'POST',
          body: JSON.stringify({
            "authID": "bdf234d4-e1bb-4df3-a27e-433d596b808c"
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        });

        const data = await response.json();

        if (data) {
          const newToken = data?.data?.records[0]?.token;
          localStorage.setItem('token', newToken);
          return newToken;
        } else {
          console.error("Failed to get the new token");
          return null;
        }
      } catch (error) {
        console.error("Error fetching new token:", error);
        return null;
      }
    };

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
