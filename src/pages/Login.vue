<template>
  <div class="background q-pa-lg">
    <q-card class="login">
      <div class="background-half mobile-hide"></div>
      <div class="row" style="min-height: 600px;">
        <div class="col-md-5 mobile-hide" style="background: rgba(88, 175, 0, 0.4);">
          <center style="margin-bottom: 70px;margin-top: 150px">
            <!-- <q-img
              src="~assets/mangdonalds.png"
              loading="lazy"
              spinner-color="white"
              height="90px"
              style="max-width: 90px"
            /> -->
            <q-img
              src="~assets/cloudshop-small.png"
              loading="lazy"
              spinner-color="white"
              style="width: 60%"
            />
            <h3><b>OFS</b></h3>
            <p style="margin-top: 150px;">Login to access your  TESTing<b>Order <br>Fullfilment Service</b></p>
          </center>
        </div>
        <div class="col-md-7 col-xs-12" style="padding: 50px;">
           <center class="desktop-hide" style="margin-bottom: 5px;margin-top: 5px">
            <q-img
              src="~assets/mangdonalds.png"
              loading="lazy"
              spinner-color="white"
              height="70px"
              style="max-width: 70px"
            />
            <div style="margin-top: 20px;"><b style="font-size: 30px;">OFS</b></div>
            <p style="margin-top: 10px;">Login to access your <b>Order <br>Fullfilment Service</b></p>
          </center>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <center class="mobile-hide" style="margin-top: 80px; margin-bottom: 30px;">
              <h6><b>Log In</b></h6>
            </center>
            <span>Email</span>
            <q-input
              filled
              v-model="username"
              placeholder="john@doe.com"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your email',
              ]"
            />
            <span>Password</span>
            <q-input
              filled
              type="password"
              v-model="password"
              placeholder="Enter your password here"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your password',
              ]"
            />
             <div style="text-align: right;">Forgot Password?</div>
            <div>
            <center>
              <q-btn style="width: 100%;" label="Login" type="submit" color="green"/>
            </center>
            </div>
          </q-form>
        </div>
      </div>
    </q-card>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         Invalid Email or Password
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'OrderDetails',
  data: () => ({
    username: '',
    password: '',
    alert: false
  }),
  computed: {},
  methods: {
    ...mapActions('Auth', [
      'login'
    ]),
    async onSubmit() {
      await this.login({
        username: this.username,
        password: this.password
      })
        .then (flag => {
          if (!flag) {
            this.alert = true
          }
        })
      
    }
  }
})


</script>

<style scoped>

.login {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  max-height: 600px;
}

.background {
  position: absolute;
  background: #ececec;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: -5;
}

.background-half {
  position:absolute;
  top: -50px;
  left: -2867px;
  width: 400%;
  height: 110vh;
  background: rgba(88, 175, 0, 0.4);
  z-index: -1;
}

</style>