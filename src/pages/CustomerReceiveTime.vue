<template>
    <div style="max-height: 90vh; overflow: auto;">
    <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
        <div class="col-6">
            <div style="font-size: 20px"><b>Customer Receive Time</b></div>
        </div>
        <div class="col-6">
            <div style="font-size: 15px; text-align: right"><b>Date: </b> Today</div>
        </div>
    </div>
    <div style="margin-left: 15px; margin-top: 15px; font-size: 15px;"><b>Filters:</b></div>
    <div class="row items-start q-pa-md">
        <div class="col-xs-12 col-sm-6 col-md-2 gutter">
            <q-input bg-color="white" outlined type="date" v-model="startDate" hint="Start date *" dense style="margin-right: 8px"></q-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2 gutter">
            <q-input bg-color="white" outlined type="date" v-model="endDate" :min="minDate" :max="maxDate" hint="End date *" dense style="margin-right: 8px"></q-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-1 gutter">
            <q-select 
                bg-color="white" 
                outlined 
                :options="hourRangeFrom"
                v-model="hourFrom"                
                hint="Hour range" 
                label="From" 
                dense style="margin-right: 8px">
            </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-1 gutter">
            <q-select 
                bg-color="white" 
                outlined 
                :options="hourRangeTo"
                v-model="hourTo"             
                hint="Hour range" 
                label="To" 
                dense style="margin-right: 8px">
            </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-2 gutter">
            <q-select 
                bg-color="white" 
                outlined 
                :options="promisedTimeOptions"
                v-model="promisedTime"
                hint="Promised time" 
                label="Promised time" 
                dense style="margin-right: 8px">
            </q-select>
        </div>
        <div class="gutter">
            <q-btn
                color="primary"
                icon-right="search"
                label="Search"
                no-caps
                @click="searchFilter"
                style="margin-right: 8px"
            ></q-btn>
            <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportFiltered"
                style="margin-right: 8px"
            ></q-btn>
        </div>
    </div>

    <div>
        <div class="q-pa-md">
            <q-table
                :class="scroll"
                id="test"
                :pagination="initialPagination"
                color="primary"
                :columns="columns"
                :rows="rows"
                row-key="name"
                ref="tb"
                :loading="loading"
            >
            </q-table>
        </div>
    </div>
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-red text-white" style="width: 300px">
                <q-card-section>
                <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Start date and End date are required.
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-black">
                <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent, ref } from 'vue';
import { exportFile } from 'quasar'
import moment from 'moment'

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
    name: 'CustomerReceiveTime',
    async beforeMount() {
        // await this.customerReceiveTime()
        // await this.customerReceiveTimeTable()
    },
    computed: {
        ...mapGetters('CustomerReceiveTime', {
            crtData: 'GET_CUSTOMER_RECEIVE_TIME',
            loading: 'GET_LOADING'
        }),
        ...mapGetters('Auth', {
            user: 'GET_PROFILE'
        }),
    },
    data() {
        return {
            initialPagination: {
                sortBy: 'desc',
                descending: true,
                rowsPerPage: 50
            },
            columns: [
                { name: 'hour', label: 'Hour', field: 'hour', align: 'center' },
                { name: 'packaging_sales', label: 'Packaging', field: 'packaging_sales', align: 'center' },
                { name: 'net_sales', label: 'Net', field: 'net_sales', align: 'center' },
                { name: 'total_sales', label: 'Sales', field: 'total_sales', align: 'center' },
                { name: 'avg_check', label: 'Avg. Check', field: 'avg_check', align: 'center' },
                { name: 'all_avg_time', label: 'All Avg. Time', field: 'all_avg_time', align: 'center' },
                { name: 'total_orders', label: 'TC', field: 'total_orders', align: 'center' },
                { name: 'avg_less_90', label: 'Avg. Less 90mins', field: 'avg_less_90', align: 'center' },
                { name: 'less_90_tc', label: 'Less 90mins', field: 'less_90_tc', align: 'center' },
                { name: 'less_90_', label: 'Less 90mins %', field: 'less_90_', align: 'center' },
                { name: 'to_90_120_tc', label: '90-120mins TC', field: 'to_90_120_tc', align: 'center' },
                { name: 'to_90_120_', label: '90-120mins %', field: 'to_90_120_', align: 'center' },
                { name: 'to_120_180', label: '120-180mins TC', field: 'to_120_180', align: 'center' }, 
                { name: 'to_120_180_', label: '120-180mins %', field: 'to_120_180_', align: 'center' },
                { name: 'over_180_tc', label: 'Over 180 TC', field: 'over_180_tc', align: 'center' },
                { name: 'over_180_', label: 'Over 180 %', field: 'over_180_', align: 'center' },
            ],
            rows: [],
            hourRangeFrom: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            hourRangeTo: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            promisedTimeOptions: ['All','90','120','180'],
            hourFrom: 0,
            hourTo: 23,
            promisedTime: 'All',
            startDate: '',
            endDate: '',
            minDate: '',
            maxDate: '',
            dialog: false,
            position: 'top',
            scroll: ''
        }
    },
    methods: {
        ...mapActions('CustomerReceiveTime', [
            'customerReceiveTime'
        ]),
        async customerReceiveTimeTable() {
            var customerReceiveTimeData = this.crtData
            this.rows = customerReceiveTimeData
        },
        strtotime(data) {
            var isValid = moment(data,'HH:mm:ss').format('X')
            if (isValid == 'Invalid date') {
                return 0
            } else {
                return isValid
            }
        },
        searchFilter() {
            if (this.startDate == '' || this.endDate == '') {
                this.dialog = true
                this.rows = [] 
            } else {
                this.customerReceiveTime({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    hourFrom: this.hourFrom,
                    hourTo: this.hourTo,
                    promisedTime: this.promisedTime,
                }).then(() => {
                    var result = this.crtData

                    var packaging_sales = 0
                    var net_sales = 0
                    var total_sales = 0
                    var avg_check = 0
                    var all_avg_time = 0
                    var total_orders = 0
                    var avg_less_90 = 0
                    var less_90_tc = 0
                    var less_90_ = 0
                    var to_90_120_tc = 0
                    var to_90_120_ = 0
                    var to_120_180 = 0
                    var to_120_180_ = 0
                    var over_180_tc = 0
                    var over_180_ = 0

                    result.forEach(val => {
                        packaging_sales += parseFloat(val.packaging_sales)
                        net_sales += parseFloat(val.net_sales)
                        total_sales += parseFloat(val.total_sales)
                        avg_check += parseFloat(val.avg_check)
                        all_avg_time += parseFloat(this.strtotime(val.all_avg_time))
                        total_orders += parseFloat(val.total_orders)
                        avg_less_90 += parseFloat(this.strtotime(val.avg_less_90))
                        less_90_tc += parseFloat(val.less_90_tc)
                        less_90_ += parseFloat(val.less_90_)
                        to_90_120_tc += parseFloat(val.to_90_120_tc)
                        to_90_120_ += parseFloat(val.to_90_120_)
                        to_120_180 += parseFloat(val.to_120_180)
                        to_120_180_ += parseFloat(val.to_120_180)
                        over_180_tc += parseFloat(val.over_180_tc)
                        over_180_ += parseFloat(val.over_180_)
                    });

                    var total = [
                        {
                            hour: '',
                            packaging_sales: packaging_sales.toFixed(2),
                            net_sales: net_sales.toFixed(2),
                            total_sales: total_sales.toFixed(2),
                            avg_check: avg_check.toFixed(2),
                            all_avg_time: "Invalid date" == moment((all_avg_time / total_orders)*1000).format('HH:mm:ss') ? '0' : moment((all_avg_time / total_orders)*1000).format('HH:mm:ss'),
                            total_orders: total_orders,
                            avg_less_90: "Invalid date" == moment((avg_less_90 / total_orders)*1000).format('HH:mm:ss') ? '0' : moment((avg_less_90 / total_orders)*1000).format('HH:mm:ss'),
                            less_90_tc: less_90_tc,
                            less_90_: "NaN%" == ((less_90_tc / total_orders) * 100).toFixed(2)+"%" ? '0' : ((less_90_tc / total_orders) * 100).toFixed(2)+"%",
                            to_90_120_tc: to_90_120_tc,
                            to_90_120_:  "NaN%" == ((to_90_120_tc / total_orders) * 100).toFixed(2)+"%" ? '0' : ((to_90_120_tc / total_orders) * 100).toFixed(2)+"%",
                            to_120_180: to_120_180,
                            to_120_180_: "NaN%" == ((to_120_180 / total_orders) * 100).toFixed(2)+"%" ? '0' : ((to_120_180 / total_orders) * 100).toFixed(2)+"%",
                            over_180_tc: over_180_tc,
                            over_180_: "NaN%" == ((over_180_tc / total_orders) * 100).toFixed(2)+"%" ? '0' : ((over_180_tc / total_orders) * 100).toFixed(2)+"%",
                        }
                    ]
                    var data = result.concat(total)
                    this.rows = data
                })
            }
            
            // const formatted = moment((8179776879 / 5)*1000).format('HH:mm:ss');
            // var sec = '14:47:38.0000'.split(':').reduce((acc,time) => (60 * acc) + +time);
            // var ts = moment.utc('00:00:00.0000','H:m:s').format('X')

            // if (this.startDate == '' || this.endDate == '') {
            //     this.dialog = true
            //     this.rows = [] 
            // } else {
            //     this.scroll = 'scroll_table'
            //     var customerReceiveTimeData = this.crtData
            //     let startDate = this.startDate
            //     let endDate = this.endDate
            //     let hourFrom = this.hourFrom
            //     let hourTo = this.hourTo
            //     let promisedTime = this.promisedTime

            //     var result = customerReceiveTimeData.filter(function(item){
            //         let filtered = true
            //         if (startDate && endDate) {
            //             filtered =  item.order_date.split(" ")[0] >= startDate && item.order_date.split(" ")[0] <= endDate
            //         }
            //         if (filtered) {
            //             if (hourFrom || hourTo) {
            //                 filtered =  item.hour >= hourFrom && item.hour <= hourTo
            //             }
            //         }
            //         if (filtered) {
            //             if (promisedTime) {
            //             if (promisedTime == 'All') {
            //                 return filtered
            //             } else {
            //                 filtered = item.promised_time == promisedTime
            //             }
            //             }
            //         }
            //         return filtered
            //     })

            //     var packaging_sales = 0
            //     var net_sales = 0
            //     var total_sales = 0
            //     var avg_check = 0
            //     var all_avg_time = 0
            //     var total_orders = 0
            //     var avg_less_90 = 0
            //     var less_90_tc = 0
            //     var less_90_ = 0
            //     var to_90_120_tc = 0
            //     var to_90_120_ = 0
            //     var to_120_180 = 0
            //     var to_120_180_ = 0
            //     var over_180_tc = 0
            //     var over_180_ = 0

            //     result.forEach(val => {
            //         packaging_sales += parseFloat(val.packaging_sales)
            //         net_sales += parseFloat(val.net_sales)
            //         total_sales += parseFloat(val.total_sales)
            //         avg_check += parseFloat(val.avg_check)
            //         all_avg_time += parseFloat(this.strtotime(val.all_avg_time))
            //         total_orders += parseFloat(val.total_orders)
            //         avg_less_90 += parseFloat(this.strtotime(val.avg_less_90))
            //         less_90_tc += parseFloat(val.less_90_tc)
            //         less_90_ += parseFloat(val.less_90_)
            //         to_90_120_tc += parseFloat(val.to_90_120_tc)
            //         to_90_120_ += parseFloat(val.to_90_120_)
            //         to_120_180 += parseFloat(val.to_120_180)
            //         to_120_180_ += parseFloat(val.to_120_180)
            //         over_180_tc += parseFloat(val.over_180_tc)
            //         over_180_ += parseFloat(val.over_180_)
            //     });

            //     var total = [
            //         {
            //             hour: '',
            //             packaging_sales: packaging_sales.toFixed(2),
            //             net_sales: net_sales.toFixed(2),
            //             total_sales: total_sales.toFixed(2),
            //             avg_check: avg_check.toFixed(2),
            //             all_avg_time: "Invalid date" == moment((all_avg_time / total_orders)*1000).format('HH:mm:ss') ? '0' : moment((all_avg_time / total_orders)*1000).format('HH:mm:ss'),
            //             total_orders: total_orders,
            //             avg_less_90: "Invalid date" == moment((avg_less_90 / total_orders)*1000).format('HH:mm:ss') ? '0' : moment((avg_less_90 / total_orders)*1000).format('HH:mm:ss'),
            //             less_90_tc: less_90_tc,
            //             less_90_: "NaN%" == ((less_90_tc / total_orders) * 100).toFixed(2)+"%" ? '0' : ((less_90_tc / total_orders) * 100).toFixed(2)+"%",
            //             to_90_120_tc: to_90_120_tc,
            //             to_90_120_:  "NaN%" == ((to_90_120_tc / total_orders) * 100).toFixed(2)+"%" ? '0' : ((to_90_120_tc / total_orders) * 100).toFixed(2)+"%",
            //             to_120_180: to_120_180,
            //             to_120_180_: "NaN%" == ((to_120_180 / total_orders) * 100).toFixed(2)+"%" ? '0' : ((to_120_180 / total_orders) * 100).toFixed(2)+"%",
            //             over_180_tc: over_180_tc,
            //             over_180_: "NaN%" == ((over_180_tc / total_orders) * 100).toFixed(2)+"%" ? '0' : ((over_180_tc / total_orders) * 100).toFixed(2)+"%",
            //         }
            //     ]
            //     var data = result.concat(total)
            //     this.rows = data
            // }
        },
        exportFiltered () {
            var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            var exportName = user.store_name+"/CustomerReceiveTime/"+rdate
            // naive encoding to csv format
            const content = [ this.columns.map(col => wrapCsvValue(col.label)) ].concat(
                this.$refs.tb.filteredSortedRows.map(row => this.columns.map(col => wrapCsvValue(
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
    }
})
</script>
<style>
.q-table thead tr {
    background-color: #e9e9e9; 
}

.q-table > tbody > tr:last-child {
    background: #e9e9e9;
    font-weight: bold; 
}

.gutter {
    margin-top: 5px;
}
</style>