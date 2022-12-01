<template>
  <div class="q-pa-md" container>
    <div>
      <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
        <div class="col-6">
          <div style="font-size: 20px"><b>Store Management</b></div>
        </div>
        <div class="col-6">
          <div style="font-size: 15px; text-align: right"><b>Date: </b>{{this.todate}}</div>
        </div>
      </div>
    </div>    
    <div class="q-gutter-md row items-start q-pa-md">
      <q-btn
        color="primary"
        icon-right="add"
        label="Add Store"
        no-caps
        @click="addStore"
      ></q-btn>
    </div>
    <div style="min-height: 100vh">
      <div class="q-pa-md">
        <q-table
          class="store-list"
          :pagination="pagination"
          :loading="storesListLoading"          
          :visible-columns="visibleColumns"
          color="primary"
          :columns="columns"
          :rows="rows"
          row-key="name"
          ref="tb"
        >
          <template v-slot:body-cell-store_code="props">
            <q-td :props="props">
              <a @click.prevent='routeToStore(props.row.store_id)' href="#">{{ props.row.store_code }}</a>
            </q-td>
          </template>
          <template v-slot:body-cell-is_active="props">
            <q-td :props="props">
                <q-chip
                  :color="props.row.is_active  ? 'green': !props.row.is_active ? 'red': 'grey'"
                  text-color="white"
                  dense
                  class="text-weight-bolder"
                  square
                >{{props.row.is_active ? 'YES' : 'NO'}}</q-chip>
            </q-td>
          </template>
          <!-- <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense color="primary" @click="editStoreItems(props)" label="Items"></q-btn>
              <q-btn dense color="primary" @click="editStoreProducts(props)" label="Products"></q-btn>
            </q-td>          
          </template> -->
        </q-table>
      </div>
    </div>
  </div>
      <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card :class="alertColor + ' text-white'" style="width: 300px">
        <q-card-section>
          <div class="text-h6">ERROR </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{alertMessage}}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';
import { ref } from 'vue'

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0");
export default {
  name: "StoreManagement",
  data: () => ({
    alert: false,
    alertMessage: '',
    alertColor: 'bg-green',
    todate:date,
    visibleColumns: ['store_code', 'store_name', 'is_active', 'city'], 
    columns: [
      {
        name: "store_id",
        label: "Store ID",
        field: "store_id",
        align: "center",
      },
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
        align: "left",
      },
      {
        name: "is_active",
        label: "Is Active",
        field: "is_active",
        align: "center",
      },
      {
        name: "hostname",
        label: "Hostname",
        field: "hostname",
        align: "left",
      },
      {
        name: "city",
        label: "City",
        field: "city",
        align: "left",
      },
      { name: 'actions', label: 'Actions', field: '', align:'center' },
      // {
      //   name: "store_items",
      //   label: "Store Items",
      //   field: "store_items",
      //   align: "center",
      // },
      // {
      //   name: "store_products",
      //   label: "Store Products",
      //   field: "store_products",
      //   align: "center",
      // },
    ],
    rows:[],
    pagination: {
      page: 1,
      rowsPerPage: 30
    },
  }),
  computed: {
    ...mapGetters('Auth', {
      user: 'GET_PROFILE'
    }),
    ...mapGetters('StoreManagement', {
      storesList:'GET_STORE_LIST',
      storesListLoading: 'GET_STORE_LIST_LOADING',
      batsubscriptionInfo: 'GET_BAT_SUBSCRIPTION_INFO'
    })
  },
  methods: {
    ...mapActions('StoreManagement', [
      'storeList',
      'getsubscriptionInfo'
    ]),  
    async addStore(){
        await this.getsubscriptionInfo().then(() => {
          if(this.storesList.length>=this.batsubscriptionInfo ){
            this.alert = true
            this.alertColor = "bg-red"
            this.alertMessage = 'Store Limit Reached'
          }else{
            this.$router.push({path: '/store/create'})
          }
         
        })
    },
    routeToStore(id){
      this.$router.push({path: '/store/'+id})
    }
  },
  async beforeMount(){
      await this.storeList().then(() => {
        this.rows = this.storesList
        //console.log(this.storesList)
      })
     
  },
}
</script>

<style lang="sass">
.store-list
  height: 70vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #e9e9e9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  &.q-table--loading thead tr:last-child th
    top: 48px

</style>
