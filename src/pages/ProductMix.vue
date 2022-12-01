
<template>
  <div style="overflow: auto; max-height: 90vh; min-height: 90vh;">
      <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b>Product Mix</b></div>
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
                :options="productOptions"
                option-value="pos_code"
                v-model="chosenProduct"
                option-label="name"
                hint="Choose a product" 
                label="All Products"
                dense style="max-width: 200px">
            </q-select>
        </div>
        <div class="col-sm-2 col-xs-6 q-pa-sm">
          <q-select 
                bg-color="white" 
                outlined 
                :options="sourceOptions"
                option-value="id"
                v-model="chosenSource"
                option-label="source_name"
                hint="Choose a Source" 
                label="All Sources" 
                dense style="max-width: 200px">
            </q-select>
        </div>
        <div class="col-sm-2 col-xs-6 q-pa-sm">
           <q-select 
                bg-color="white" 
                outlined 
                :options="sourceOptions"
                option-value="id"
                v-model="chosenSource"
                option-label="source_name"
                hint="Choose a Source" 
                label="All Sources"
                dense style="max-width: 200px">
            </q-select>
        </div>
        <div class="col-sm-2 col-xs-6 q-pa-sm">
          <div>
                 <q-btn
                color="primary"
                icon-right="search"
                label="Search"
                no-caps
                @click="search"
                style="max-width: 150px;"
            ></q-btn>
          </div>

          <div style="padding-top:10px">
               <q-btn
                  color="primary"
                  icon-right="archive"
                  label="Export to csv"
                  no-caps
                  @click="exportTable"
                  style="max-width: 150px"
              ></q-btn> 
          </div>
         

           
        </div>
      </div>

          <div class="q-pa-md" style="padding-top:20px">
            <q-table
              title=""
              :rows="rows"
              :columns="columns"
              row-key="name"
              :pagination="pagination"
              :loading="loading"
            >
            </q-table>
          </div>
  </div>
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
  name: 'ProductMix',
  data: () => ({
    startDate:"",
    endDate:"",
    minDate: '',
    maxDate: '',
    persistent: ref(false),
    rows:[],
    productOptions:[],
    sourceOptions:[],
    chosenProduct:'',
    chosenSource:'',
    chosenStart:'',
    chosenEnd:'',
    source:'',
    product:'',
    todate:date,
    initialPagination: {
                sortBy: 'desc',
                descending: true,
                rowsPerPage: 50
    },
    pagination: {
        page: 1,
        rowsPerPage: 25
    },
    columns:[
          {
            name: 'POSCODE',
            required: true,
            label: 'POSCODE',
            align: 'left',
            field: row => row.pos_code,
            format: val => `${val}`,
            sortable: true
          },
            {
            name: 'Product',
            required: true,
            label: 'Product',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
          }, {
            name: 'Category',
            required: true,
            label: 'Category',
            align: 'left',
            style: "width: 10px",
            field: row => row.category,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'Quantity',
            required: true,
            label: 'Quantity',
            align: 'left',
            style: "width: 20px",
            field: row => row.quantity,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'UPT',
            required: true,
            label: 'UPT',
            align: 'left',
            style: "width: 10px",
            field: row => row.upt,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'NetTotal',
            required: true,
            label: 'Net Total',
            align: 'left',
            style: "width: 20px",
            field: row => row.net_total,
            format: val => `${val}`,
            sortable: true
          },
         
      ],
  }),
  computed: {
    ...mapGetters('ProductMix', {
      productMixReport:'GET_PRODUCT_MIX',
      productlist:'GET_PRODUCT_LIST',
      sourceslist:'GET_SOURCES_LIST',
      loading: 'GET_LOADING'
    }),
    ...mapGetters('Auth', {
      user: 'GET_PROFILE'
    })
  },
  methods: {
    ...mapActions('ProductMix', [
      'getProductMix',
      'getProductsList',
      'getSourcesList',
      'getSearchResult'
    ]),
    async search(){
      console.log("pumasok")
      if(this.startDate==''){
        this.chosenStart='ALL'
      }else{
        this.chosenStart=this.startDate
      }
      if(this.endDate==''){
        this.chosenEnd='ALL'
      }else{
        this.chosenEnd=this.endDate
      }
      if(this.chosenProduct==''){
        this.product='ALL'
      }else{
        this.product=this.chosenProduct.pos_code
      }
      if(this.chosenSource==''){
        this.source='ALL'
      }else{
        this.source=this.chosenSource.id
      }
      await this.getSearchResult({
        store_id: this.user.store_id,
        startDate: this.chosenStart,
        endDate: this.chosenEnd,
        source: this.source,
        product: this.product,
      }).then(() => {
         this.rows = this.productMixReport
          this.startDate=""
          this.endDate=""
      });
         
     
    },
    async exportTable(){
      var date = new Date();
            date.setDate(date.getDate());
            var rdate = date.toISOString().slice(0, 10)
            var user = this.user
            let rows= this.productMixReport
            var exportName = user.store_name+"/ProductMix/"+rdate
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
    await this.getProductMix({
      store_id: this.user.store_id
    }).then(() => {
      this.rows = this.productMixReport
    }); 
    await this.getProductsList({
        store_id: this.user.store_id
    }).then(() => {
      this.productOptions = this.productlist
    });
    await this.getSourcesList({
        store_id: this.user.store_id
    }).then(() => {
      this.sourceOptions = this.sourceslist
    });
     
  }
})
</script>

<style scoped>
    
</style>