const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'entries' },
      { path: 'entries', component: () => import('pages/PageEntries.vue') },
      { path: 'charts', component: () => import('pages/PageCharts.vue') }, // Page where IDs will be received
      { path: 'settings', component: () => import('pages/PageSettings.vue') },
      { path: 'table', component: () => import('pages/PageTable.vue') },
    ],
  },

  // Catch-all for undefined routes
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
