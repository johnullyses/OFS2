<template>
  <div class="q-pa-md " style="overflow: auto; max-height: 90vh; min-height: 90vh;" container>      
    <div>
      <div
        class="q-pa-md row"
        style="
          margin-left: 15px;
          padding-left: 0px;
          border-bottom: 2px solid #dedede;
        "
      >
      <div class="col-6">
        <div style="font-size: 20px"><b>Billable</b></div>
      </div>
      <div class="col-6">
        <div style="font-size: 15px; text-align: right">
          <b>Date: </b> Today
        </div>
      </div>
    </div>
    <div style="margin-left: 15px; margin-top: 15px; font-size: 15px">
      <b>Filters:</b>
    </div>
    <div class="q-pr-md">
      <div class="row items-start q-pa-md">
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs">
          <q-select
            bg-color="white"
            outlined
            :options="sourcesOption"
            v-model="source"
            option-value="id"
            option-label="source_name"
            hint="Source"
            label="All order sources"
            dense
          >
          </q-select>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs">
          <q-select
            bg-color="white"
            outlined
            :options="paymentOption"
            v-model="payment"
            option-value="id"
            option-label="payment_type"
            hint="Payment"
            label="All order sources"
            dense
          >
          </q-select>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs">
          <q-select
            bg-color="white"
            outlined
            :options="methodOption"
            v-model="method"
            option-value="id"
            option-label="name"
            hint="Method"
            label="All order sources"
            dense
          >
          </q-select>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs">
          <q-input
            bg-color="white"
            outlined
            type="date"
            hint="Start date *"
            v-model="startDate"
            dense
          ></q-input>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs">
          <q-input
            bg-color="white"
            outlined
            type="date"
            hint="End date *"
            :min="minDate"
            :max="maxDate"
            v-model="endDate"
            dense
          ></q-input>
        </div>
        <div class="col-md-2 col-sm-6 col-xs-12 q-pa-xs">
          <q-btn
            style="width: 100%;"
            color="primary"
            icon-right="search"
            label="Search"
            no-caps
            @click="searchFilter"
          ></q-btn>
        </div>
        <div class="col-md-2 col-sm-6 col-xs-12 q-pa-xs">
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
        <div class="q-pl-md">
          <q-table
            :class="scroll"
            id="test"
            :hide-pagination="true"
            :loading="loading"
            color="primary"
            :columns="columns"
            :rows="rows"
            row-key="name"
            ref="tb"
          >
          </q-table>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineComponent, ref } from "vue";
import { exportFile } from "quasar";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

export default defineComponent({
  name: "Billable",
  async beforeMount() {
    await this.allSources();
  },
  computed: {
    ...mapGetters("BillableItems", {
      billable: "GET_BILLABLE_ITEMS",
      sources: "GET_SOURCES",
      loading: "GET_LOADING",
    }),
    ...mapGetters("Auth", {
      user: "GET_PROFILE",
    }),
    sourcesOption() {
      var sources = this.sources;
      return sources.sources;
    },
    paymentOption() {
      var sources = this.sources;
      return sources.payment;
    },
    methodOption() {
      var sources = this.sources;
      return sources.method;
    },
  },
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: true,
        rowsPerPage: 50,
      },
      columns: [
        {
          name: "store_code",
          label: "Store Code",
          field: "store_code",
          align: "center",
        },
        {
          name: "store_name",
          label: "Store Name",
          field: "store_name",
          align: "center",
        },
        {
          name: "voice_tc",
          label: "Voice TC",
          field: "voice_tc",
          align: "center",
        },
        {
          name: "digital_tc",
          label: "Digital TC",
          field: "digital_tc",
          align: "center",
        },
        {
          name: "digital_aor_tc",
          label: "Digital AOR TC",
          field: "digital_aor_tc",
          align: "center",
        },
        {
          name: "digital_aa_tc",
          label: "Digital Agent Assisted TC",
          field: "digital_aa_tc",
          align: "center",
        },
        {
          name: "voice_billable_sales",
          label: "Voice Billable Sales",
          field: "voice_billable_sales",
          align: "center",
        },
        {
          name: "digital_billable_sales",
          label: "Digital Billable Sales",
          field: "digital_billable_sales",
          align: "center",
        },
        {
          name: "digital_aor_billable_sales",
          label: "Digital AOR Billable Sales",
          field: "digital_aor_billable_sales",
          align: "center",
        },
        {
          name: "digital_aa_billable_sales",
          label: "Digital Agent Assisted Digital Sales",
          field: "digital_aa_billable_sales",
          align: "center",
        },
      ],
      rows: [],
      /* total_voice_tc: "",
      total_digital_tc: "",
      total_digital_aor_tc: "",
      total_digital_aa_tc: "",
      total_voice_billable_sales: "",
      total_digital_billable_sales: "",
      total_digital_aor_billable_sales: "",
      total_digital_aa_billable_sales: "", */
      searchText: "",
      startDate: "",
      endDate: "",
      source: { source_name: "All" },
      payment: { payment_type: "All" },
      method: { name: "All" },
      dialog: false,
      position: "top",
      minDate: "",
      maxDate: "",
      scroll: "",
    };
  },
  methods: {
    ...mapActions("BillableItems", ["billableSales", "allSources"]),
    exportFiltered() {
      var date = new Date();
      date.setDate(date.getDate());
      var rdate = date.toISOString().slice(0, 10);
      var user = this.user;
      var exportName = user.store_name + "/Billable/" + rdate;
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.$refs.tb.filteredSortedRows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(exportName + ".csv", content, "text/csv");
    },
    async searchFilter() {
      console.log({
        startDate: this.startDate,
        endDate: this.endDate,
        source: this.source["source_name"],
        payment: this.payment["payment_type"],
        method: this.method["name"],
      });

      if (this.startDate == "" || this.endDate == "") {
        this.dialog = true;
        this.rows = [];
      } else {
        this.billableSales({
          startDate: this.startDate,
          endDate: this.endDate,
          source: this.source,
          payment: this.payment,
          method: this.method,
        }).then(() => {
          var result = this.billable;

          console.log(this.billable);
          this.rows = result;
        });
      }
    },
  },
  watch: {
    startDate() {
      if (this.startDate == "") {
        this.minDate = "";
        this.maxDate = "";
      } else {
        this.minDate = this.startDate;
        var max = new Date(this.startDate);
        max.setDate(max.getDate() + 31);
        this.maxDate = max.toISOString().slice(0, 10);
      }
    },
  },
});
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
