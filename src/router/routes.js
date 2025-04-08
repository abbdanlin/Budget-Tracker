const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'entries' },
      { path: 'entries', component: () => import('pages/PageEntries.vue') },
      { path: 'charts', component: () => import('pages/PageCharts.vue') },
      { path: 'settings', component: () => import('pages/PageSettings.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
