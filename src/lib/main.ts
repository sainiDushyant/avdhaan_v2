export const sidebarIconsUrlData = [
  "/hes/assets/images/sidebar/dashboard.png",
  "/hes/assets/images/sidebar/schedule.png",
  "/hes/assets/images/sidebar/data-collection.png",
  "/hes/assets/images/sidebar/vee.png",
  "/hes/assets/images/sidebar/energy-audit.png",
  "/hes/assets/images/sidebar/data-report.png",
  "/hes/assets/images/sidebar/hes.png"
]

export const sidebarLinkData = [
  { to: "/dashboard/", title: "Dashboard" },
  { to: "/scheduling/", title: "Scheduling" },
  { to: "/data-acquisition/", title: "Data Acquisition" },
  { to: "/validation/", title: "Validation Estimation & Editing" },
  { to: "/energy-audit/", title: "Energy Audit" },
  { to: "/reports/", title: "Reports" },
  { to: "/", title: "Head End System", isNative: true },
]

export const navbarLinkData = [
  { to: "/", title: "Dashboard" },
  { to: "/scheduled-reads", title: "Scheduled Reads" },
  {
    to:'#', title: "Live Data", children: [
      { to: "live-data/block-load", title: "Block Load" },
      { to: "live-data/daily-load", title: "Daily Load" },
      { to: "live-data/monthly-billing", title: "Monthly Billing" },
      { to: "live-data/instantaneous-profile", title: "Instantaneous Profile" },
    ]
  },
  { to: "/command-execution", title: "Command Execution" },
]