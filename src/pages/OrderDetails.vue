<template>
  <div class="q-pa-lg" style="padding-right: 0px; padding-left: 0px;">
    <div class="q-pa-md row" style="border-bottom: 2px solid #DEDEDE;">
      <div class="col-6">
        <div><b>Order Number:</b> {{order.order_pin}} Received at {{order.received_datetime}}</div>
      </div>
      <div class="col-6">
        <div class="float-right"><b>Status:</b> {{order.status_text}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12" style="overflow: auto; max-height: 83vh;">
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;">Customer Details</b>
          </div>
        </div>
        <div class="row q-pa-md bg-white">
          <div class="col-6 q-pa-sm">
            <b>Name:</b> {{order.customer.first_name}} {{order.customer.last_name}}
          </div>
          <div class="col-6 q-pa-sm" >
            <b>Email:</b> {{order.customer.email_address}}
          </div>
          <div class="col-6 q-pa-sm">
            <b>Phone Number:</b> {{order.delivery_address.contact_number}}
          </div>
          <div class="col-6 q-pa-sm">
            <b>Address:</b> {{order.delivery_address.address}}
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="row q-pa-md" style="background:rgb(229, 229, 229);">
              <div class="col">
                <b style="color: #5C5C5C;">Order Summary</b>
              </div>
            </div>
            <div class="row q-pa-md bg-white" style="height: auto; border-right: 8px solid rgb(229, 229, 229);">
              <div v-for="(orderItem, index) in order.order_items" :key="index" class="col-12 row">
                <div class="col-1 q-pa-sm">
                  <b>{{orderItem.quantity}}X</b>
                </div>
                <div class="col-9 q-pa-sm">
                  {{orderItem.product.name}}
                </div>
                <div class="col-2 q-pa-sm">
                  P {{orderItem.gross_price}}
                </div>
              </div>
              <div class="col-12 row">
                <div class="col-1 q-pa-sm">
                  <b>Payment:</b>
                </div>
                <div class="col-8 q-pa-sm" style="padding-left: 20px;">
                  {{order.payment_text}} - P {{order.tendered_amount}}
                </div>
                <div class="col-1 q-pa-sm" style="text-align: right;">
                  <b>Total:</b>
                </div>
                <div class="col-2 q-pa-sm">
                  P {{order.total_w_vat}}
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row q-pa-md"  style="background:rgb(229, 229, 229);">
              <div class="col">
                <b style="color: #5C5C5C;">Price Breakdown</b>
              </div>
            </div>
            <div class="row q-pa-md bg-white">
              <div class="col-10 q-pa-sm">
                Total  with VAT
              </div>
              <div class="col-2 q-pa-sm">
                P {{order.total_w_vat}}
              </div>  
              <div class="col-10 q-pa-sm">
                Delivery Charge
              </div>
              <div class="col-2 q-pa-sm">
                P {{order.delivery_charge}}
              </div>
              <div class="col-10 q-pa-sm">
                Senior Discount
              </div>
              <div class="col-2 q-pa-sm">
                P 0.00
              </div>
              <div class="col-10 q-pa-sm">
                Promo
              </div>
              <div class="col-2 q-pa-sm">
                P 0.00
              </div>
              <div class="col-9 q-pa-sm">
                <b>Payment:</b> {{order.payment_text}} - P {{order.tendered_amount}}
              </div>
              <div class="col-3 q-pa-sm">
                <b>Total:</b> P {{order.total_gross}}
              </div>
            </div>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;">Requests</b>
          </div>
        </div>
        <div class="row q-pa-md bg-white">
          <div class="col-12 row q-pa-sm">
            <div class="col-12">
              <b>Food:</b>
            </div>
            <div v-for="(note, index) in order.order_notes" :key="index" class="col-12">
              {{note.message}}
            </div>
          </div>
          <div class="col-12 row q-pa-sm">
            <div class="col-12">
              <b>Delivery:</b>
            </div>
            <div class="col-12">
              {{order.order_remarks}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderDetails',
  computed: {
    ...mapGetters('Order', {
      order: 'GET_ORDER'
    }),
  },
})
</script>
