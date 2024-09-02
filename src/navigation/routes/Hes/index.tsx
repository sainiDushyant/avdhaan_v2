import { lazy } from "react";
import {
    Route,
    Outlet,
} from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/hes/dashboard"));
const LiveData = lazy(() => import("@/pages/hes/live-data"));
const BlockLoad = lazy(() => import("@/pages/hes/live-data/block-load"));
const DailyLoad = lazy(() => import("@/pages/hes/live-data/daily-load"));
const MonthlyBilling = lazy(() => import("@/pages/hes/live-data/monthly-billing"));
const InstantaneousProfile = lazy(() => import("@/pages/hes/live-data/instantaneous-profile"));
const ScheduledReads = lazy(() => import("@/pages/hes/scheduled-reads"));
const CommandExecution = lazy(() => import("@/pages/hes/command-execution"));

const HesRoutes = (
        <Route path="/hes" element={<Outlet />}>

            <Route index element={<Dashboard />} />

            <Route path="live-data" element={<Outlet />}>
                <Route index element={<LiveData />} />
                <Route path="block-load" element={<BlockLoad />} />
                <Route path="daily-load" element={<DailyLoad />} />
                <Route path="monthly-billing" element={<MonthlyBilling />} />
                <Route path="instantaneous-profile" element={<InstantaneousProfile />} />
            </Route>

            <Route path="scheduled-reads" element={<ScheduledReads />} />
            <Route path="command-execution" element={<CommandExecution />} />

        </Route>
)

export default HesRoutes;