<template>
  <router-view />
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  async beforeMount () {
    await this.getProfile()
    if (this.profile.store_id) {
      await this.orderMonitoring();
    }
    if (this.profile.store_id) {
        this.hasQue = true
        await this.getCurrentHubDec();
        await this.getHubDecList();
        this.hasQue = false
    }
    setInterval(async () => {
      if (!this.hasQue && this.profile.store_id) {
        this.hasQue = true
        await this.orderMonitoring();
        if (this.order.hasOwnProperty("id") && this.order.delivery_booking != null) {
          await this.orderDetails({
            id: this.order.id,
            loading: false
          })
        }
        if (this.profile.role_id != 3) {
            await this.getNotifications()
        }
        this.hasQue = false
      }
    }, 3000)
  },
  data: () => ({
    hasQue: false,
    newOrderSound: require('assets/sounds/sound.mp3'),
    advanceOrderSound: require('assets/sounds/advanced.mp3'),
    editedOrderSound: require('assets/sounds/edited.mp3'),
    audio: new Audio(require('assets/sounds/sound.mp3'))
  }),
  
  computed: {
    ...mapGetters('Order', {
      orders: 'GET_ORDERS',
      order: 'GET_ORDER'
    }),
    ...mapGetters('Auth', {
      profile: 'GET_PROFILE'
    }),
  },
  methods: {
    ...mapActions('Auth', [
      'getProfile'
    ]),
    ...mapActions('Order', [
      'orderMonitoring', 
      'orderDetails', 
    ]),
    ...mapActions('Notification', [
      'getNotifications'
    ]),
    ...mapActions('HubDec', [
      'getCurrentHubDec',
      'getHubDecList'
    ]),
  },
  watch: {
    orders(value){
      try {
        var order         = value;
        var order_view    = 0;
        var order_advance = 0;
        var order_prior   = 0; 
        var order_modify  = 0;
        
        this.orders.forEach(order => {
          //advance order
          if (order.is_advance == 1 && order.view_status == 0) {
          order_prior++
          }

          if (order_prior > 0) {
            order_advance = 1
            order_view = 1
          }

          //new order
          if (order.view_status == 0 && order.is_advance == 0 ) {
            order_view    = 1
            order_advance = 0
          }

          //order modify
          if (order.edit_count > 0 && order.view_status == 0) {
            order_modify = 1
            order_view = 0
          }
                    
        });

        if(this.profile.role_id != 3){
          if (order_view == 1 && order_advance == 1) {
            if (this.audio.paused) {
              this.audio = new Audio(this.advanceOrderSound)
              this.audio.play()
            }
          } else if (order_view == 1 && order_advance == 0) {
            if (this.audio.paused) {
              this.audio = new Audio(this.newOrderSound)
              this.audio.play()
            }
          } else if (order_modify > 0 && order_view == 0) {
            if (this.audio.paused) {
              this.audio = new Audio(this.editedOrderSound)
              this.audio.play()
            }
          } else {
            this.audio.pause()
          }
        }

      } catch (error) {}
      
    }
  }
})
</script>
