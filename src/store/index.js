/* eslint-disable no-prototype-builtins */
import { createApp } from 'vue'
import { createStore } from 'vuex'
import Vuex from 'vuex'
import { axiosInstance } from 'src/utilities/axios'
import _ from 'lodash'

Vuex.Store.prototype.$axios = axiosInstance
Vuex.Store.prototype.$_ = _

const app = createApp({})
app.use(createStore)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */



export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Order: require('./OrderStore').default,
      Grabex: require('./GrabexStore').default,
      Lalamove: require('./LalamoveStore').default,
      Auth: require('./AuthStore').default,
      CancelledOrder: require('./CancelledOrderStore').default,
      DivertedOrder: require('./DivertedOrderStore').default,
      DeliveryPerformance: require('./DeliveryPerformance').default,
      Notification: require('./NotificationStore').default,
      HubDec: require('./HubDecStore').default,
      ProductAvailability: require('./ProductAvailability').default,
      Sales: require('./SalesStore').default,
      CustomerReceiveTime: require('./CustomerReceiveTimeStore').default,
      Homepage: require('./HomepageStore').default,
      BillableItems: require('./BillableItemsStore').default,
      ProductMix: require('./ProductMix').default,
      StatusAnalyze: require('./StatusAnalyzeStore').default,
      StoreDashboardStatistics: require('./StoreDashboardStatisticsStore').default,
      ChangePassword: require('./ChangePassword').default,
      StoreManagement: require('./StoreManagementStore').default,
      UserStoreLink: require('./UserStoreLinkStore').default,
      UserAssigneRole: require('./UserAssigneRoleStore').default,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
