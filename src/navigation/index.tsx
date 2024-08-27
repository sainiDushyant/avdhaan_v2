import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import MainOutlet from "./MainOutlet";

const Dashboard = lazy(() => import("@/pages/hes/dashboard"));
const LiveData = lazy(() => import("@/pages/hes/live-data"));
const BlockLoad = lazy(() => import("@/pages/hes/live-data/block-load"));
const DailyLoad = lazy(() => import("@/pages/hes/live-data/daily-load"));
const MonthlyBilling = lazy(() => import("@/pages/hes/live-data/monthly-billing"));
const InstantaneousProfile = lazy(() => import("@/pages/hes/live-data/instantaneous-profile"));

const NotFound = lazy(() => import("@/pages/not-found"));

function Navigation() {
  return (
    <Router basename="/hes/">
      <Suspense fallback={<FullScreen hasSpinner={true} />}>
        <Routes>

          <Route path="/" element={<MainOutlet />}>

            <Route index element={<Dashboard />} />

            <Route path="live-data" element={<Outlet />}>
              <Route index element={<LiveData />} />
              <Route path="block-load" element={<BlockLoad />} />
              <Route path="daily-load" element={<DailyLoad />} />
              <Route path="monthly-billing" element={<MonthlyBilling />} />
              <Route path="instantaneous-profile" element={<InstantaneousProfile />} />
            </Route>

          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
