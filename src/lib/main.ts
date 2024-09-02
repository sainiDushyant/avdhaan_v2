export const sidebarIconsUrlData = [
  "/assets/images/sidebar/dashboard.png",
  "/assets/images/sidebar/schedule.png",
  "/assets/images/sidebar/data-collection.png",
  "/assets/images/sidebar/vee.png",
  "/assets/images/sidebar/energy-audit.png",
  "/assets/images/sidebar/data-report.png",
  "/assets/images/sidebar/hes.png"
]

export const sidebarLinkData = [
  { to: "/dashboard/", title: "Dashboard" },
  { to: "/scheduling/", title: "Scheduling" },
  { to: "/data-acquisition/", title: "Data Acquisition" },
  { to: "/vee/", title: "Validation Estimation & Editing" },
  { to: "/energy-audit/", title: "Energy Audit" },
  { to: "/reports/", title: "Reports" },
  { to: "/hes", title: "Head End System", isNative: true },
]

export const navbarLinkData = [
  { to: "/hes/", title: "Dashboard" },
  { to: "/hes/scheduled-reads", title: "Scheduled Reads" },
  {
    to: "/hes/live-data", title: "Live Data", children: [
      { to: "/hes/live-data/block-load", title: "Block Load" },
      { to: "/hes/live-data/daily-load", title: "Daily Load" },
      { to: "/hes/live-data/monthly-billing", title: "Monthly Billing" },
      { to: "/hes/live-data/instantaneous-profile", title: "Instantaneous Profile" },
    ]
  },
  { to: "/hes/command-execution", title: "Command Execution" },
]