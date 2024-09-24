import { lazy } from 'react';
import { Route, Outlet } from 'react-router-dom';

const Dashboard = lazy(() => import('@/pages/hes/dashboard'));
const BlockLoad = lazy(() => import('@/pages/hes/meter-profile-data/block-load'));
const DailyLoad = lazy(() => import('@/pages/hes/meter-profile-data/daily-load'));
const MonthlyBilling = lazy(() => import('@/pages/hes/meter-profile-data/monthly-billing'));
const InstantaneousProfile = lazy(() => import('@/pages/hes/meter-profile-data/instantaneous-profile'));
const PeriodicPush = lazy(() => import('@/pages/hes/meter-profile-data/periodic-push'));

const ScheduledReads = lazy(() => import('@/pages/hes/scheduled-reads'));
const CommandExecution = lazy(() => import('@/pages/hes/command-execution'));
const DeviceInformation = lazy(() => import('@/pages/hes/device-information'));
const ConfigureCommand = lazy(() => import('@/pages/hes/configure-command'));

const HesRoutes = (
  <Route path="/hes" element={<Outlet />}>
    <Route index element={<Dashboard />} />

    <Route path="meter-profile-data" element={<Outlet />}>
      <Route index element={<BlockLoad />} />
      <Route path="block-load" element={<BlockLoad />} />
      <Route path="daily-load" element={<DailyLoad />} />
      <Route path="monthly-billing" element={<MonthlyBilling />} />
      <Route path="instantaneous-profile" element={<InstantaneousProfile />} />
      <Route path="periodic-push" element={<PeriodicPush />} />
    </Route>

    <Route path="scheduled-reads" element={<ScheduledReads />} />
    <Route path="command-execution" element={<CommandExecution />} />
    <Route path="device-information" element={<DeviceInformation />} />
    <Route path="configure-command" element={<ConfigureCommand />} />
  </Route>
);

export default HesRoutes;
