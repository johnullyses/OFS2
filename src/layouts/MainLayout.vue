<template>
  <div>
    <q-layout view="hHh Lpr lff" style="background: #E5E5E5;" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-white">
        <q-toolbar>
           <q-btn dense flat round icon="menu" class="row q-pa-md desktop-hide" @click="this.drawerState()" style="color:black"/>
          <!-- <q-btn color="red" flat @click="drawer = !drawer" round dense icon="menu" /> -->
          <!-- <q-img class="row q-pa-md"
            src="~assets/mangdonalds.png"
            style="width: 30px; height: 30px; border-radius: 3px;"
          /> -->
            <q-img 
            src="~assets/cloudshop-small.png"
            style="width: 8%;"
          />
          <q-space />
          <div class="row" v-if="profile.role_id == 3" style="margin-top: 5px; margin-right: 10px;">
              <b style="color: black; margin-top: 10px; margin-right: 10px;" >Store:</b>
              <q-select dense rounded outlined v-model="this.profile.store_id" :options="storeListOptions" 
              @update:model-value="this.storeChange($event)" 
              option-value="store_id" option-label="store_name" 
              emit-value map-options
              style="min-width: 120px; min-height:20px" />
          </div>
          <div class="row" v-if="profile.role_id != 3" style="margin-top: 5px;">
            <b style="color: black; margin-top: 10px; margin-right: 10px;" >Hub:</b>
            <q-select dense rounded outlined v-model="this.selectedHub" :options="hubDecOptions"  @update:model-value="this.hubdecChange()" style="min-width: 120px; min-height:20px" />
          </div>
           
          <q-btn color="black" v-if="profile.role_id != 3" flat round dense icon="notifications" style="margin-right: 50px;">
            <div v-if="countUnreadNotif() > 0" class="notif-count">{{countUnreadNotif()}}</div>
            <q-menu>
              <div class="row q-pa-md">
                <div class="col">
                  <div class="text-h6 q-mb-md " style="min-width: 300px; border-bottom: 1px solid #DEDEDE;">Notifications</div>
                  <div v-for="(notification, index) in notifications" :key="index" @click.capture="notifAction(notification.script, notification.id)" :class="(notifLoading && currentNotifId == notification.id ? 'gray-background ' : '') + 'row q-pa-sm notification-card'">
                    <div v-if="notifLoading && currentNotifId == notification.id" class="notification-loader">
                      <q-spinner
                        color="primary"
                        size="3em"
                      />
                    </div>
                    <div class="col-1">
                      <div v-if="notification.is_read == 0" class="unread"></div>
                    </div>
                    <div class="col-2">
                      <q-btn flat style="background-color: #F7CE92; color: #8D6262;" round dense >{{profile.name.charAt(0)}}</q-btn>
                    </div>
                    <div class="col-9">
                      <div  v-html="notification.message"></div>
                      <div style="font-size: 11px; color: gray;">{{notification.time}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn class="bg-black" round dense :label="profile.name.charAt(0)">
            <q-menu>
              <q-list style="min-width: 220px">
                 <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="account_circle" />
                  </q-item-section>
                  <q-item-section>{{profile.name}}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item @click.capture="logout" clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="logout"/>
                  </q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="!drawer || miniState"
        @click.capture="drawerClick"

        :width="260"
        :breakpoint="500"
        bordered
        class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item style="margin-bottom: 20px;" @click="miniState = true" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="menu" class="desktop-only" style="font-size: 30px;" />
              </q-item-section>

              <q-item-section style="font-size: 20px; font-weight: bold; ">
                Order <br>Monitoring
              </q-item-section>
            </q-item>
            <q-item to="/" clickable v-ripple>
              <q-item-section avatar>
                  <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item to="/order-monitoring" active clickable v-ripple>
              <q-item-section avatar>
                  <q-icon name="fastfood" />
              </q-item-section>

              <q-item-section>
                Order Monitor
              </q-item-section>
            </q-item>

            <q-item to="/statistics" clickable v-ripple>
              <q-item-section avatar>
                  <q-icon name="analytics" />
              </q-item-section>
              <q-item-section>
                Statistics
              </q-item-section>
            </q-item>
          </q-list>
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="article"
              label="Reports"
            >
              <q-list>
                 <q-item to="/cancelled-orders" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;" >
                    Cancelled Orders
                  </q-item-section>
                </q-item>
                <q-item to="/delivery-performance"  clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Delivery Performance
                  </q-item-section>
                </q-item>
                <q-item to="/customer-recieve-time" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Customer Receive Time
                  </q-item-section>
                </q-item>
                <q-item to="/sales" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Daily Sales
                  </q-item-section>
                </q-item>
                <q-item to="/diverted-orders" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Diverted Orders
                  </q-item-section>
                </q-item>
                <q-item to="/status-analyze" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Status Analyze
                  </q-item-section>
                </q-item>
                <q-item to="/product-mix" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Product Mix
                  </q-item-section>
                </q-item>
                <q-item to="/billable" clickable v-ripple>
                  <q-item-section style="padding-left: 70px">
                    Billable
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="settings"
              label="Settings"
            >
              <q-list>
                <q-item v-if="profile.role_id == 1" to="/store-operating-hours" clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Store Operating Hours
                  </q-item-section>
                </q-item>
                <q-item to="/product-availability"  clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Product Availability
                  </q-item-section>
                </q-item>
                <q-item to="/change-password"  clickable v-ripple>
                  <q-item-section style="padding-left: 70px;">
                    Change Password
                  </q-item-section>
                </q-item>

                <q-item v-if="profile.role_id == 3" to="/store-manage" active clickable v-ripple exact>
                  <q-item-section style="padding-left: 70px;" class="side-bar-dropdown-font">
                    Store Management
                  </q-item-section>
                </q-item>

                <q-item v-if="profile.role_id == 3" to="/user-store-link"  clickable v-ripple exact>
                  <q-item-section style="padding-left: 70px;" class="side-bar-dropdown-font">
                    User Store Link
                  </q-item-section>
                </q-item>
                
                <q-item v-if="profile.role_id == 3" to="/user-assign-role"  clickable v-ripple exact>
                  <q-item-section style="padding-left: 70px;" class="side-bar-dropdown-font">
                    User Assign Role
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
    <q-dialog v-model="hubdec" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hub Declaration</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="hubdec_pin" type="password" label="Enter your pin" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :loading="hubdecLoading" @click.capture="verifyStore()" flat label="Submit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="hubdecForm" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hub Declaration for {{(hubdec_mins == 0 ? 'Hold' : hubdec_mins + 'min.')}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="hubdecAuthorizedBy" label="Authorized by" autofocus />
          <q-input dense v-model="hubdecReason" label="Reason" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :loading="hubdecLoading" @click.capture="submitHubDec()" flat label="Submit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="holdSchedule" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hold Schedule</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <div class="row">
            <div class="col-4"><b>From Time</b></div>
            <div class="col-4"><b>To Time</b></div>
            <div class="col-4"><b>Hold Date</b></div>
            <div v-for="(value, index) in storeHoldSchedule" :key="index" class="col-12 row">
              <div class="col-4">{{value.from_time}}</div>
              <div class="col-4">{{value.to_time}}</div>
              <div class="col-4">{{value.datetime_created}}</div>
            </div>
         </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn :loading="hubdecLoading" @click.capture="holdSchedule = false, hubdecForm = true, hubdec_mins = 0" flat label="HOLD FOR 60 MINS"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card :class="alertColor + ' text-white'" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{alertMessage}}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const miniState = ref(false)

    return {
      drawer: ref(false),
      miniState,

      drawerClick (e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation()
        }
      }
    }
  },
  computed: {
    ...mapGetters('Notification', {
      notifications: 'GET_NOTIFICATIONS'
    }),
    ...mapGetters('Auth', {
      profile: 'GET_PROFILE'
    }),
    ...mapGetters('HubDec', {
      hubdecLoading: 'GET_HUB_DEC_LOADING',
      isVerifiedPin: 'GET_STORE_VERFIED',
      currentHubDec: 'GET_CURRENT_HUB_DEC',
      storeHoldSchedule: 'GET_HOLD_SCHEDULE',
      hubDecOptions: 'GET_HUB_DEC_LIST',
    }),
    ...mapGetters('StoreManagement',{      
      storeListOptions: 'GET_STORE_LIST',
      store:'GET_STORE',
    }),    
    ...mapGetters('Order', {
      orders: 'GET_ORDERS',
      ordersLoading: 'GET_ORDERS_LOADING',
    }),
    ...mapGetters('StoreDashboardStatistics', {
      dashboardStatistics:'GET_STORE_DASHBOARD',
      dashboardloading: 'GET_LOADING'
    })
  },
  
  data: () => ({
    notifLoading: false,
    currentNotifId: -1,
    selectedHub:"",
    processTime: false,
    hubdec_pin: null,
    hubdec_mins: 60,
    hubdec: false,
    hubdecForm: false,
    hubPlacehHolder:"",
    hubdecAuthorizedBy: "",
    hubdecReason: "",
    holdSchedule: false,
    alert: false,
    alertMessage: '',
    alertColor: 'bg-green'
  }),
  methods: {
    ...mapActions('Auth', [
      'logout'
    ]),
    ...mapActions('Order', [
      'orderMonitoring', 
      'orderDetails'
    ]),
    ...mapActions('Notification', [
      'readNotification'
    ]),
    ...mapActions('HubDec', [
      'validateStorePin',
      'getCurrentHubDec',
      'setHubDec',
      'getHoldSchedule',
    ]),
    ...mapActions('StoreManagement', [
      'storeList',
      'storeDetail'
    ]),
    ...mapActions('StoreDashboardStatistics', [
      'storeDashboard'
    ]),
    ...mapMutations('Auth', [
      'SET_STORE'
    ]),
    ...mapMutations('Order', [
      'SET_ORDER'
    ]),
    
    async notifAction(script, id) {
      this.currentNotifId = id
      this.notifLoading = true
      await this.readNotification(id)
      await eval( 'this.' + script)
      this.currentNotifId = -1
      this.notifLoading = false
    },
    async viewOrder(id) {
      await this.orderDetails({id: id, loading: true})
      this.$router.push({path: 'order-monitoring'})
    },
    async hubdecChange() {
      this.hubdec_pin = ""
      if(this.selectedHub=="HOLD"){
        this.hubdec_mins =0;
      }else{
        this.hubdec_mins =this.selectedHub;
      }
      this.hubdec=true;
    },
    async drawerState() {
      this.drawer=!this.drawer;
    },
    async submitHubDec() {
      if (this.hubdecReason != '' && this.hubdecAuthorizedBy != '') {
        await this.setHubDec({
          reason: this.hubdecReason,
          promised_time: (this.hubdec_mins == 0 ? 'HOLD' : this.hubdec_mins),
          authorized_by: this.hubdecAuthorizedBy
        })
        await this.getCurrentHubDec()
        this.hubdecReason = ''
        this.hubdecAuthorizedBy = ''
        this.hubdecForm = false
        this.alert = true
        this.alertColor = "bg-green"
        this.alertMessage = 'Hub Declaration Successful!'
      } else {
        this.alert = true
        this.alertColor = "bg-red"
        this.alertMessage = 'Please fill up the field.'
      }
    },
    async verifyStore() {
      if (!this.hubdec_pin) {
        
        this.alert = true
        this.alertColor = "bg-red"
        this.alertMessage = 'Please enter your pin number.'
      } else {
        await this.validateStorePin(this.hubdec_pin)
        if (this.isVerifiedPin) {
          
          if (this.currentHubDec.promised_time == "HOLD") {
            this.alert = true
            this.alertColor = "bg-orange"
            this.alertMessage = 'Unable to change hub declaration. Please remove current store hold'
            return
          }
          
          if (this.hubdec_mins != 0) {
            this.hubdec = false
            this.hubdecReason = ''
            this.hubdecAuthorizedBy = ''
            this.hubdecForm = true
          } else {
            this.hubdec = false
            this.holdSchedule = true
            this.getHoldSchedule()
          }
        } else {
          this.alert = true
          this.alertColor = "bg-red"
          this.alertMessage = 'Invalid Pin'
        }
      }
    },
    countUnreadNotif(){
      var count = 0
      this.notifications.forEach(notification => {
        if (notification.is_read == 0) {
          count ++
        }
      });
      return count
    },
    async storeChange(value) {
      await this.storeDetail({
          store_id: value
        }).then(async () => {          
          this.SET_STORE(this.store)
          var path = this.$route.path.substr(this.$route.path.indexOf('/') + 1)
          await this.orderMonitoring();
          await this.storeDashboard();
          this.SET_ORDER({});
          // switch(path){
          //   case 'order-monitoring':
          //     }
          //     break;
          //   case 'statistics':
          //     break;
          // }
        })
    },
  },
  async beforeMount() {
    this.selectedHub=this.currentHubDec.promised_time    
    await this.storeList();
  },watch: {
    currentHubDec(value){
      try{
        this.selectedHub=value.promised_time;
      } catch (error) {}
      
    }
  }
})
</script>

<style>

/* body {
  overflow: hidden;
} */

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.notification-card {
  transition: background 0.5s ease;
}

.notification-card:hover {
  cursor: pointer;
  background: rgb(207, 207, 207);
}

.notif-count {
  color: white; 
  background-color: red; 
  border-radius: 50%; 
  position: absolute; 
  font-size: 10px; 
  width: 16px; 
  height: 16px;
  top: -2px;
  right: -0.5px;
  line-height: 1.6em;
}

.unread {
  background: #00A3FF;
  width: 6px;
  height: 6px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.notification-loader {
  position: absolute;
  z-index: 2;
  left: 45%;
}

.gray-background {
  background: rgb(207, 207, 207);
}


@media screen and (max-width: 600px) {
  .q-menu {
    width: 100%!important;
    max-width: 100%!important;
  }
}

</style>
