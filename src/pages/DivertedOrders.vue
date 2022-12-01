<template>
    <div style="overflow: auto; height: 88vh;">
        <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
            <div class="col-6">
                <div style="font-size: 20px"><b>Diverted Orders</b></div>
            </div>
            <div class="col-6">
                <div style="font-size: 15px; text-align: right"><b>Date: </b> {{this.todate}}</div>
            </div>
        </div>
        <div style="margin-left: 15px; margin-top: 15px; font-size: 15px;"><b>Filters:</b></div>
            <div class="row items-start q-pa-md">
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-sm">
                    <q-input bg-color="white" outlined type="date" hint="Start date *" v-model="startDate" dense ></q-input>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-sm">
                    <q-input bg-color="white" outlined type="date" hint="End date *" :min="minDate" :max="maxDate" v-model="endDate" dense></q-input>
                </div>
                 <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-sm">
                    <q-btn
                        style="width: 100%;"
                        color="primary"
                        icon-right="search"
                        label="Search"
                        no-caps
                        @click="searchFilter"
                    ></q-btn>
                </div>
                 <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-sm">
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
                        :pagination="initialPagination"
                        color="primary"
                        :columns="columns"
                        :rows="divertedOrders"
                        :loading="loading"
                        row-key="name"
                        ref="tb"
                    >
                    </q-table>
                </div>
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

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export default defineComponent({
    name: 'Diverted Orders',
    computed: {
        ...mapGetters('DivertedOrder', {
            divertedOrders: 'GET_DIVERTED_ORDERS',
            loading: 'GET_LOADING'
        }),
        ...mapGetters('Auth', {
            user: 'GET_PROFILE'
        }),
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
                { name: 'order_number', label: 'Order No', field: 'order_number', align: 'center' },
                { name: 'order_date', label: 'Order Date', field: 'order_date', align: 'center' },
                { name: 'created_by', label: 'Created By', field: 'created_by', align: 'center' },
                { name: 'orig_store', label: 'From', field: 'orig_store', align: 'center' },
                { name: 'new_store', label: 'To', field: 'new_store', align: 'center' },
                { name: 'reason', label: 'Reason', field: 'reason', align: 'center' },
                { name: 'remarks', label: 'Remarks', field: 'remarks', align: 'center' },
                { name: 'diverted_by', label: 'Diverted By', field: 'diverted_by', align: 'center' },
                { name: 'diverted_date', label: 'Divert Date', field: 'diverted_date', align: 'center' }
            ],
            startDate: '',
            endDate: '',
            dialog: false,
            position: 'top',
            minDate: '',
            maxDate: ''
        }
    },
    methods: {
        ...mapActions('DivertedOrder', [
            'getDivertedOrders'
        ]),
        exportFiltered () {
            var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            var exportName = user.store_name+"/DivertedOrders/"+rdate
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
                this.getDivertedOrders({
                    startDate: this.startDate,
                    endDate: this.endDate
                })
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


