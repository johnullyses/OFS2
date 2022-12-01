<template>
    <div style="overflow: auto; height: 86vh;">
        <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
            <div class="col-6">
                <div style="font-size: 20px"><b>Sales</b></div>
            </div>
            <div class="col-6">
                <div style="font-size: 15px; text-align: right"><b>Date: </b> {{this.todate}}</div>
            </div>
        </div>
        <div style="margin-left: 15px; margin-top: 15px; font-size: 15px;"><b>Filters:</b></div>
            <div class="items-start q-pa-md row">
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-select 
                        bg-color="white" 
                        outlined 
                        :options="sourcesOption"
                        v-model="source"
                        option-value="id"
                        option-label="source_name"
                        hint="Source" 
                        label="All order sources" 
                        dense >
                    </q-select>
                </div>
            <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-select 
                        bg-color="white" 
                        outlined 
                        :options="paymentOption"
                        v-model="payment"
                        option-value="id"
                        option-label="payment_type"
                        hint="Payment" 
                        label="All order sources" 
                        dense>
                    </q-select>
                </div>
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-select 
                        bg-color="white" 
                        outlined 
                        :options="methodOption"
                        v-model="method"
                        option-value="id"
                        option-label="name"
                        hint="Method" 
                        label="All order sources" 
                        dense >
                    </q-select>
                </div>
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-select 
                        bg-color="white" 
                        outlined 
                        :options="['Daily', 'Hourly']"
                        v-model="groupBy"
                        option-value="id"
                        option-label="name"
                        hint="Group By" 
                        label="Group By" 
                        @update:model-value="reset()"
                        dense >
                    </q-select>
                </div>
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-input  bg-color="white" outlined type="date" hint="Start date *" v-model="startDate" dense ></q-input>
                </div>
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-input bg-color="white" outlined type="date" hint="End date *" :min="minDate" :max="maxDate" v-model="endDate" dense ></q-input>
                </div>
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-btn
                        style="width: 100%;"
                        color="primary"
                        icon-right="search"
                        label="Search"
                        no-caps
                        @click="searchFilter"
                    ></q-btn>
                </div>
                <div class="col-sm-3 col-xs-6 q-pa-sm">
                    <q-btn
                        style="width: 100%;"
                        color="primary"
                        icon-right="archive"
                        label="Export to csv"
                        no-caps
                        @click="exportFiltered"
                    ></q-btn>
                </div>
            </div>
            <div>
                <div class="q-pa-md">
                    <q-table
                        v-if="groupBy == 'Daily'"
                        id="test"
                        :pagination="initialPagination"
                        color="primary"
                        :columns="columns"
                        :rows="sales"
                        row-key="name"
                        ref="tb"
                        :loading="loading"
                    >
                    </q-table>
                    <q-table
                        v-if="groupBy == 'Hourly'"
                        id="test"
                        :pagination="initialPagination"
                        color="primary"
                        :columns="hourlyColumns"
                        :rows="sales"
                        row-key="name"
                        ref="tb"
                    >
                    </q-table>
                </div>
            </div>
        </div>
        <q-dialog v-model="dialog" :position="position">
            <q-card style="width: 350px">
                <q-card-section class="row items-center no-wrap">
                <div>
                    <div class="text-weight-bold" style="color: red">Alert!</div>
                    <div class="text-grey">Start date & End date are required.</div>
                </div>
                </q-card-section>
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

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export default defineComponent({
    name: 'Sales',
    async beforeMount() {
        await this.allSources();
    },
    computed: {
        ...mapGetters('Sales', {
            sales: 'GET_SALES',
            sources: 'GET_SOURCES',
            loading: 'GET_LOADING'
        }),
        ...mapGetters('Auth', {
            user: 'GET_PROFILE'
        }),
        sourcesOption() {
            var sources = this.sources
            return sources.sources    
        },
        paymentOption() {
            var sources = this.sources
            return sources.payment    
        },
        methodOption() {
            var sources = this.sources
            return sources.method    
        }
    },
    data() {
        return {
            todate:date,
            initialPagination: {
                sortBy: 'desc',
                descending: true,
                rowsPerPage: 50
            },
            columns: [
                // { name: 'store_name', label: 'Store name', field: 'store_name', align: 'center' },
                { name: 'DateDay', label: 'Day', field: 'DateDay', align: 'center' },
                { name: 'CashTC', label: 'Cash TC', field: 'CashTC', align: 'center' },
                { name: 'VouchersTC', label: 'Vouchers TC', field: 'VouchersTC', align: 'center' },
                { name: 'CreditCardTC', label: 'Paymaya TC', field: 'CreditCardTC', align: 'center' },
                { name: 'GcashTC', label: 'Gcash TC', field: 'GcashTC', align: 'center' },
                { name: 'BankTransferTC', label: 'Bank Transfer TC', field: 'BankTransferTC', align: 'center' },
                { name: 'CreditCardTC', label: 'Credit Card TC', field: 'CreditCardTC', align: 'center' },
                { name: 'AdvanceTC', label: 'Advance Order', field: 'AdvanceTC', align: 'center' },
                { name: 'SCDTC', label: 'SCD TC', field: 'SCDTC', align: 'center' },
                { name: 'PWDTC', label: 'PWD TC', field: 'PWDTC', align: 'center' },
                { name: 'SCD_DISC', label: 'SCD DISC.', field: 'SCD_DISC', field: 'SCD_DISC', align: 'center' },
                { name: 'PWD_DISC', label: 'PWD DISC.', field: 'PWD_DISC', align: 'center' },
                { name: 'Discount', label: 'Discount', field: 'Discount', align: 'center' },
                { name: 'PROMOTC', label: 'Promo TC', field: 'PROMOTC', align: 'center' }, 
                { name: 'PromoDiscount', label: 'Promo Discount', field: 'PromoDiscount', align: 'center' },
                { name: 'TC', label: 'TC', field: 'TC', align: 'center' },
                { name: 'PackagingSales', label: 'Packaging Sale', field: 'PackagingSales', align: 'center' },
                { name: 'NetSales', label: 'Net Sale', field: 'NetSales', align: 'center' },
                { name: 'Sales', label: 'Gross Sale', field: 'Sales', align: 'center' },
                { name: 'AC', label: 'AC', field: 'AC', align: 'center' },
                { name: 'DeliverySalesTC', label: 'Delivery Sales TC', field: 'DeliverySalesTC', align: 'center' },
                { name: 'PickupSalesTC', label: 'Pickup Sales TC', field: 'PickupSalesTC', align: 'center' },
            ],
            hourlyColumns: [
                // { name: 'store_name', label: 'Store name', field: 'store_name', align: 'center' },
                { name: 'hour', label: 'Hour', field: 'hour', align: 'center' },
                { name: 'CashTC', label: 'Cash TC', field: 'CashTC', align: 'center' },
                { name: 'VouchersTC', label: 'Vouchers TC', field: 'VouchersTC', align: 'center' },
                { name: 'CreditCardTC', label: 'Paymaya TC', field: 'CreditCardTC', align: 'center' },
                { name: 'GcashTC', label: 'Gcash TC', field: 'GcashTC', align: 'center' },
                { name: 'BankTransferTC', label: 'Bank Transfer TC', field: 'BankTransferTC', align: 'center' },
                { name: 'CreditCardTC', label: 'Credit Card TC', field: 'CreditCardTC', align: 'center' },
                { name: 'AdvanceTC', label: 'Advance Order', field: 'AdvanceTC', align: 'center' },
                { name: 'SCDTC', label: 'SCD TC', field: 'SCDTC', align: 'center' },
                { name: 'PWDTC', label: 'PWD TC', field: 'PWDTC', align: 'center' },
                { name: 'SCD_DISC', label: 'SCD DISC.', field: 'SCD_DISC', field: 'SCD_DISC', align: 'center' },
                { name: 'PWD_DISC', label: 'PWD DISC.', field: 'PWD_DISC', align: 'center' },
                { name: 'Discount', label: 'Discount', field: 'Discount', align: 'center' },
                { name: 'PROMOTC', label: 'Promo TC', field: 'PROMOTC', align: 'center' }, 
                { name: 'PromoDiscount', label: 'Promo Discount', field: 'PromoDiscount', align: 'center' },
                { name: 'TC', label: 'TC', field: 'TC', align: 'center' },
                { name: 'PackagingSales', label: 'Packaging Sale', field: 'PackagingSales', align: 'center' },
                { name: 'NetSales', label: 'Net Sale', field: 'NetSales', align: 'center' },
                { name: 'Sales', label: 'Gross Sale', field: 'Sales', align: 'center' },
                { name: 'AC', label: 'AC', field: 'AC', align: 'center' },
                { name: 'DeliverySalesTC', label: 'Delivery Sales TC', field: 'DeliverySalesTC', align: 'center' },
                { name: 'PickupSalesTC', label: 'Pickup Sales TC', field: 'PickupSalesTC', align: 'center' },
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
            maxDate: '',
            groupBy: 'Daily'
        }
    },
    methods: {
        ...mapActions('Sales', [
            'getSales',
            'allSources',
            'reset'
        ]),
        exportFiltered () {
            var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            var exportName = user.store_name+"/Sales/"+rdate
            // naive encoding to csv format
            var content = null
            if (this.groupBy == "Daily") {
                content = [ this.columns.map(col => wrapCsvValue(col.label)) ].concat(
                this.$refs.tb.filteredSortedRows.map(row => this.columns.map(col => wrapCsvValue(
                typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
                col.format
                    )).join(','))
                ).join('\r\n')
            } else {
                content = [ this.hourlyColumns.map(col => wrapCsvValue(col.label)) ].concat(
                this.$refs.tb.filteredSortedRows.map(row => this.hourlyColumns.map(col => wrapCsvValue(
                typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
                col.format
                    )).join(','))
                ).join('\r\n')
            }
          

            const status = exportFile(
                exportName+".csv",
                content,
                'text/csv'
            )
        },
        async searchFilter() {
            console.log({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    source: this.source["source_name"],
                    payment: this.payment["payment_type"],
                    method: this.method["name"],
                    report_group_by: "day"
                })

            if (this.startDate == '' || this.endDate == '') {
                this.dialog = true
                this.rows = [] 
            } else {
                await this.getSales({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    source: this.source["source_name"],
                    payment: this.payment["payment_type"],
                    method: this.method["name"],
                    report_group_by: this.groupBy
                }); 
                console.log(this.sales)
                this.rows = this.sales
            }
  
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
<style lang="sass">
.q-table 
	thead 
		tr 
			background-color: #e9e9e9 
.q-table 
	& > tbody 
		& > tr 
			&:last-child 
				background: #e9e9e9 
				font-weight: bold 
</style>


