
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'order-monitoring', component: () => import('pages/OrderMonitoring.vue') },
      { path: 'order-details', component: () => import('pages/OrderDetails.vue') },
      { path: 'cancelled-orders', component: () => import('pages/CancelledOrders.vue') },
      { path: 'diverted-orders', component: () => import('pages/DivertedOrders.vue') },
      { path: 'delivery-performance', component: () => import('src/pages/DeliveryPerformance.vue') },
      { path: 'store-operating-hours', component: () => import('src/pages/StoreOperatingHours.vue') },
      { path: 'product-availability', component: () => import('src/pages/ProductAvailability.vue') },
      { path: 'sales', component: () => import('src/pages/Sales.vue') },
      { path: 'faq/:id', component: () => import('src/pages/FAQ.vue') },
      { path: 'navigation/:id', component: () => import('src/pages/Navigation.vue') },
      { path: 'glossary/:id', component: () => import('src/pages/Glossary.vue') },
      { path: 'customer-recieve-time', component: () => import('src/pages/CustomerReceiveTime.vue') },
      { path: 'billable', component: () => import('src/pages/Billable.vue') },
      { path: 'product-mix', component: () => import('src/pages/ProductMix.vue') },
      { path: 'status-analyze', component: () => import('src/pages/StatusAnalyze.vue') },
      { path: 'statistics', component: () => import('src/pages/StoreDashboard.vue') },
      { path: 'change-password', component: () => import('src/pages/ChangePassword.vue') },
      { path: 'store-manage', component: () => import('src/pages/StoreManagement.vue') },
      { path: 'store/:id', component: () => import('src/pages/StoreDetails.vue') },
      { path: 'store/create', component: () => import('src/pages/StoreDetails.vue') },
      { path: 'user-store-link', component: () => import('src/pages/UserStoreLink.vue') },
      { path: 'user-assign-role', component: () => import('src/pages/UserAssignRole.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
