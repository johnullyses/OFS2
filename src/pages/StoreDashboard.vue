<template>
    <div class="q-pa-md"  style="overflow: auto; max-height: 90vh; min-height: 90vh;" container>
      <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b>Store Dashboard</b></div>
                </div>
                <div class="col-6">
                    <div style="font-size: 15px; text-align: right"><b>Date: </b> {{this.todate}}</div>
                </div>
            </div>
      </div>

      <div id="parent" class="text-center relative-position" style="overflow: hidden; z-index:1;">
        
        <div class="row gt-sm">
          <div class="col-12 bg-grey-6" style="padding:1px; ">          
            <q-card >
              <q-card-section horizontal class="q-py-sm">
                <div class="row col-12 justify-center">
                <div class="col-3 text-h6 text-right" style="align-self:center;">Orders:</div>
                <div class="col-3 text-h6">
                  <div class="text-center">
                  Now
                  </div>
                  <div class="text-center">
                  {{this.order_count}}
                  </div>
                </div>
                <div class="col-3 text-h6">
                  <div class="text-center">
                  Lapse
                  </div>
                  <div class="text-center">
                  {{this.order_lapse_count}}
                  </div>
                </div>
                <div class="col-3 text-h6">
                  <div class="text-center">
                  Advance
                  </div>
                  <div class="text-center">
                  {{this.order_advance_count}}
                  </div>
                </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row lt-md">
          <div class="col-12 bg-grey-6" style="padding:1px; ">          
            <q-card >
              <q-card-section horizontal class="q-py-sm">
                <div class="row col-12 justify-center">
                  <div class="col-4 text-h6 text-right" style="align-self:center;">Orders:</div>
                  <div class="col text-h6">
                    <div class="row">
                      <div class="col text-right">
                      Now:
                      </div>
                      <div class="col text-center">
                      {{this.order_count}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col text-right">
                      Lapse: 
                      </div>
                      <div class="col text-center">
                      {{this.order_lapse_count}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col text-right">
                      Advance:
                      </div>
                      <div class="col text-center">
                      {{this.order_advance_count}}
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      <div class="row">
        <div class="col-md-4 col-sm-6 col-xs-12 bg-grey-6" style="min-height: 200px; min-width:150px; padding:0.5px; ">
          <q-card class="full-height" >
            <q-card-section>
              <div class="center" :class="textsize" >{{this.current_hitrate}}%</div>
                      <div class="text-subtitle2 center">Hitrate Today</div>
                      <div class="text-subtitle1 center">{{this.current_tc_90_mins}}/{{this.current_tc}} GC</div>
                      <div class="center" :class="textsize" >{{this.current_avg_time}}</div>
                      <div class="text-subtitle1 center">Delivery Time Today</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-grey-6" style="min-height: 200px; min-width:150px; padding:0.5px;">
          <q-card class="full-height">
            <q-card-section>
                <div class="center" :class="textsize" >{{this.current_hub_dec}}</div>
                <div class="text-subtitle2 center">Hub Declaration</div>
                <div class="text-subtitle2 center">120 - {{this.current_hub_dec_120_mins}}</div>
                <div class="text-subtitle2 center">180 - {{this.current_hub_dec_180_mins}}</div>
                <div class="text-subtitle2 center">On Hold - {{this.current_hub_dec_hold}}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-grey-6" style="min-height: 200px; min-width:150px; padding:0.5px;">
          <q-card class="full-height">
            <q-card-section>
              <div class="center" :class="textsize" >{{this.current_cancel_percents}}%</div>
              <div class="text-subtitle2 center">Cancellation % today</div>
              <div class="text-subtitle2 center">{{this.current_total_cancels}}/{{this.current_cancel_tc}}</div>
              <div class="text-subtitle2 center" >Store Cancelled - {{this.current_store_assigned_cancels}}</div>
              <div class="text-subtitle2 center">Non AOR Cancelled - {{this.current_api_count}}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-grey-6" style="min-height: 200px; min-width:150px; padding:0.5px;">
          <q-card class="full-height">
            <q-card-section>
              <div class="center" :class="textsize" >{{this.mtd_hitrate}}%</div>
              <div class="text-subtitle2 center">Hitrate MTD</div>
              <div class="text-subtitle1 center">{{this.mtd_tc_90_mins}}/{{this.mtd_tc}} GC</div>
              <div class="center" :class="textsize" >{{this.mtd_avg_time}}</div>
              <div class="text-subtitle1 center">Delivery Time MTD</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-grey-6" style="min-height: 200px; min-width:150px; padding:0.5px;">
          <q-card class="full-height">
            <q-card-section>
              <div class="center" :class="textsize" >{{this.mtd_hub_dec}}</div>
              <div class="text-subtitle2 center">Hub Declaration MTD</div>
              <div class="text-subtitle2 center">120 - {{this.mtd_hub_dec_120_mins}}</div>
              <div class="text-subtitle2 center">180 - {{this.mtd_hub_dec_180_mins}}</div>
              <div class="text-subtitle2 center">On Hold - {{this.mtd_hub_dec_hold}}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-grey-6" style="min-height: 200px; min-width:150px; padding:0.5px;">
          <q-card class="full-height">
            <q-card-section>
              <div class="center" :class="textsize" >{{this.mtd_cancel_percents}}%</div>
              <div class="text-subtitle2 center">Cancellation % MTD</div>
              <div class="text-subtitle2 center">{{this.mtd_total_cancels}}/{{this.mtd_cancel_tc}}</div>
              <div class="text-subtitle2 center" >Store Cancelled - {{this.mtd_store_assigned_cancels}}</div>
              <div class="text-subtitle2 center">Non AOR Cancelled - {{this.mtd_api_count}}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
        
      <div v-if="dashboardloading" class="absolute" style="left: 0; top: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index:10; background-color: white; opacity: 0.4;">
          <q-spinner-tail
            style="position: relative; display: block; margin-left: auto; margin-right: auto; top: 50%;"
            color="primary"
            size="5em"
          />
        </div>
      </div>
      

    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { useQuasar, LocalStorage } from 'quasar'
import { computed } from 'vue'
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0");
//var dashboardRefresher = [];
export default {
  name: "StoreDashboard",
  setup () {
    const $q = useQuasar()
    const textsize = computed(() => {
      return $q.screen.lt.md
        ? 'text-h4'
        : 'text-h3'
    })

    return { textsize }
  },
  data: () => ({
    dashboardRefresher:[],
    todate:date,
    order_count:0,
    order_lapse_count:0,
    order_advance_count:0,
    current_hitrate:0,
    current_avg_time:0,
    current_tc:0,
    current_tc_90_mins:0,
    mtd_hitrate:0,
    mtd:0,
    mtd_avg_time:0,
    mtd_tc:0,
    mtd_tc_90_mins:0,
    current_hub_dec:0,
    current_hub_dec_120_mins:0, 
    current_hub_dec_180_mins:0,
    current_hub_dec_hold:0,
    mtd_hub_dec:0,
    mtd_hub_dec_120_mins:0,
    mtd_hub_dec_180_mins:0,
    mtd_hub_dec_hold:0,
    current_store_assigned_cancels:0,
    mtd_store_assigned_cancels:0,
    current_api_count:0,
    mtd_api_count:0,
    current_cancel_tc:0,
    mtd_cancel_tc:0,
    current_cancel_percents:0,
    mtd_cancel_percents:0,
    current_total_cancels:0,
    mtd_total_cancels:0,
  }),
  computed: {
    ...mapGetters('StoreDashboardStatistics', {
      dashboardStatistics:'GET_STORE_DASHBOARD',
      dashboardloading: 'GET_LOADING'
    })
  },  
  methods: {
    ...mapActions('StoreDashboardStatistics', [
      'storeDashboard'
    ]),
    
    resetCards(){
      this.order_count=0;
      this.order_lapse_count=0;
      this.order_advance_count=0;
      this.current_hitrate=0;
      this.current_avg_time=0;
      this.current_tc=0;
      this.current_tc_90_mins=0;
      this.mtd_hitrate=0;
      this.mtd=0;
      this.mtd_avg_time=0;
      this.mtd_tc=0;
      this.mtd_tc_90_mins=0;
      this.current_hub_dec=0;
      this.current_hub_dec_120_mins=0;
      this.current_hub_dec_180_mins=0;
      this.current_hub_dec_hold=0;
      this.mtd_hub_dec=0;
      this.mtd_hub_dec_120_mins=0;
      this.mtd_hub_dec_180_mins=0;
      this.mtd_hub_dec_hold=0;
      this.current_store_assigned_cancels=0;
      this.mtd_store_assigned_cancels=0;
      this.current_api_count=0;
      this.mtd_api_count=0;
      this.current_cancel_tc=0;
      this.mtd_cancel_tc=0;
      this.current_cancel_percents=0;
      this.mtd_cancel_percents=0;
      this.current_total_cancels=0;
      this.mtd_total_cancels=0;
    },
    async fetchDashboardData(){
      await this.storeDashboard().then(() => {
          console.log('Store Dashboard Refreshed at ' + new Date());
        this.order_count=this.dashboardStatistics.order_count;
        this.order_lapse_count=this.dashboardStatistics.order_lapse_count;
        this.order_advance_count=this.dashboardStatistics.order_advance_count;
        this.current_hitrate=this.dashboardStatistics.current_hitrate;
        this.current_avg_time=this.dashboardStatistics.current_avg_time;
        this.current_tc=this.dashboardStatistics.current_tc;
        this.current_tc_90_mins=this.dashboardStatistics.current_tc_90_mins;
        this.mtd_hitrate=this.dashboardStatistics.mtd_hitrate;
        this.mtd=this.dashboardStatistics.mtd;
        this.mtd_avg_time=this.dashboardStatistics.mtd_avg_time;
        this.mtd_tc=this.dashboardStatistics.mtd_tc;
        this.mtd_tc_90_mins=this.dashboardStatistics.mtd_tc_90_mins;
        this.current_hub_dec_120_mins=this.dashboardStatistics.current_hub_dec_120_mins;
        this.current_hub_dec_180_mins=this.dashboardStatistics.current_hub_dec_180_mins;
        this.current_hub_dec_hold=this.dashboardStatistics.current_hub_dec_hold;
        this.current_hub_dec=this.dashboardStatistics.current_hub_dec;
        this.mtd_hub_dec_120_mins=this.dashboardStatistics.mtd_hub_dec_120_mins;
        this.mtd_hub_dec_180_mins=this.dashboardStatistics.mtd_hub_dec_180_mins;
        this.mtd_hub_dec_hold=this.dashboardStatistics.mtd_hub_dec_hold;
        this.mtd_hub_dec=this.dashboardStatistics.mtd_hub_dec;
        this.current_store_assigned_cancels=this.dashboardStatistics.current_store_assigned_cancels;
        this.mtd_store_assigned_cancels=this.dashboardStatistics.mtd_store_assigned_cancels;
        this.current_api_count=this.dashboardStatistics.current_api_count;
        this.mtd_api_count=this.dashboardStatistics.mtd_api_count;
        this.current_cancel_tc=this.dashboardStatistics.current_cancel_tc;
        this.mtd_cancel_tc=this.dashboardStatistics.mtd_cancel_tc;
        this.current_cancel_percents=this.dashboardStatistics.current_cancel_percents;
        this.mtd_cancel_percents=this.dashboardStatistics.mtd_cancel_percents;
        this.current_total_cancels=this.dashboardStatistics.current_total_cancels;
        this.mtd_total_cancels=this.dashboardStatistics.mtd_total_cancels;
      });
    },
  },
  
  async beforeMount(){
    this.resetCards();
    await this.fetchDashboardData();
    
    this.dashboardRefresher = LocalStorage.getItem('dashboardRefresher')
    if(this.dashboardRefresher){
      for (var i = 0 ; i < this.dashboardRefresher.length ; i++) {
        clearTimeout(this.dashboardRefresher[i]); 
      }
    }
    this.dashboardRefresher = [];
    LocalStorage.set('dashboardRefresher',this.dashboardRefresher);
    //clearInterval(this.dashboardRefresher);
    console.log('Store Dashboard Refreshed Destroyed.');

    //in case of untracked setIntervals, push the created setIntervals to array to dispose later
    var intervalObj = setInterval(async () => {
      await this.fetchDashboardData();
    }, 15000)
    this.dashboardRefresher.push(intervalObj);
    LocalStorage.set('dashboardRefresher',this.dashboardRefresher);
    
  },

  async beforeUnmount(){
    this.dashboardRefresher = LocalStorage.getItem('dashboardRefresher')
    for (var i = 0 ; i < this.dashboardRefresher.length ; i++) {
      clearTimeout(this.dashboardRefresher[i]); 
    }
    this.dashboardRefresher = [];
    LocalStorage.set('dashboardRefresher',this.dashboardRefresher);
    //clearInterval(this.dashboardRefresher);
    console.log('Store Dashboard Refreshed Destroyed.');
    },
  watch: {
    dashboardStatistics(value){
      try{
        this.order_count=value.order_count;
        this.order_lapse_count=value.order_lapse_count;
        this.order_advance_count=value.order_advance_count;
        this.current_hitrate=value.current_hitrate;
        this.current_avg_time=value.current_avg_time;
        this.current_tc=value.current_tc;
        this.current_tc_90_mins=value.current_tc_90_mins;
        this.mtd_hitrate=value.mtd_hitrate;
        this.mtd=value.mtd;
        this.mtd_avg_time=value.mtd_avg_time;
        this.mtd_tc=value.mtd_tc;
        this.mtd_tc_90_mins=value.mtd_tc_90_mins;
        this.current_hub_dec_120_mins=value.current_hub_dec_120_mins;
        this.current_hub_dec_180_mins=value.current_hub_dec_180_mins;
        this.current_hub_dec_hold=value.current_hub_dec_hold;
        this.current_hub_dec=value.current_hub_dec;
        this.mtd_hub_dec_120_mins=value.mtd_hub_dec_120_mins;
        this.mtd_hub_dec_180_mins=value.mtd_hub_dec_180_mins;
        this.mtd_hub_dec_hold=value.mtd_hub_dec_hold;
        this.mtd_hub_dec=value.mtd_hub_dec;
        this.current_store_assigned_cancels=value.current_store_assigned_cancels;
        this.mtd_store_assigned_cancels=value.mtd_store_assigned_cancels;
        this.current_api_count=value.current_api_count;
        this.mtd_api_count=value.mtd_api_count;
        this.current_cancel_tc=value.current_cancel_tc;
        this.mtd_cancel_tc=value.mtd_cancel_tc;
        this.current_cancel_percents=value.current_cancel_percents;
        this.mtd_cancel_percents=value.mtd_cancel_percents;
        this.current_total_cancels=value.current_total_cancels;
        this.mtd_total_cancels=value.mtd_total_cancels;
      } catch (error) {}      
    }
  }
}
</script>
<style lang="sass">
.q-card
  width: 100%
</style>