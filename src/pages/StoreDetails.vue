<template>
  <div class="q-pa-md" container>
    
    <q-form
      @submit="saveStoreDetails"
      ref="frmStoreDtl"
      greedy
    >
    <div>
      
      <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
        
          <div class="col-12 col-md-6" style="font-size: 20px"><b>Store Details</b></div>
          <div class="col-md text-right q-gutter-md">
            <q-btn  v-if="storeId != 0"
              :color="!editable ? 'primary' : 'negative'"
              :label="!editable ? 'Edit':'Cancel'"
              no-caps
              @click="toggleEdit"
            ></q-btn>
            

            <q-btn v-if="editable || storeId == 0"
              color=positive
              label="Save"
              no-caps
              type="submit" 
            ></q-btn>

            <q-btn
              :color="'negative'"
              :label="'Back to Store List'"
              no-caps
              @click="$router.go(-1)"
            ></q-btn>
          </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12" style="overflow: auto; max-height: 77vh;">
        <div class="row q-pa-md bg-white q-gutter-y-xs">
          <template v-for="(value, key) in fields" :key="key">
            <template v-if="keyToLabel(key) !== undefined">
              <template v-if="value.hide !== true">
                <div class="col-4 self-center"><b>{{keyToLabel(key).name}}</b> </div>
                <div class="col-8"> 
                  <template v-if="value.type === 'text' || value.type === 'password' || value.type === 'email'">
                    <template v-if="!editable"> 
                      <q-field outlined dense disable :loading="storeLoading">
                        <template v-slot:control>
                          <div class="self-center full-width no-outline" tabindex="0">
                            {{key=='hub_dec_pin' ? strToPass(storeDetails[key]) : storeDetails[key]}}
                          </div>
                        </template>
                      </q-field>
                    </template>
                    <template v-else >
                      <q-input dense outlined 
                      color="black" v-model="storeDetails[key]" 
                      :type="keyToLabel(key).type" @update:model-value="onInput({key:key, value:$event})" 
                      :maxlength="limiter(key)" 
                      :placeholder="isLatLong(key)" 
                      :rules="editable && (keyToLabel(key).isRequired ?? false) ? [val => (!!val || val===0) || 'Field is required'] : []"
                      hide-bottom-space >
                      </q-input>
                    </template>
                  </template>
                  <template v-else-if="keyToLabel(key).type === 'select'" >
                    <q-select outlined dense :options="keyToLabel(key).option" v-model="storeDetails[key]" 
                    @update:model-value="onInput({key:key, value:$event})" 
                    :option-value="keyToLabel(key).optionValue" 
                    :option-label="keyToLabel(key).optionlabel" 
                    emit-value map-options 
                    :use-input="keyToLabel(key).hasFilter" 
                    fill-input
                    hide-selected
                    :loading="keyToLabel(key).loading"
                    @filter="(input,update,abort) => { filterSelect({input,update,abort}, key) }"
                    input-debounce="0"
                    :disable="!editable || (keyToLabel(key).name=='City' && !storeDetails['province'])"
                    :rules="(keyToLabel(key).isRequired ?? false) ? [val => !!val || 'Please Select an Item.'] : []"
                    hide-bottom-space ></q-select>
                  </template>
                  <template v-else-if="keyToLabel(key).type === 'checkbox'" >
                    <q-checkbox class="readonly" size="md" v-model="storeDetails[key]" 
                    @update:model-value="onInput({key:key, value:$event})" tabindex="0" 
                    :disable="!editable" toggle-order="ft" hide-bottom-space></q-checkbox>
                  </template>
                </div>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>

    </q-form>
  <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale" @hide="doRedirect">
      <q-card :class="alertColor + ' text-white'" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{alertMessage}}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'StoreDetails',

  data:() => ({
      storeId:0,
      storeDtls: {},    
      editable: false,
      brands: { name: "Select Brand" },
      pc_type: { type: "Select PC Type" },
      store_region: { type: "Select Store Region" },
      store_region_type: { type: "Select Store Region Type" },
      store_type: { type: "Select Store Type" },
      provinceOptions: [],
      provinceItems: [],
      cityOptions: [],
      cityItems: [],
      fields: {
        code: {name:"Store Code", type:"text", isRequired: true},
        store_name: {name:"Store Name", type:"text", isRequired: true},
        hostname: {name:"Hostname", type:"text", isRequired: false, hide: true},
        address: {name:"Address", type:"text", isRequired: true},
        brand_id: {name:"Brand", type:"select", isRequired: false, hide: true},
        province: {name:"Province", type:"select", isRequired: true, hasFilter:true},
        city: {name:"City", type:"select", isRequired: true, hasFilter:true},
        profit_center_type: {name:"PC Type", type:"select", isRequired: false, hide: true},
        region: {name:"Store Region", type:"select", isRequired: false, hide: true},
        region_type: {name:"Store Region Type", type:"select", isRequired: false, hide: true},
        store_type: {name:"Store Type", type:"select", isRequired: false, hide: true},
        contact_numbers: {name:"Contact Numbers", type:"text", isRequired: true},
        contact_emails: {name:"Email", type:"email", isRequired: true},
        remarks: {name:"Remarks", type:"text", isRequired: true},
        y: {name:"Latitude", type:"text",isRequired: true,},
        x: {name:"Longitude", type:"text", isRequired: true,},
        receipt_message: {name:"Receipt footer Msg.", type:"text", hide: true},
        delivery_number: {name:"Digit convert no.", type:"text", hide: true},
        hub_dec_pin: {name:"Hub Declaration Pin", type:"password", isRequired: true},
        is_active: {name:"Active", type:"checkbox"},
        is_24hours: {name:"24 Hours", type:"checkbox"},
        is_grab_express: {name:"Grab Express", type:"checkbox"},
        is_mds_rider: {name:"RMS Rider", type:"checkbox"},
        printer_ip_address: {name:"Printer IP Address", type:"text", hide: true},
        paymaya_public_token: {name:"Paymaya Public Token", type:"text", hide: true},
        paymaya_secret_token: {name:"Paymaya Private Token", type:"text", hide: true},
        gcash_qr_code: {name:"GCash QR Code", type:"text", hide: true},
      },
      alert: false,
      alertMessage: '',
      alertColor: 'bg-green',
  }),
  async beforeMount() {
    this.reset();
    this.storeDtls = this.store;

    await this.storeDetailSources({
        store_id: this.storeId
      });
      
    await this.getProvinces().then(() => {  
      this.provinceItems = this.provinces;
    });

    if(typeof this.$route.params.id  !== "undefined"){
      this.storeId=this.$route.params.id;
      await this.storeDetail({
          store_id: this.$route.params.id 
        }).then(async () => {
          this.storeDtls = this.store
          //console.log(this.storeDtls)
          var province_id = this.provinceItems.find(opt => opt.province_name === this.storeDtls.province).province_id
          await this.getCities({
            province_id: province_id
          }).then(() => {
            this.cityItems = this.cities;
            this.cityOptions = this.cityItems;
          })
        })
    }else{
      this.editable=true;
    }

  },
  computed: {
    ...mapGetters('StoreManagement', {
      store:'GET_STORE',
      storeLoading: 'GET_STORE_LOADING',
      store_sources:'GET_STORE_SOURCES',
      provinces: 'GET_PROVINCES',
      cities: 'GET_CITIES',
      provincesLoading:'GET_PROVINCES_LOADING',
      citiesLoading:'GET_CITIES_LOADING',
    }),
    storeDetails() {
      //console.log(this.storeDtls);
      return {...this.storeDtls};
    },
    brandsOption() {
        var store_sources = this.store_sources
        var all = [{id: 0, name: 'Select Brand', disable: true}]
        var merge = all.concat(store_sources.brands)
        return merge    
    },
    pc_typesOption() {
        var store_sources = this.store_sources
        var all = [{id: 0, type: 'Select PC Type', disable: true}]
        var merge = all.concat(store_sources.pc_type)
        return merge    
    },
    store_regionsOption() {
        var store_sources = this.store_sources
        var all = [{id: 0, type: 'Select Store Region', disable: true}]
        var merge = all.concat(store_sources.store_region)
        return merge    
    },
    store_region_typesOption() {
        var store_sources = this.store_sources
        var all = [{id: 0, type: 'Select Store Region Type', disable: true}]
        var merge = all.concat(store_sources.store_region_type)
        return merge    
    },
    store_typesOption() {
        var store_sources = this.store_sources
        var all = [{id: 0, type: 'Select Store Type', disable: true}]
        var merge = all.concat(store_sources.store_type)
        return merge    
    },
  },
  methods: {
     ...mapActions('StoreManagement', [
      'storeDetail',
      'storeDetailSources',
      'getProvinces',
      'getCities',
      'createStoreDetail',
      'updateStoreDetail',
      'reset'
    ]),
    ...mapMutations('StoreManagement', [
      'SET_STORE_DETAIL'
    ]),
    async onInput({ key, value }) {

      this.SET_STORE_DETAIL({ key, value })
      this.storeDtls = this.store
      if(key === 'province'){
        //update cities Options based on selected province
        var province_id = this.provinceItems.find(opt => opt.province_name === value).province_id
        await this.getCities({
          province_id: province_id
        }).then(() => {
          this.cityItems = this.cities;
          this.cityOptions = this.cityItems;
          
          this.SET_STORE_DETAIL({key:'city',value: ''} )
          this.storeDtls = this.store
        })
      }
    }, 
    async toggleEdit(){
      this.editable = !this.editable;
      if(!this.editable){
        await this.storeDetail({
        store_id: this.$route.params.id
        }).then(() => {
          this.storeDtls = this.store
          //console.log(this.storeDtls)
        })

        await this.storeDetailSources({
          store_id: this.$route.params.id
        });
      }

    },
    keyToLabel(key) {
      let field = this.fields[key];
      if(field !== undefined){        
        if(field.type === 'select'){
          switch(key){
            case 'brand_id':
              field.option = this.brandsOption; 
              field.optionlabel = 'name';
              field.optionValue = 'id';
              break;
            case 'profit_center_type':
              field.option = this.pc_typesOption; 
              field.optionlabel = 'type';
              field.optionValue = 'id';
              break;
            case 'region':
              field.option = this.store_regionsOption; 
              field.optionlabel = 'type'; 
              field.optionValue = 'id';
              break;
            case 'region_type':
              field.option = this.store_region_typesOption; 
              field.optionlabel = 'type'; 
              field.optionValue = 'id';
              break;
            case 'store_type':
              field.option = this.store_typesOption; 
              field.optionlabel = 'type'; 
              field.optionValue = 'id';
              break;
            case 'province':
              field.option = this.provinceOptions; 
              field.loading = this.provincesLoading;
              field.optionlabel = 'province_name'; 
              field.optionValue = 'province_name';
              break;
            case 'city':
              field.option = this.cityOptions; 
              field.loading = this.citiesLoading;
              field.optionlabel = 'municipality_name'; 
              field.optionValue = 'municipality_name';
              break;
          }
        }
      }

      return field;
    },
    limiter(key){
      if(key == 'hub_dec_pin') return 4
      else if(key == 'code') return 10
      else return ''
    },
    isLatLong(key){
      if(key == 'x') return '120.984222'
      else if(key == 'y') return '14.599512'
      else return ''
    },
    filterSelect ({input, update, abort}, key ) {
      if (input === '') {
        update(() => {
          if(key === 'province'){
            this.provinceOptions = this.provinceItems
          }else if(key === 'city'){
            this.cityOptions = this.cityItems
          }
        })
        return
      }

      update(() => {
        const needle = input.toLowerCase()
        
        if(key === 'province'){
            this.provinceOptions = this.provinceItems.filter(v => v.province_name.toString().toLowerCase().startsWith(needle))
        }else if(key === 'city'){
            this.cityOptions = this.cityItems.filter(v => v.municipality_name.toString().toLowerCase().startsWith(needle))
        }
      })
    },
    async saveStoreDetails(){
      //console.log(JSON.stringify(this.storeDtls));
      if(this.storeId>0){
        this.updateStoreDetail({
          store_id: this.$route.params.id 
        }).then(async response => {
          if (response) {
            this.alert = true
            this.alertColor = "bg-green"
            this.alertMessage = 'Successfully Updated!'
          } else {
              this.alert = true
              this.alertColor = "bg-orange"
              this.alertMessage = 'Failed to save, please try again.'
          }
        })
      }else{
        this.createStoreDetail().then(async response => {
          if (response) {
            this.alert = true
            this.alertColor = "bg-green"
            this.alertMessage = 'Successfully Created!'
          } else {
              this.alert = true
              this.alertColor = "bg-orange"
              this.alertMessage = 'Failed to save, please try again.'
          }
        })
      }
    },
    strToPass(str){      
      return str.toString().replace(/./g, '\u2022');
    },
    doRedirect(){
      if(this.alertColor == "bg-green"){
        this.$router.push({path: '/store-manage'})
      }
    }
  },
}
</script>
<style lang="sass">
.q-checkbox.disabled.readonly,
.q-field--disabled 
  opacity: 1 !important
  cursor: default !important

  *
    cursor: default !important
</style>