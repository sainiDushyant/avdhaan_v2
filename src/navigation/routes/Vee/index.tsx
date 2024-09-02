import { lazy } from "react";
import {
    Route,
    Outlet,
} from "react-router-dom";

const VeeSummary = lazy(() => import('@/pages/vee/summary'));
const VeeSummaryDetails = lazy(() => import('@/pages/vee/summary/details'));
const ValidationSummaryDetails = lazy(() => import('@/pages/vee/summary/details'));

const AllHeadGroups = lazy(() => import('@/pages/vee/headgroups'));
const AllRuleGroups = lazy(() => import('@/pages/vee/rulegroups'));
const AllRules = lazy(() => import('@/pages/vee/rules'));
const EstimationRules = lazy(() => import('@/pages/vee/estimation'));

const HeadGroupDetails = lazy(() => import('@/pages/vee/headgroups/details'));
const RulegroupDetails = lazy (() => import('@/pages/vee/rulegroups/details'));

const AddHeadGroup = lazy(() => import('@/pages/vee/headgroups/add'));
const AddRuleGroup = lazy(() => import('@/pages/vee/rulegroups/add'));
const AddRule = lazy(() => import('@/pages/vee/rules/add'));
const AddEstimationRules = lazy(() => import('@/pages/vee/estimation/add'));



const VeeRoutes = (
    <Route path="/vee" element={<Outlet />} >

        <Route index element={<VeeSummary />} />

        <Route path="validation" element={<Outlet />} >
            <Route index element={<VeeSummary />} />
            <Route path="details" element={<Outlet />} >
                <Route index element={<ValidationSummaryDetails />} />
            </Route>
        </Route>

        <Route path="estimation" element={<Outlet />} >
            <Route index element={<VeeSummary />} />
            <Route path="details" element={<Outlet />} >
                <Route index element={<VeeSummaryDetails />} />
            </Route>
        </Route>

        <Route path="editing" element={<Outlet />} >
            <Route index element={<VeeSummary />} />
            <Route path="details" element={<Outlet />} >
                <Route index element={<VeeSummaryDetails />} />
            </Route>
        </Route>

        <Route path="headgroups" element={<Outlet />} >
            <Route index element={<AllHeadGroups />} />
            <Route path="add" element={<AddHeadGroup />} />
            <Route path=":headGroupId" element={<HeadGroupDetails />} />
        </Route>

        <Route path="rulegroups" element={<Outlet />} >
            <Route index element={<AllRuleGroups />} />
            <Route path="add" element={<AddRuleGroup />} />
            <Route path=":ruleGroupId" element={<RulegroupDetails />} />
        </Route>

        <Route path="rules" element={<Outlet />} >
            <Route index element={<AllRules />} />
            <Route path="add" element={<AddRule />} />
        </Route>

        <Route path="estimation-rules" element={<Outlet />} >
            <Route index element={<EstimationRules />} />
            <Route path="add" element={<AddEstimationRules />} />
        </Route>

    </Route>
)

export default VeeRoutes;