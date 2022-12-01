
<template>

  <div class="q-pa-md" style="overflow: auto; max-height: 90vh; min-height: 90vh;" container>
      <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b>Delivery Performance</b></div>
                </div>
                <div class="col-6">
                    <div style="font-size: 15px; text-align: right"><b>Date: </b> {{this.todate}}</div>
                </div>
            </div>
      </div>
      <div style="margin-left: 15px; margin-top: 15px; font-size: 15px">
        <b>Filters:</b>
      </div>
      <div class="items-start q-pa-md row">
        <div class="col-sm-2 col-xs-6 q-pa-sm">
          <q-input bg-color="white" outlined type="date" hint="Start date *" v-model="startDate" dense style="max-width: 200px;"></q-input>
        </div>
        <div class="col-sm-2 col-xs-6 q-pa-sm">
              <q-input bg-color="white" outlined type="date" hint="End date *" :min="minDate" :max="maxDate" v-model="endDate" dense style="max-width: 200px"></q-input>
        </div>
        <div class="col-sm-2 col-xs-6 q-pa-sm">
               <q-select 
                bg-color="white" 
                outlined 
                :options="promisedTime"
                v-model="chosenPromised"
                option-label="Promised Time"
                hint="Promised Time" 
                label="Promised Time" 
                dense
                style="max-width: 200px"
                >
            </q-select>
        </div>
        <div class="col-sm-2 col-xs-6 q-pa-sm">
             <q-btn
                color="primary"
                icon-right="search"
                label="Search"
                no-caps
                @click="search"
                style="max-width: 150px"
            >
            </q-btn>
        </div>
          <div class="col-sm-2 col-xs-6 q-pa-sm">
                 <q-btn
                  color="primary"
                  icon-right="archive"
                  label="Export to csv"
                  no-caps
                  @click="exportTable"
                  style="max-width: 150px"
            >
            </q-btn>
        </div>
           

        
         
      </div>
          <div class="row">
            <div class="col-12 col-md-3" style="padding:5px">
                  <q-card-section class="bg-primary text-white">
                      <div class="text-h6" >Gross Total </div>
                      <div class="text-subtitle2 center">{{this.grossTotal}}</div>
                  </q-card-section>
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                   <q-card-section class="bg-primary text-white col-3">
                      <div class="text-h6">Net Total</div>
                      <div class="text-subtitle2 center">{{this.netTotal}}</div>
                  </q-card-section>
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                   <q-card-section class="bg-primary text-white col-3" >
                      <div class="text-h6">Average Check</div>
                      <div class="text-subtitle2 center">{{this.avgCheck}}</div>
                  </q-card-section>
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                    <q-card-section class="bg-primary text-white col-3">
                      <div class="text-h6">Cancel TC</div>
                      <div class="text-subtitle2 center">{{this.cancelTC}}</div>
                    </q-card-section>
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                    <q-card-section class="bg-primary text-white col-2">
                      <div class="text-h6">Cancel Net</div>
                      <div class="text-subtitle2 center">{{this.cancelNet}}</div>
                    </q-card-section>
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                   <q-card-section class="bg-primary text-white col-2">
                      <div class="text-h6">Less 90</div>
                      <div class="text-subtitle2 center">{{this.less90}}</div>
                    </q-card-section>
            </div>
             <div class="col-12 col-md-3" style="padding:5px">
                    <q-card-section class="bg-primary text-white col-2">
                      <div class="text-h6">90-120</div>
                      <div class="text-subtitle2 center">{{this.x90120}}</div>
                    </q-card-section>
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                    <q-card-section class="bg-primary text-white col-2">
                      <div class="text-h6">120-180</div>
                      <div class="text-subtitle2 center">{{this.x120180}}</div>
                    </q-card-section>
            </div>
            <div class="col-12 col-md-3 desktop-only" style="padding:5px">
            </div>
            <div class="col-12 col-md-3" style="padding:5px">
                <q-card-section class="bg-primary text-white col-2">
                      <div class="text-h6">180 Onwards</div>
                      <div class="text-subtitle2 center">{{this.x180onwards}}</div>
                </q-card-section>
            </div>
           <div class="col-12 col-md-3" style="padding:5px">
                <q-card-section class="bg-primary text-white col-2">
                      <div class="text-h6">Directly Closed</div>
                      <div class="text-subtitle2 center">{{this.directlyClosed}}</div>
                </q-card-section>
           </div>
            
          </div>
            <div class="row" style="padding-top:20px">
                <q-table
                    :pagination="initialPagination"
                    color="primary"
                    :columns="columns"
                    :rows="this.deliveryReport.Orders"
                    row-key="name"
                    ref="tb"
                   :loading="loading"
                   class="col-12"
                >
                </q-table>

        </div>
  </div>
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            Start Date and End Date Required
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-black">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
 
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';
import { exportFile} from 'quasar'
import { ref } from 'vue'
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  function wrapCsvValue (val, formatFn) {
      let formatted = formatFn !== void 0
        ? formatFn(val)
        : val
      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)
      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    }
  
export default defineComponent({
  name: 'DeliveryPerformance',
  data: () => ({
    startDate:"",
    endDate:"",
    minDate: '',
    maxDate: '',
    persistent: ref(false),
    grossTotal:0,
    netTotal:0,
    avgCheck:0,
    cancelTC:0,
    cancelNet:0,
    less90:0,
    x90120:0,
    x120180:0,
    x180onwards:0,
    directlyClosed:0,
    chosenPromised: '',
    promisedTime:["All","90","120","180"]
     ,
    todate:date,
    initialPagination: {
                sortBy: 'desc',
                descending: true,
                rowsPerPage: 50
    },
    columns:[
          {
            name: 'TC',
            required: true,
            label: 'ID',
            align: 'left',
            field: row => row.TC,
            format: val => `${val}`,
            sortable: true
          },
            {
            name: 'Order Number',
            required: true,
            label: 'Order Number',
            align: 'left',
            field: row => row.order_number,
            format: val => `${val}`,
            sortable: true
          }, {
            name: 'OrderDate',
            required: true,
            label: 'OrderDate',
            align: 'left',
            style: "width: 10px",
            field: row => row.OrderDate,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'NetTotal',
            required: true,
            label: 'Net Total',
            align: 'left',
            style: "width: 20px",
            field: row => row.NetTotal,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'GrossTotal',
            required: true,
            label: 'Gross Total',
            align: 'left',
            style: "width: 10px",
            field: row => row.GrossTotal,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'Status',
            required: true,
            label: 'Status',
            align: 'left',
            style: "width: 20px",
            field: row => row.Status,
            format: val => `${val}`,
            sortable: true
          },
         
      ],
  }),
  computed: {
    ...mapGetters('DeliveryPerformance', {
      deliveryReport:'GET_DELIVERY_REPORT',
      loading: 'GET_LOADING'
    }),
    ...mapGetters('Auth', {
      user: 'GET_PROFILE'
    })
  },
  methods: {
    ...mapActions('DeliveryPerformance', [
      'getDeliveryPerformance',
      'getSearchResult'
    ]),
    async search(){
      if(this.startDate==null ||this.startDate==""|| this.endDate==null ||this.endDate==""){
        this.persistent=true;
      }else{
          if(this.chosenPromised==null|| this.chosenPromised==""){
            this.chosenPromised = "All";
          }
          await this.getSearchResult({
              store_id: this.user.store_id,
              startDate: this.startDate,
              endDate: this.endDate,
              prTime: this.chosenPromised,
          }).then(() => {
            if(this.deliveryReport.Orders.length>0){
                this.grossTotal=this.deliveryReport.StorePerformance[0].gross_total
                this.netTotal=this.deliveryReport.StorePerformance[0].net_total
                this.avgCheck=this.deliveryReport.StorePerformance[0].avg_check
                this.cancelTC=this.deliveryReport.StorePerformance[0].cancel_tc
                this.cancelNet=this.deliveryReport.StorePerformance[0].cancel_basic_total
                this.less90=this.deliveryReport.StorePerformance[0].less_then_90min
                this.x90120=this.deliveryReport.StorePerformance[0].x90_to_120min
                this.x120180=this.deliveryReport.StorePerformance[0].x120_to_180min
                this.x180onwards=this.deliveryReport.StorePerformance[0].more_than_180min
                this.directlyClosed=this.deliveryReport.StorePerformance[0].direct_closed
            }else{
              this.resetCards();
            }
              
          })
      }
 

    },
    async exportTable(){
      var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            let rows= this.deliveryReport.Orders
            var exportName = user.store_name+"/DeliveryPerformance/"+rdate
            // naive encoding to csv formata
            const content = [ this.columns.map(col => wrapCsvValue(col.label)) ].concat(
                rows.map(row => this.columns.map(col => wrapCsvValue(
                typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
                col.format
                )).join(','))
            ).join('\r\n')

            const status = exportFile(
                exportName+".csv",
                content,
                'text/csv'
            )
    },
    resetCards(){
      this.grossTotal=0
      this.netTotal=0
      this.avgCheck=0
      this.cancelTC=0
      this.cancelNet=0
      this.less90=0
      this.x90120=0
      this.x120180=0
      this.x180onwards=0
      this.directlyClosed=0
    }
  },
  watch: { 
        startDate() {
            if (this.startDate == '') {
                this.minDate = ''
                this.maxDate = ''
            } else {
                this.minDate = this.startDate
                var max = new Date(this.startDate);
                max.setDate(max.getDate() + 31);
                this.maxDate = max.toISOString().slice(0, 10)
            }
        }
  },
  async beforeMount(){
      var userDetails = this.user;
      this.resetCards()
      await this.getDeliveryPerformance(userDetails).then(() => {
           this.grossTotal=this.deliveryReport.StorePerformance[0].gross_total
            this.netTotal=this.deliveryReport.StorePerformance[0].net_total
            this.avgCheck=this.deliveryReport.StorePerformance[0].avg_check
            this.cancelTC=this.deliveryReport.StorePerformance[0].cancel_tc
            this.cancelNet=this.deliveryReport.StorePerformance[0].cancel_basic_total
            this.less90=this.deliveryReport.StorePerformance[0].less_then_90min
            this.x90120=this.deliveryReport.StorePerformance[0].x90_to_120min
            this.x120180=this.deliveryReport.StorePerformance[0].x120_to_180min
            this.x180onwards=this.deliveryReport.StorePerformance[0].more_than_180min
            this.directlyClosed=this.deliveryReport.StorePerformance[0].direct_closed
      })
     
  }
})
</script>

<style scoped>
</style>