export const sidebarIconsUrlData = [
  '/assets/images/sidebar/dashboard.png',
  '/assets/images/sidebar/schedule.png',
  '/assets/images/sidebar/data-collection.png',
  '/assets/images/sidebar/vee.png',
  '/assets/images/sidebar/energy-audit.png',
  '/assets/images/sidebar/data-report.png',
  '/assets/images/sidebar/hes.png'
];

export const sidebarLinkData = [
  { to: '/dashboard/', title: 'Dashboard' },
  { to: '/scheduling/', title: 'Scheduling' },
  { to: '/data-acquisition/', title: 'Data Acquisition' },
  { to: '/vee/', title: 'Validation Estimation & Editing' },
  { to: '/energy-audit/', title: 'Energy Audit' },
  { to: '/reports/', title: 'Reports' },
  { to: '/hes', title: 'Head End System', isNative: true }
];

export const navbarLinkData = [
  { to: '/hes', title: 'Dashboard' },
  { to: '/hes/scheduled-reads', title: 'Scheduled Reads' },
  {
    to: '/hes/meter-profile-data',
    title: 'Meter Profile Data',
    children: [
      { to: '/hes/meter-profile-data/block-load', title: 'Block Load' },
      { to: '/hes/meter-profile-data/daily-load', title: 'Daily Load' },
      {
        to: '/hes/meter-profile-data/monthly-billing',
        title: 'Monthly Billing'
      },
      {
        to: '/hes/meter-profile-data/instantaneous-profile',
        title: 'Instantaneous Profile'
      },
      { to: '/hes/meter-profile-data/periodic-push', title: 'Periodic Push' }
    ]
  },
  {
    to: '/hes/command',
    title: 'Command',
    children: [
      {
        to: '/hes/command/command-execution-history',
        title: 'Command Execution History'
      }
    ]
  },
  { to: '/hes/device-information', title: 'Device Information' },
  { to: '/hes/configure-command', title: 'Configure Command ' }
];
