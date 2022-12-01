<template>
    <div style="max-height: 90vh; overflow: auto;">
        <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
            <div class="col-6">
                <div style="font-size: 20px"><b>Cancelled Orders</b></div>
            </div>
            <div class="col-6">
                <div style="font-size: 15px; text-align: right"><b>Date: </b> Today</div>
            </div>
        </div>
        <div style="margin-left: 15px; margin-top: 15px; font-size: 15px;"><b>Filters:</b></div>
        <div class="row items-start q-pa-md">
             <!-- <q-input bg-color="white" outlined v-model="searchText" label="Search" dense>
                <template v-slot:append>
                    <q-icon name="search" ></q-icon>
                </template>
            </q-input> -->
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-select 
                    bg-color="white" 
                    outlined 
                    :options="sourcesOption"
                    v-model="source"
                    option-value="id"
                    option-label="source_name"
                    hint="Source" 
                    label="All order sources" 
                    dense style="margin-right: 8px">
                    <!-- <template v-slot:append>
                        <q-icon v-if="source !== ''" name="close" @click.stop="source = ''" class="cursor-pointer" />
                    </template> -->
                </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-select 
                    bg-color="white" 
                    outlined 
                    :options="paymentOption"
                    v-model="payment"
                    option-value="id"
                    option-label="payment_type"
                    hint="Payment" 
                    label="All order sources" 
                    dense style="margin-right: 8px">
                </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-select 
                    bg-color="white" 
                    outlined 
                    :options="methodOption"
                    v-model="method"
                    option-value="id"
                    option-label="name"
                    hint="Method" 
                    label="All order sources" 
                    dense style="margin-right: 8px">
                </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-input style="margin-right: 8px" bg-color="white" outlined type="date" hint="Start date *" v-model="startDate" dense ></q-input>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-input style="margin-right: 8px" bg-color="white" outlined type="date" hint="End date *" :min="minDate" :max="maxDate" v-model="endDate" dense ></q-input>
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
    name: 'CancelledOrders',
    async beforeMount() {
        // await this.cancelledOrder(); 
        await this.allSources();
        // await this.cancelledOrderTable();
    },
    computed: {
        ...mapGetters('CancelledOrder', {
            orderCancelled: 'GET_ORDER_CANCELLED',
            sources: 'GET_SOURCES',
            loading: 'GET_LOADING',
        }),
        ...mapGetters('Auth', {
            user: 'GET_PROFILE'
        }),
        sourcesOption() {
            var sources = this.sources
            var all = [{id: 0, source_name: 'All'}]
            var merge = all.concat(sources.sources)
            return merge    
        },
        paymentOption() {
            var sources = this.sources
            var all = [{id: 0, payment_type: 'All'}]
            var merge = all.concat(sources.payment)
            return merge   
        },
        methodOption() {
            var sources = this.sources
             var all = [{id: 0, name: 'All'}]
            var merge = all.concat(sources.method)
            return merge   
        }
    },
    data() {
        return {
            initialPagination: {
                sortBy: 'desc',
                descending: true,
                rowsPerPage: 50
            },
            columns: [
                // { name: 'store_name', label: 'Store name', field: 'store_name', align: 'center' },
                { name: 'order_number', label: 'Order No', field: 'order_number', align: 'center' },
                { name: 'order_source', label: 'Order Source', field: 'order_source', align: 'center' },
                { name: 'payment', label: 'Payment', field: 'payment', align: 'center' },
                { name: 'service_method', label: 'Service Method', field: 'service_method', align: 'center' },
                { name: 'customer_name', label: 'Customer Name', field: 'customer_name', align: 'center' },
                { name: 'phone', label: 'Phone', field: 'phone', align: 'center' },
                { name: 'order_time', label: 'Order Time', field: 'order_time', align: 'center' },
                { name: 'net_price', label: 'NetPrice(Exc.DC)', field: 'net_price', align: 'center' },
                { name: 'gross_price', label: 'GrossPrice(Inc.DC)', field: 'gross_price', align: 'center' },
                { name: 'reason', label: 'Reason', field: 'reason', field: 'reason', align: 'center' },
                { name: 'primary_issue', label: 'Primary Issue', field: 'primary_issue', align: 'center' },
                { name: 'cancellation_reason', label: 'Cancellation Reason', field: 'cancellation_reason', align: 'center' },
                { name: 'cancelled_by', label: 'Cancelled By', field: 'cancelled_by', align: 'center' }, 
                { name: 'cancelled_date', label: 'Cancelled Date', field: 'cancelled_date', align: 'center' },
            ],
            rows: [],
            total_net: '',
            total_gross: '',
            searchText:'',
            startDate: '',
            endDate: '',
            source: { source_name: "All" },
            payment: { payment_type: "All" },
            method: { name: "All" },
            dialog: false,
            position: 'top',
            minDate: '',
            maxDate: ''
        }
    },
    methods: {
        ...mapActions('CancelledOrder', [
            'cancelledOrder',
            'allSources'
        ]),
        async cancelledOrderTable() {
            var orderCancelled = this.orderCancelled
            var arr2 = []
            orderCancelled.forEach(val => {
                this.total_net += parseFloat(val.total_w_vat)
                var arr = {
                    // store_name: 'TEasdasdads',
                    order_number: val.order_pin,
                    order_source: val.order_source,
                    payment: val.payment_text,
                    service_method: val.service_method_text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }),
                    customer_name: val.customer.first_name+" "+val.customer.last_name,
                    phone: val.customer.home_phone_1,
                    order_time: val.order_date,
                    net_price: val.total_w_vat,
                    gross_price: val.total_gross,
                    reason: '',
                    primary_issue: val.reason_primary,
                    cancellation_reason: val.reason_secondary,
                    cancelled_by: val.canceled_by_name,
                    cancelled_date: val.canceled_datetime
                }
                arr2.push(arr)
            });
            this.rows = arr2 
        },
        exportFiltered () {
            var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            var exportName = user.store_name+"/CancelledOrders/"+rdate
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
        searchFilter() {
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            if (this.startDate == '' || this.endDate == '') {
                this.dialog = true
                this.rows = [] 
            } else {
                this.cancelledOrder({
                startDate: this.startDate,
                endDate: this.endDate,
                source: this.source,
                payment: this.payment,
                method: this.method,
                }).then(() => {
                    var result = this.orderCancelled
                    var arr2 = []
                    result.forEach(val => {
                        var arr = {
                            // store_name: 'TEasdasdads',
                            order_number: val.order_pin,
                            order_source: val.order_source,
                            payment: val.payment_text,
                            service_method: val.service_method_text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }),
                            customer_name: val.customer.first_name+" "+val.customer.last_name,
                            phone: val.customer.home_phone_1,
                            order_time: val.order_date,
                            net_price: val.total_w_vat,
                            gross_price: val.total_gross,
                            reason: '',
                            primary_issue: val.reason_primary,
                            cancellation_reason: val.reason_secondary,
                            cancelled_by: val.canceled_by_name,
                            cancelled_date: val.canceled_datetime
                        }
                        arr2.push(arr)
                    });

                    var totalNet = 0
                    var totalGross = 0
                    arr2.forEach(ele => {
                        totalNet += parseFloat(ele.net_price)
                        totalGross += parseFloat(ele.gross_price)
                    })
                    this.total_net = totalNet
                    this.total_gross = totalGross

                    var total = [
                        {
                            // store_name: 'TEasdasdads',
                            order_number: 'TC: '+arr2.length,
                            order_source: '',
                            payment: '',
                            service_method: '',
                            customer_name: '',
                            phone: '',
                            order_time: '',
                            net_price: this.total_net,
                            gross_price: this.total_gross,
                            reason: '',
                            primary_issue: '',
                            cancellation_reason: '',
                            cancelled_by: '',
                            cancelled_date: ''
                        }
                    ]

                    var data = arr2.concat(total)
                    this.rows = data
                })
            }
            
            // const today = new Date();
            // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // if (this.startDate == '' || this.endDate == '') {
            //     this.dialog = true
            //     this.rows = [] 
            // } else {
            //     var orderCancelled = this.orderCancelled
            //     let startDate = this.startDate
            //     let endDate = this.endDate
            //     let source = this.source
            //     let payment = this.payment
            //     let method = this.method

                // var result = orderCancelled.filter(function(item){
                //     let filtered = true
                //     if (startDate && endDate) {
                //         filtered =  startDate <= item.order_date.split(" ")[0] && endDate >= item.order_date.split(" ")[0]
                //     }
                //     if (filtered) {
                //         if (source) {
                //             filtered = item.order_source.toLowerCase().includes(source['source_name'].toLowerCase())
                //         }
                //     }
                //     if (filtered) {
                //         if (payment) {
                //             filtered = item.payment_text.toLowerCase().includes(payment['payment_type'].toLowerCase())
                //         }
                //     }
                //     if (filtered) {
                //         if (method) {
                //             filtered = item.service_method_text.toLowerCase().includes(method['name'].toLowerCase())
                //         }
                //     }
                //     return filtered;
                // })
                // var result = orderCancelled.filter(order => {
                //     var fullname = order.customer.first_name+" "+order.customer.last_name
                //     // return fullname.toLowerCase().includes(this.searchText.toLowerCase()) ||
                // })
               
            // }
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


