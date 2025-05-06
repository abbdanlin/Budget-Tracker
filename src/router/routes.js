const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'entries' },
      { path: 'entries', component: () => import('pages/PageEntries.vue') },
      { path: 'charts', component: () => import('pages/PageCharts.vue') },
      { path: 'settings', component: () => import('pages/PageSettings.vue') },
      { path: 'overview', component: () => import('pages/PageOverview.vue') },
      { path: 'Ai', component: () => import('pages/PageFront.vue') },
      { path: 'table', component: () => import('pages/PageTable.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
