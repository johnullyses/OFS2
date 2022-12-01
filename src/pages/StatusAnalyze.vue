<template>
    <div  style="max-height: 90vh; overflow: auto;">
        <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
            <div class="col-6">
                <div style="font-size: 20px"><b>Status Analyze</b></div>
            </div>
            <div class="col-6">
                <div style="font-size: 15px; text-align: right"><b>Date: </b> Today</div>
            </div>
        </div>
        <div style="margin-left: 15px; margin-top: 15px; font-size: 15px;"><b>Filters:</b></div>
        <div class="row items-start q-pa-md">
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-input bg-color="white" outlined type="date" hint="Start date *" v-model="startDate" dense style="margin-right: 8px"></q-input>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2 gutter">
                <q-input bg-color="white" outlined type="date" hint="End date *" :min="minDate" :max="maxDate" v-model="endDate" dense style="margin-right: 8px"></q-input>
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
                <q-card class="my-card" style="margin-bottom: 7px; font-size: 13px;">
                    <div style="padding: 12px">
                        LEGEND:<br>
                        <b>OR</b> = Order Recieve<br>
                        <b>OA</b> = Order Acknowledge<br>
                        <b>RA</b> = Rider Assign<br>
                        <b>RO</b> = Rider Out<br>
                        <b>RB</b> = Rider Back
                    </div>
                </q-card>
                <q-table
                    id="test"
                    :pagination="initialPagination"
                    color="primary"
                    :columns="columns"
                    row-key="order_number"
                    ref="tb"
                    :rows="rows"
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
    name: 'StatusAnalyze',
    computed: {
        ...mapGetters('StatusAnalyze', {
            statusAnalysisData: 'GET_STATUS_ANALYZE',
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
                // { name: 'store_name', label: 'Store name', field: 'store_name', align: 'center' },
                { name: 'code', label: 'Code', field: 'code', align: 'center' },
                { name: 'order_number', label: 'Order No.', field: 'order_number', align: 'center' },
                { name: 'total_net', label: 'Net Total', field: 'total_net', align: 'center' },
                { name: 'total_gross', label: 'Gross Total', field: 'total_gross', align: 'center' },
                { name: 'received_to_acknowledge', label: 'OR->OA', field: 'received_to_acknowledge', align: 'center' },
                { name: 'acknowledge_to_rider_assigned', label: 'OA->RA', field: 'acknowledge_to_rider_assigned', align: 'center' },
                { name: 'rider_assigned_to_rider_out', label: 'RA->RO', field: 'rider_assigned_to_rider_out', align: 'center' },
                { name: 'rider_out_to_rider_back', label: 'RO->RB', field: 'rider_out_to_rider_back', align: 'center' },
                { name: 'rider_back_to_close', label: 'RB->CLOSED', field: 'rider_back_to_close', align: 'center' },
            ],
            rows: [],
            startDate: '',
            endDate: '',
            minDate: '',
            maxDate: '',
            total_net: '',
            total_gross: '',
            dialog: false,
        }
    },
    methods: {
        ...mapActions('StatusAnalyze', [
            'getStatusAnalyze'
        ]),
        searchFilter() {
            if (this.startDate == '' || this.endDate == '') {
                this.dialog = true
                this.rows = [] 
            } else {
                this.getStatusAnalyze({
                    startDate: this.startDate,
                    endDate: this.endDate,
                }).then(() => {
                    var result = this.statusAnalysisData

                    var totalNet = 0
                    var totalGross = 0
                    var received_to_acknowledge = 0
                    var acknowledge_to_rider_assigned = 0
                    var rider_assigned_to_rider_out = 0
                    var rider_out_to_rider_back = 0
                    var rider_back_to_close = 0
                    result.forEach(val => {
                        totalNet += parseFloat(val.total_net)
                        totalGross += parseFloat(val.total_gross)
                        received_to_acknowledge += parseFloat(val.received_to_acknowledge)
                        acknowledge_to_rider_assigned += parseFloat(val.acknowledge_to_rider_assigned)
                        rider_assigned_to_rider_out += parseFloat(val.rider_assigned_to_rider_out)
                        rider_out_to_rider_back += parseFloat(val.rider_out_to_rider_back)
                        rider_back_to_close += parseFloat(val.rider_back_to_close)
                    });
                
                    var total = [
                        {
                            code: "TC " + result.length,
                            order_number: '',
                            total_net: totalNet.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            total_gross: totalGross.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            received_to_acknowledge: (received_to_acknowledge / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') == 'NaN' ? '0' : (received_to_acknowledge / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            acknowledge_to_rider_assigned: (acknowledge_to_rider_assigned / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') == 'NaN' ? '0' : (acknowledge_to_rider_assigned / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            rider_assigned_to_rider_out: (rider_assigned_to_rider_out / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') == 'NaN' ? '0' : (rider_assigned_to_rider_out / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            rider_out_to_rider_back: (rider_out_to_rider_back / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') == 'NaN' ? '0' : (rider_out_to_rider_back / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            rider_back_to_close: (rider_back_to_close / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') == 'NaN' ? '0' : (rider_back_to_close / result.length).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        }
                    ]
                    var data = result.concat(total)
                    this.rows = data
                });
            }
        },
        exportFiltered() {
            var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            var exportName = user.store_name+"/StatusAnalyze/"+rdate
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


