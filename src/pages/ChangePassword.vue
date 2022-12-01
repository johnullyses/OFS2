<template>
    <q-page style="max-height: 90vh; overflow: auto;">
        <div>
            <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
                <div class="col-6">
                    <div style="font-size: 20px"><b>Change Password</b></div>
                </div>
                <div class="col-6">
                    <div style="font-size: 15px; text-align: right"><b>Date: </b> {{this.today}}</div>
                </div>
            </div>
        </div>
         <q-form @submit="processChangePassword" class="q-gutter-md">
            <div class="items-start q-pa-md row">
                <div class="col-sm-12 col-xs-6 q-pa-sm"> 
                    <q-input filled v-model="currentPassword" type="password"  lazy-rules label="Current Password" style="max-width: 300px"  :rules="passwordRules"  />
                </div>
                <div class="col-sm-12 col-xs-6 q-pa-sm"> 
                    <q-input filled v-model="newPassword" type="password"  lazy-rules label="New Password" style="max-width: 300px"  :rules="passwordRules"  />
                </div>
                <div class="col-sm-12 col-xs-6 q-pa-sm"> 
                    <q-input filled v-model="confirmPassword" type="password" lazy-rules label="Re-type new Password" style="max-width: 300px"  :rules="passwordRules" />
                </div>
                <div class="col-sm-12 col-xs-6 q-pa-sm"> 
                    <q-btn
                        color="primary"
                        label="Submit"
                        no-caps
                        type="submit"
                        style="min-width: 150px"
                    >
                    </q-btn>
                </div>
            </div>
        </q-form>
        <q-dialog v-model="showDialog" persistent transition-show="scale" transition-hide="scale">
                  <q-card class="bg-green text-white" style="width: 300px" v-if="dialogStatus != true">
                    <q-card-section>
                      <div class="text-h6">{{this.dialogTitle}}</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                       {{this.dialogMsg}}
                    </q-card-section>

                    <q-card-actions align="right" class="bg-white text-black">
                      <q-btn flat label="OK" v-close-popup />
                    </q-card-actions>
                  </q-card>
                  <q-card class="bg-red text-white" style="width: 300px" v-if="dialogStatus == true">
                    <q-card-section>
                      <div class="text-h6">{{this.dialogTitle}}</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                       {{this.dialogMsg}}
                    </q-card-section>

                    <q-card-actions align="right" class="bg-white text-black">
                      <q-btn flat label="OK" v-close-popup />
                    </q-card-actions>
                  </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue'
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
export default defineComponent({
    name: 'ChangePassword',
    async beforeMount() {
     
    },
    computed: {
        ...mapGetters('ChangePassword', {
            ChangeResult: 'GET_CHANGE_RESULT',
            loading: 'GET_LOADING',
        })
    },
    methods: {
        ...mapActions('ChangePassword', [
            'changePassword',
        ]),
        async processChangePassword(){
            
            console.log("pumasok")
            if(this.newPassword!=this.confirmPassword){
                console.log("password not matching")
            }else{
                await this.changePassword({
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                }).then(() => {
                    console.log(this.ChangeResult)
                    this.dialogMsg = this.ChangeResult.data.msg
                    this.showDialog = true;
                    this.dialogStatus = this.ChangeResult.data.error;
                });
           
            }
          
            // await this.getSearchResult({
            //     store_id: this.user.store_id,
            //     startDate: this.chosenStart,
            //     endDate: this.chosenEnd,
            //     source: this.source,
            //     product: this.product,
            // }).then(() => {
            //     this.rows = this.productMixReport
            //     this.startDate=""
            //     this.endDate=""
            // });
        },
    },
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            currentPasswordCheck:false,
            today:date,
            dialogMsg:"",
            dialogTitle:"",
            dialogStatus:true,
            showDialog: false,
            passwordRules: [
                val => (val !== null && val !== '') || 'Required Field',
            ],
        }
    }
    
})
</script>
<style scoped>

</style>
