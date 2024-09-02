import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import MainOutlet from "./MainOutlet";

const Home = lazy(() => import("@/pages/home"));
import HesRoutes from "./routes/Hes";
import VeeRoutes from "./routes/Vee";

const NotFound = lazy(() => import("@/pages/not-found"));

function Navigation() {
  return (
    <Router>
      <Suspense fallback={<FullScreen hasSpinner={true} />}>
        <Routes>

        <Route path="/" element={<MainOutlet />}>

            <Route index element={<Home />} />

            {HesRoutes}
            {VeeRoutes}

          <Route path="*" element={<NotFound />} />

        </Route>

        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
