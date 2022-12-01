<template>
  <div class="q-pa-md" container>
    <div>
      <div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
        <div class="col-6">
          <div style="font-size: 20px"><b>User Store Link</b></div>
        </div>
        <div class="col-6">
          <div style="font-size: 15px; text-align: right"><b>Date: </b>{{this.todate}}</div>
        </div>
      </div>

            <div class="row items-start q-pa-md">
                <div class="col-md-6 col-sm-6 col-xs-12 q-pa-xs">
                  <q-select 
                    ref="qsUsers"
                    bg-color="white" 
                    outlined 
                    :options="userOptions"
                    v-model="userAssign"
                    option-value="id"
                    option-label="name"
                    hint="Select Users" 
                    label="Select Users" 
                    use-input
                    multiple counter use-chips
                    input-debounce="0"
                    @filter="filterUsers"
                    @update:model-value="clearFilterUsers"
                    :loading="usersListLoading"
                    dense >
                  </q-select>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12 q-pa-xs">
                   <q-select 
                    bg-color="white" 
                    outlined 
                    :options="storesList"
                    v-model="store"
                    :loading="storesListLoading"
                    option-value="store_id"
                    option-label="store_name"
                    hint="Select Store" 
                    label="Select Store" 
                    dense >
                  </q-select>
                </div>
            </div>
                
            <div class="row q-pa-md">
            <q-space />
                 <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs gutter ">
                    <q-btn                        
                        style="width: 100%;"
                        color="primary"
                        icon-right="assignment_turned_in"
                        label="Assign"
                        no-caps
                        @click="assign"
                    ></q-btn>
                </div>
            </div>

        <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
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

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';
import { ref } from 'vue'

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0");

export default {
  name: 'UserStoreLink',
  async beforeMount() {
    await this.storeList();
    await this.userList().then(() => {
        var allUsers = this.usersList
        this.users = allUsers.filter(function(el){
                      return !el.role_id || el.role_id<3
                      });

      });
  },
  data: () => ({
    todate:date,
    userAssign: ref(null),
    users: [], 
    userOptions: [],
    store: '',
    alert: false,
    alertMessage: '',
    alertColor: 'bg-green',
  }),
  computed: {
    ...mapGetters('Auth', {
      user: 'GET_PROFILE'
    }),
    ...mapGetters('UserStoreLink', {
      usersList:'GET_USER_LIST',
      usersListLoading:'GET_USER_LIST_LOADING',
      storesList:'GET_STORE_LIST',
      storesListLoading: 'GET_STORE_LIST_LOADING'
    })
  },
  methods: {
    ...mapActions('UserStoreLink', [
        'assignUserToStore',
        'storeList',
        'userList'
    ]),
    filterUsers (val, update) {
      if (val === '') {
        update(() => {
          this.userOptions = this.users
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.userOptions = this.users.filter(v => v.name.toString().toLowerCase().indexOf(needle) > -1)
      })
    },
    clearFilterUsers () {
      this.$refs.qsUsers.updateInputValue('')
      this.$refs.qsUsers.$el.querySelector("input").focus()
      //this.$refs.qsUsers.$el.children[0].children[0].children[0].children[0].children[1].focus()
    },
    assign(){
      this.assignUserToStore({
        user: this.userAssign,
        store: this.store
      }).then(async response => {
          if (response) {
            this.alert = true
            this.alertColor = "bg-green"
            this.alertMessage = 'User Successfully Assigned!'
          } else {
              this.alert = true
              this.alertColor = "bg-orange"
              this.alertMessage = 'Failed to save, please try again.'
          }
        })
    },
  }
}
</script>
