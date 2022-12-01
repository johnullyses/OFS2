<template>
  <div class="q-pa-lg" style="padding-right: 0px;">
    <div class="q-pa-md row order-header">
      <div class="col-md-10 col-sm-9 col-xs-12">
        <div><b>Store Name:</b> {{user.store_name}} </div>
      </div>
      <div class="col-md-2 col-sm-3 col-xs-12">
        <div ><b>Date:</b> {{this.todate}}</div>
      </div>
      <div class="col-md-3 col-sm-5 col-xs-12">
        <q-input @keyup="filterOrders" label="Search"  dense filled v-model="orderFilter"/>
      </div>
      <div class="col-9 row" style="padding-left: 10px;">
        <div class="col-3">
       
        </div>
        <div class="col-9">
        
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="orderFilter == ''" class="q-pa-sm col-md-3 col-sm-5 col-xs-12 order-cards" >
        <div v-for="(item, index) in orders" :key="index" v-ripple :class="'relative-position order-tab ' + (order.id == item.id ? 'selected ' : '') + order_color_coding(
            item.status_id, 
            item.running_lapsed,
            item.view_status,
            item.is_advance,
            item.advance_ready
          )" @click.capture="orderDetails({id: item.id, loading: true}), resetForm(), checkMobileDesktop()">
          <div class="row">
            <div class="col">
              <b>Status: {{item.status_text}}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-7">
              <div>Order No: {{item.order_pin}}</div>
              <div>Customer: {{item.customer.first_name}} {{item.customer.last_name}}</div>
            </div>
            <div class="col-5" style="font-size:11px; text-align: right;">
              <div class="row"><div class="col">Price: {{item.price}}</div></div>
              <div class="row"><div class="col">Change for: {{item.change_for}}</div></div>
              <div class="row"><div class="col">Order Date: {{item.order_date}}</div></div> 
            </div>
          </div>
          <div  class="row">
            <div class="col">
              <q-chip v-if="item.ao_text != ''" size="12px" dense text-color="white" color="primary">{{item.ao_text}}</q-chip>
              <q-chip v-if="item.payment_id === 3 || (item.payment_id === 5 && item.bank_transfer_payment_confirmed == 1)" size="12px" dense text-color="white" color="primary">PAID</q-chip>
              <q-chip v-if="item.payment_id === 5 && item.bank_transfer_payment_confirmed == 0" size="12px" dense text-color="white" color="orange">UNPAID</q-chip>
              <q-chip v-if="item.service_method_id == '2'" size="12px" dense text-color="white" color="primary">PICKUP</q-chip>
              <q-chip v-if="item.edit_count > 0" size="12px" dense text-color="white" color="primary">UPDATED ({{item.edit_count}})</q-chip>
            </div>
          </div>
        </div>
      </div>
      <div v-if="orderFilter != ''" class="q-pa-sm col-md-3 col-sm-5 col-xs-12" style="overflow: auto; max-height: 77vh; padding-left: 4px; border-right: 2px solid #DEDEDE;">
        <div v-if="ordersFiltered.length == 0">No Result</div>
        <div v-for="(item, index) in ordersFiltered" :key="index" v-ripple :class="'relative-position order-tab ' + (order.id == item.id ? 'selected ' : '') + order_color_coding(
            item.status_id, 
            item.running_lapsed,
            item.view_status,
            item.is_advance,
            item.advance_ready
          )" @click.capture="orderDetails({id: item.id, loading: true})">
          <div class="row">
            <div class="col">
              <b>Status: {{item.status_text}}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-7">
              <div>Order No: {{item.order_pin}}</div>
              <div>Customer: {{item.customer.first_name}} {{item.customer.last_name}}</div>
            </div>
            <div class="col-5" style="font-size:11px; text-align: right;">
              <div class="row"><div class="col">Price: {{item.price}}</div></div>
              <div class="row"><div class="col">Change for: {{item.change_for}}</div></div>
              <div class="row"><div class="col">Order Date: {{item.order_date}}</div></div> 
            </div>
          </div>
          <div  class="row">
            <div class="col">
              <q-chip v-if="item.ao_text != ''" size="12px" dense text-color="white" color="primary">{{item.ao_text}}</q-chip>
              <q-chip v-if="item.payment_id === 3 || (item.payment_id === 5 && item.bank_transfer_payment_confirmed == 1)" size="12px" dense text-color="white" color="primary">PAID</q-chip>
              <q-chip v-if="item.payment_id === 5 && item.bank_transfer_payment_confirmed == 0" size="12px" dense text-color="white" color="orange">UNPAID</q-chip>
              <q-chip v-if="item.service_method_id == '2'" size="12px" dense text-color="white" color="primary">PICKUP</q-chip>
              <q-chip v-if="item.edit_count > 0" size="12px" dense text-color="white" color="primary">UPDATED ({{item.edit_count}})</q-chip>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!order.hasOwnProperty('id') && !orderLoading" class="col-9" >
        <div style="display: block; margin-left: auto; margin-right: auto; margin-top: 250px; text-align: center;">
          No Order Selected
        </div>
      </div>
      <div v-if="orderLoading" class="col-9" >
        <q-spinner-tail
          style="display: block; margin-left: auto; margin-right: auto; margin-top: 250px;"
          color="primary"
          size="5em"
        />
      </div>
      <div v-if="order.hasOwnProperty('id')  && !orderLoading" :class="'col-md-9 col-sm-7 col-xs-12 order-details ' + hideShow">
        <div class="row q-pa-md order-details-header">
          <div class="row col">
            <b class="col-10" style="color: #5C5C5C;">Order Details</b>
            <q-btn @click.capture="hideShow = 'hide'" class="col-2" label="Back" color="primary" flat dense />
          </div>
        </div>
        <div class="row q-pa-md bg-white">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <b>Order Number:</b> <q-btn  dense flat>{{order.order_pin}}</q-btn>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12" >
            <b>Service Method:</b> <span v-if="order.service_method_id == 1">Delivery</span><span v-if="order.service_method_id == 2">For Pickup</span>
          </div>
           <div class="col-md-4 col-sm-6 col-xs-12" >
            <b>Status:</b> {{order.status_text}}
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;">Customer Details</b>
          </div>
        </div>
        <div class="row q-pa-md bg-white">
          <div class="col-md-6 col-sm-6 col-xs-12 q-pa-sm">
            <b>Name:</b> {{order.customer.first_name}} {{order.customer.last_name}}
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 q-pa-sm" >
            <b>Email:</b> {{order.customer.email_address}}
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 q-pa-sm">
            <b>Phone Number:</b> {{order.delivery_address.contact_number}}
          </div>
          <div class="col-md-6 col-xs-12 q-pa-sm">
            <b>Address:</b> {{order.delivery_address.address}}
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;">Order Summary</b>
          </div>
        </div>
        <div class="row q-pa-md bg-white">
          <div v-for="(orderItem, index) in order.order_items" :key="index" class="col-12 row">
            <div class="col-1 q-pa-sm">
              <b>{{orderItem.quantity}}X</b>
            </div>
            <div class="col-md-9 col-sm-9 col-xs-7 q-pa-sm">
              {{orderItem.product.name}}
            </div>
            <div class="col-md-2 col-sm-2 col-xs-4 q-pa-sm">
              ₱ {{orderItem.gross_price}}
            </div>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-6 q-pa-sm">
            <b>Payment:</b>
          </div>
          <div class="col-md-8 col-sm-8 col-xs-6 q-pa-sm" >
             {{order.payment_text}} - P {{order.tendered_amount}}
          </div>
          <div class="col-md-1 col-sm-1 col-xs-6 q-pa-sm">
            <b>Sub Total:</b>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-6 q-pa-sm">
            ₱ {{order.total_w_vat}}
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;">Price Breakdown</b>
          </div>
        </div>
        <div class="row q-pa-md bg-white">
          <div class="col-md-10 col-sm-10 col-xs-6 q-pa-sm">
            Total  with VAT
          </div>
          <div class="col-md-2 col-sm-2 col-xs-6 q-pa-sm">
            ₱ {{order.total_w_vat}}
          </div>
          <div class="col-md-10 col-sm-10 col-xs-6 q-pa-sm">
            Delivery Charge
          </div>
          <div class="col-md-2 col-sm-2 col-xs-6 q-pa-sm">
            ₱ {{order.delivery_charge}}
          </div>
          <div v-if="order.is_scd" class="col-md-10 col-sm-10 col-xs-6 q-pa-sm">
            Senior Discount
          </div>
            <div v-if="order.is_pwd" class="col-md-10 col-sm-10 col-xs-6 q-pa-sm">
            PWD Discount
          </div>
          <div v-if="order.total_discounts > 0" class="col-md-2 col-sm-2 col-xs-6 q-pa-sm">
            - ₱ {{order.total_discounts}}
          </div>
          <div class="col-md-1 col-sm-1 col-xs-6 q-pa-sm">
            <b>Payment:</b>
          </div>
          <div class="col-md-8 col-sm-8 col-xs-6 q-pa-sm" >
             {{order.payment_text}} - P {{order.tendered_amount}}
          </div>
          <div class="col-md-1 col-sm-1 col-xs-6  q-pa-sm" >
            <b>Grand Total:</b>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-6 q-pa-sm">
            ₱ {{order.total_gross}}
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;">Order Remarks</b>
          </div>
        </div>
        <div class="row q-pa-md bg-white" style="margin-bottom: 10px;">
          <div class="col-12 row q-pa-sm">
            <div class="col-12">
              {{order.order_remarks}}
            </div>
          </div>
        </div>
        <div class="row q-pa-md bg-white" style="margin-bottom: 10px;">
          <div class="col-12 row q-pa-sm">
            <div class="col-sm-2 col-xs-6">
              <q-btn @click.capture="invoice = true" flat dense style="background: #58AF00; color: white; border-radius: 30px; width: 120px; height: 30px;" label="Invoice" />
            </div>
            <div class="col-sm-2 col-xs-6">
              <q-btn @click.capture="processTime = true" flat dense style="background: #58AF00; color: white; border-radius: 30px; width: 120px; height: 30px;" label="Process Time" />
            </div>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col">
            <b style="color: #5C5C5C;"></b>
          </div>
        </div>
        <div v-if="order.status != 5 && order.status != 6" class="row q-pa-md bg-white shadow-2 order-status-float">
          <div class="col-md-10 col-sm-10 cols-xs-12 row q-pa-sm">
            <div class="col-12">
              <b>Update Status: </b>
              <span v-if="order.status === 1 && !order.delivery_booking">Received to Acknowledge</span>
              <span v-if="order.status === 2 && !order.delivery_booking">Acknowledge to Rider Assign</span>
              <span v-if="order.status === 8 && !order.delivery_booking">Rider Assign to Rider Out</span>
              <span v-if="order.status === 3 && !order.delivery_booking">Rider Out to Rider Back</span>
              <span v-if="order.status === 4 && !order.delivery_booking">Rider Back to Close Order</span>
            </div>
            <div v-if="order.status === 1" class="col-12">
              <span>Dispatcher name:</span><q-input style="margin-left: 10px; width: 30%; display: inline-block;" flat dense outlined v-model="dispatcher" />
            </div>
            <div v-if="order.status === 2 && order.delivery_booking == null" class="col-sm-6">
              <span>Select Carrier:</span><q-select style="margin-left: 10px; width: 70%; display: inline-block;" flat dense outlined v-model="carrier" :options="carriers" option-label="name" option-value="alias"  />
            </div>
             <div v-if="order.status === 2 && order.delivery_booking == null" class="col-sm-6">
              <span v-if="order.status === 2 && carrier.alias == 'inhouse'">
                <span>Rider name:</span>
                <q-input style="margin-left: 10px; width: 70%; display: inline-block;" flat dense outlined v-model="ridername" />
              </span>
            </div>
            <div v-if="order.status === 4" class="col-12 row">
              <div class="col-sm-5 col-xs-12 q-pa-xs">
                <q-input label="Date" outlined dense flat v-model="receivedTime.date" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="receivedTime.date" mask="MM/DD/YYYY" :options="date => date >= optionsDate(order.order_date)">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-2 col-xs-12 q-pa-xs">
                <q-select label="Hour" flat dense outlined v-model="receivedTime.hour" :options="hour"  />
              </div>
              <div class="col-sm-2 col-xs-12 q-pa-xs">
                <q-select label="Minute" flat dense outlined v-model="receivedTime.minute" :options="minute"  />
              </div>
              <div class="col-sm-2 col-xs-12 q-pa-xs">
                <q-select label="AM/PM" flat dense outlined v-model="receivedTime.ampm" :options="ampm"/>
              </div>
            </div>
            <div v-if="order.delivery_booking !== null">
                GrabExpress - {{order.delivery_booking.status}} 
                <div v-if="order.delivery_booking.pickup_pin">Delivery ID - <b>{{order.delivery_booking.delivery_id}}</b></div>
                <div v-if="order.delivery_booking.pickup_pin">Merchant Order ID - <b>{{order.delivery_booking.order_id}}</b></div>
                <div v-if="order.delivery_booking.pickup_pin">Pickup PIN - <b>{{order.delivery_booking.pickup_pin}}</b></div>
            </div>
          </div>
          <div class="col-md-2 col-sm-2 cols-xs-12 row q-pa-sm">
            <q-btn v-if="order.delivery_booking == null" :loading="orderStatusLoading || grabLoading"  @click.capture="updateOrderStatus()" flat dense style="background: #58AF00; color: white; border-radius: 30px; width: 80px; height: 30px;" label="next" />
            <q-btn v-if="order.delivery_booking != null" :disabled="(order.delivery_booking.status == 'QUEUEING'  ? false : true)" :loading="grabLoading"  @click.capture="cancelGrabBooking({order_id: order.id})" flat dense style="background: #58AF00; color: white; border-radius: 30px; width: 140px; height: 30px;" label="Cancel Booking" />
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
       <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Confirm Close Transaction?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click.capture="confirm = false, orderClose({received_datetime: received_time, id: order.id})" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="invoice">
      <q-card style="width: 800px;">
        <q-card-section>
          <div class="text-h6">Invoice</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-6 text-h6"><b >Order No.:</b></div><div class="col-6 text-h6"><b>{{order.order_pin}}</b></div>
            <div class="col-6">Order Type:</div><div class="col-6">{{order.source_text}}</div>
            <div class="col-6">Payment Type:</div><div class="col-6">{{order.payment_text}}</div>
            <div class="col-6">Order Date:</div><div class="col-6">{{order.order_date}}</div>
            <div class="col-6">Delivery Date:</div><div class="col-6">{{order.delivery_date}}</div>
            <div class="col-6">Print Count:</div><div class="col-6">{{order.print_counter}}</div>
            <div class="col-6">Type:</div><div class="col-6">{{(order.service_method_id == 1 ? 'Delivery' : 'Pickup')}}</div>
            <div class="col-6">Customer Name:</div><div class="col-6">{{order.customer.first_name + ' ' + order.customer.last_name}}</div>
          </div>
          <div class="row">
            <div class="col-12 text-h6"><b >Address</b></div>
            <div class="col-6">Delivery Address:</div><div class="col-6">{{order.delivery_address.address}}</div>
            <div class="col-6">City:</div><div class="col-6">{{order.city_name}}</div>
            <div class="col-6">Landmarks:</div><div class="col-6">{{order.delivery_address.landmark_1}}</div>
            <div class="col-6">Address Remarks:</div><div class="col-6">{{order.delivery_address.remarks}}</div>
            <div class="col-6">Proximity Distance:</div><div class="col-6">{{order.additional.distance_km + ' km (' + order.additional.travel_time_mins + ' mins approx. )'}}</div>
          </div>
          <div class="row">
            <div class="col-12 text-h6"><b >Item Details</b></div>
            <div class="col-3">Item</div><div class="col-3">Description</div><div class="col-3">Quantity</div><div class="col-3">Total</div>
            <div v-for="(orderItem, index) in order.order_items" :key="index" class="col-12 row">
              <div class="col-3">{{orderItem.product.name}}</div><div class="col-3">{{orderItem.product.description}}</div><div class="col-3">{{orderItem.quantity}}</div><div class="col-3">{{orderItem.gross_price}}</div> 
            </div> 
            <div class="col-6" style="margin-top: 10px;">Order Remarks:</div><div class="col-6" style="margin-top: 10px;">{{order.order_remarks}}</div>
          </div>
          <div class="row" style="margin-top: 10px;"></div>
          <div v-if="order.is_scd == 1" class="row">
            <div class="col-6">S.C. ID:</div><div class="col-6">{{order.scd_id}}</div>
          </div>
          <div v-if="order.is_pwd == 1" class="row">
            <div class="col-6">PWD ID:</div><div class="col-6">{{order.pwd_id}}</div>
          </div>
          <div class="row" style="margin-top: 10px;"></div>
          <div class="row">
            <div class="col-6">Delivery Charge:</div><div class="col-6">{{order.delivery_charge}}</div>
            <div class="col-6">Discount:</div><div class="col-6">{{order.total_discounts}}</div>
            <div v-if="order.is_scd == 1" class="col-6">SCD Vat:</div><div v-if="order.is_scd == 1" class="col-6">{{order.excess_vat}}</div>
            <div v-if="order.is_pwd == 1" class="col-6">PWD Vat:</div><div v-if="order.is_pwd == 1" class="col-6">{{order.excess_vat}}</div>
            <div class="col-6">Total:</div><div class="col-6">{{order.total_gross}}</div>
            <div class="col-6">Tendered Amount:</div><div class="col-6">{{order.tendered_amount}}</div>
            <div class="col-6">Vouchers Amount:</div><div class="col-6">{{order.voucher_amount}}</div>
            <div class="col-6">Change Amount:</div><div class="col-6">{{order.change_amount}}</div>
          </div>
           <div class="row" style="margin-top: 10px;"></div>
           <div class="row">
            <div class="col-6">Rider:</div><div class="col-6">{{order.rider_name}}</div>
            <div class="col-6">Dispatcher:</div><div class="col-6">{{order.dispatcher}}</div>
            <div class="col-6">Agent:</div><div class="col-6">{{order.agent_name}}</div>
            <div class="col-12" style="margin-top: 10px;"></div>
            <div class="col-12">Thank You!</div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="processTime">
      <q-card style="width: 400px;">
        <q-card-section>
          <div class="text-h6">Process Time</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-6"><b>Received</b></div><div class="col-6">{{order.received_datetime}}</div>
            <div class="col-6"><b>Acknowledged</b></div><div class="col-6">{{order.acknowledged_datetime}}</div>
            <div class="col-6"><b>Rider Assigned</b></div><div class="col-6">{{order.rider_assigned_datetime}}</div>
            <div class="col-6"><b>Rider Out</b></div><div class="col-6">{{order.rider_out_datetime}}</div>
            <div class="col-6"><b>Rider Back</b></div><div class="col-6">{{order.rider_back_datetime}}</div>
            <div class="col-6"><b>Customer Receive Time	</b></div><div class="col-6">{{order.customer_receive_datetime}}</div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="hubdec" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hub Declaration</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense type="number" v-model="hubdec_pin" label="Enter your pin" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :loading="hubdecLoading" @click.capture="verifyStore()" flat label="Submit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="hubdecForm" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hub Declaration for {{(hubdec_mins == 0 ? 'Hold' : hubdec_mins + 'min.')}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="hubdecAuthorizedBy" label="Authorized by" autofocus />
          <q-input dense v-model="hubdecReason" label="Reason" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :loading="hubdecLoading" @click.capture="submitHubDec()" flat label="Submit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="holdSchedule" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hold Schedule</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <div class="row">
            <div class="col-4"><b>From Time</b></div>
            <div class="col-4"><b>To Time</b></div>
            <div class="col-4"><b>Hold Date</b></div>
            <div v-for="(value, index) in storeHoldSchedule" :key="index" class="col-12 row">
              <div class="col-4">{{value.from_time}}</div>
              <div class="col-4">{{value.to_time}}</div>
              <div class="col-4">{{value.datetime_created}}</div>
            </div>
         </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn :loading="hubdecLoading" @click.capture="holdSchedule = false, hubdecForm = true, hubdec_mins = 0" flat label="HOLD FOR 60 MINS"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { defineComponent, ref } from 'vue'
import moment from 'moment'

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export default defineComponent({
  name: 'OrderMonitoring',
  computed: {
    ...mapGetters('Order', {
      orders: 'GET_ORDERS',
      ordersLoading: 'GET_ORDERS_LOADING',
      order: 'GET_ORDER',
      orderLoading: 'GET_ORDER_LOADING',
      carriers: 'GET_CARRIERS',
      threshold: 'GET_THRESHOLD',
      orderStatusLoading: 'GET_ORDER_STATUS_LOADING'
    }),
    ...mapGetters('Grabex', {
      grabLoading: 'GET_LOADING'
    }),
    ...mapGetters('Auth', {
      user: 'GET_PROFILE'
    }),
    ...mapGetters('HubDec', {
      hubdecLoading: 'GET_HUB_DEC_LOADING',
      isVerifiedPin: 'GET_STORE_VERFIED',
      currentHubDec: 'GET_CURRENT_HUB_DEC',
      storeHoldSchedule: 'GET_HOLD_SCHEDULE'
    })
  },
  data: () => ({
    todate:date,
    currentOrderId: -1,
    model: ref(null),
    options: [
      'In House', 'Loginext', 'Grab Express', 'Teleport', 'Panda Go'
    ],
    dispatcher: '',
    ridername: '',
    carrier: {
      name: '',
      alias: ''
    },
    date: [],
    hour: [],
    ampm: ['AM', 'PM'],
    minute: [],
    receivedTime: {
      date: '',
      hour: '',
      ampm: '',
      minute: ''
    },
    confirm: false,
    received_time: '',
    orderFilter: '',
    ordersFiltered: [],
    invoice: false,
    processTime: false,
    hubdec_pin: null,
    hubdec_mins: 60,
    hubdec: false,
    hubdecForm: false,
    hubdecAuthorizedBy: "",
    hubdecReason: "",
    holdSchedule: false,
    alert: false,
    alertMessage: '',
    alertColor: 'bg-green',
    hideShow: '',
    optionsFn (date) {
        return date >= '2022/01/25'
      },
  }),
  async beforeMount() {
    this.initializeDateSelector()
    await this.deliveryCarriers();
    this.carrier = this.carriers[0]
    await this.getCurrentHubDec()

    if (this.$q.platform.is.mobile && this.order.hasOwnProperty("id")) {
      console.log(this.order)
      this.checkMobileDesktop()
    }
   console.log(this.orders)
  },
  watch: {
    order: function (val) {
      if (this.$q.platform.is.mobile && val.hasOwnProperty("id")) {
        console.log(val)
        this.checkMobileDesktop()
      }
    },
  },
  methods: {
    ...mapActions('Order', [
      'orderMonitoring', 
      'orderDetails', 
      'deliveryCarriers',
      'acknowledge',
      'riderAssign',
      'orderThreshold',
      'riderOut',
      'riderBack',
      'updateOrderReceiveDatetime',
      'orderClose'
      ]),
    ...mapActions('Grabex', [
      'bookGrab',
      'cancelGrabBooking'
    ]),
    ...mapActions('HubDec', [
      'validateStorePin',
      'getCurrentHubDec',
      'setHubDec',
      'getHoldSchedule'
    ]),
    checkMobileDesktop () {
      if (this.$q.screen.width <= 600) {
        this.hideShow = "show"
      } 
    },
    resetForm () {
      this.receivedTime = { date: '',hour: '', minute: '' }
      this.carrier = { name: '', alias: '' }
      this.ridername = ''
      this.dispatcher = ''
    },
    async verifyStore() {

      if (!this.hubdec_pin) {
        this.alert = true
        this.alertColor = "bg-red"
        this.alertMessage = 'Please enter your pin number.'
      } else {
        await this.validateStorePin(this.hubdec_pin)
        if (this.isVerifiedPin) {
          
          if (this.currentHubDec.promised_time == "HOLD") {
            this.alert = true
            this.alertColor = "bg-orange"
            this.alertMessage = 'Unable to change hub declaration. Please remove current store hold'
            return
          }
          
          if (this.hubdec_mins != 0) {
            this.hubdec = false
            this.hubdecReason = ''
            this.hubdecAuthorizedBy = ''
            this.hubdecForm = true
          } else {
            this.hubdec = false
            this.holdSchedule = true
            this.getHoldSchedule()
          }
        } else {
          this.alert = true
          this.alertColor = "bg-red"
          this.alertMessage = 'Invalid Pin'
        }
      }
    },
    async submitHubDec() {
      if (this.hubdecReason != '' && this.hubdecAuthorizedBy != '') {
        await this.setHubDec({
          reason: this.hubdecReason,
          promised_time: (this.hubdec_mins == 0 ? 'HOLD' : this.hubdec_mins),
          authorized_by: this.hubdecAuthorizedBy
        })
        await this.getCurrentHubDec()
        this.hubdecReason = ''
        this.hubdecAuthorizedBy = ''
        this.hubdecForm = false
        this.alert = true
        this.alertColor = "bg-green"
        this.alertMessage = 'Hub Declaration Successful!'
      } else {
        this.alert = true
        this.alertColor = "bg-red"
        this.alertMessage = 'Please fill up the field.'
      }
    },
    combineOrderItemsName(orderItems) {
      var string = ''

      orderItems.forEach((item, index) => {
        string += 'X' + item.quantity + ' ' + item.name

        if (index+1 != orderItems.length) {
          string += ', '
        }

      })

      return string
    },
    async updateOrderStatus() {
      switch (this.order.status) {
         case 1:
            if(this.dispatcher == ""){
              alert("Please fill up the field.");
            } else {
              this.acknowledge({
                id: this.order.id,
                acknowledged_by: this.dispatcher
              })
              this.dispatcher = ""
            }
            break;
          case 2: 
            if (this.carrier.alias == "inhouse") {
              if (this.ridername == "") {
                alert("Please fill up the field.");
              } else {
                this.riderAssign({
                  id: this.order.id,
                  rider_name: this.riderName
                })
                this.carrier = {
                  name: '',
                  alias: ''
                }
                this.riderName = ''
              }
            }

            if (this.carrier.alias == "grabex") {
              await this.bookGrab({
                order_id: this.order.id
              })
              this.orderDetails({id: this.order.id, loading: false})
            }

            break;
          case 8:
            await this.checkThreshold(3);
            if(!this.threshold.allowed){
              alert("Threshold Time-out");
            }else{
              this.riderOut({
                id: this.order.id,
              })
            }
            break;
          case 3: 
            await this.checkThreshold(4);
            if(!this.threshold.allowed){
              alert("Threshold Time-out");
            }else{
              this.riderBack({
                id: this.order.id,
              })
            }
            break;
          case 4: 
            var rider_out_datetime = this.order.rider_out_datetime
            var rider_back_datetime = this.order.rider_back_datetime
            var hours = this.receivedTime.hour
            if (this.receivedTime.ampm == "PM" && this.receivedTime.hour < 12) {
              hours = hours + 12;
            } else {
              hours = this.receivedTime.hour
            }

            var formattedDate = this.receivedTime.date.split("/")[2]+"/"+this.receivedTime.date.split("/")[0]+"/"+this.receivedTime.date.split("/")[1]
            this.received_time = formattedDate.replaceAll("/", "-") + " " + hours + ":" + this.receivedTime.minute + ":00"
            
            if(rider_back_datetime != "") {
              var is_later = this.check_crt(this.received_time, rider_out_datetime)
               if(!is_later) {
                 alert("INVALID:\nReceive time must be later than Rider Back")
                 return false
               } else{ 
                 this.confirm = true
               }
            }
            break;
          default:
            break;
      }
    },
    async checkThreshold(nextStatus){
        await this.orderThreshold({
          next_status: nextStatus,
          acknowledge_datetime: this.order.acknowledged_datetime,
          rider_out_datetime: this.order.rider_out_datetime,
          proximity: this.order.additional.travel_time_mins
        })
          .catch(error => {
            console.log(error)
          })

      },
      initializeDateSelector () {
        
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        for (let i = 1; i < 32; i++) {
          this.date.push("2021-09-" + zeroPad(i, 2))
        }

         for (let i = 0; i < 12; i++) {
          this.hour.push(i)
        }

         for (let i = 0; i < 60; i++) {
          this.minute.push(zeroPad(i, 2))
        }
        
      },
      check_crt($receive_datetime,$out_date_time){
        // check/verify customer receive time input
        var tmp_crt1 = $receive_datetime
        var tmp_crt2 = tmp_crt1.split(" ")
        var tmp_crt_date = tmp_crt2[0].split("-")
        var tmp_crt_time = tmp_crt2[1].split(":")

        // out date time
        var tmp_out1 = $out_date_time
        var tmp_out2 = tmp_out1.split(" ")
        var tmp_date_out = tmp_out2[0].split("-")
        var tmp_time_out = tmp_out2[1].split(":")

        var out_datetime = new Date(tmp_date_out[0], tmp_date_out[1], tmp_date_out[2], tmp_time_out[0], tmp_time_out[1], 0, 0)
        var received_datetime = new Date(tmp_crt_date[0], tmp_crt_date[1], tmp_crt_date[2], tmp_crt_time[0], tmp_crt_time[1], 0, 0)

        var d = (received_datetime-out_datetime) // difference in milliseconds

        //alert(d);

        if(d>=0) {
            return true;
        }else{
            return false;
        }

      },
      order_color_coding (order_status, running_lapsed, view_status, is_advance, advance_ready) {
        // manage order color coding scheme
        // order status threshold settings
        var t_new = 1;
        var t_ack = 5;
        var t_out = 26;

        var style_class= "";

        // new orders / not advance #########################################################
        if (order_status == 1 && is_advance == 0) {

          if(parseInt(running_lapsed) > t_new && parseInt(view_status) == 1) {
            // new/viewed/lapsed
            style_class = "color_status_lapsed font_normal ";

            return style_class;

          } else if(parseInt(running_lapsed) <= t_new && parseInt(view_status) == 1) {
            // new/viewed/not lapsed
            style_class = "color_status_standard font_normal";

            return style_class;

          } else if(parseInt(running_lapsed) <= t_new && parseInt(view_status) == 0) {
            // not viewed/ not lapsed
            style_class = "color_status_standard font_bold font_italic";

            return style_class;

          } else if(parseInt(running_lapsed) > t_new && parseInt(view_status) == 0) {
            // not viewed/lapsed
            style_class = "color_status_lapsed font_bold font_italic";

            return style_class;

          } else{ }

        }


        // new orders / advance orders #########################################################
        if (order_status == 1 && is_advance == 1) {

          if (parseInt(view_status) == 0 && advance_ready == 'NO') {
            // not viewed/not ready
            style_class = "color_status_standard font_bold font_italic";
            return style_class;

          }

          if (parseInt(view_status) == 0 && advance_ready == 'YES') {
            // not viewed/ready

            if (parseInt(running_lapsed) > t_new) {
              // not viewed/lapsed/ready
              style_class = "color_status_lapsed font_bold font_italic";
              return style_class;
            }

            if (parseInt(running_lapsed) <= t_new) {
              // not viewed/not lapsed/ready
              style_class = "color_status_standard font_bold font_italic";
              return style_class;
            }
          }


          if (parseInt(view_status) == 1 && advance_ready == 'YES' ) {
            // viewed/ready

            if (parseInt(running_lapsed) > t_new) {
              // viewed/lapsed/ready
              style_class = "color_status_lapsed font_normal";
              return style_class;
            }

            if (parseInt(running_lapsed) <= t_new) {
              // viewed/not lapsed/ready
              style_class = "color_status_standard font_normal";
              return style_class;
            }

          }


          if (parseInt(view_status) == 1 && advance_ready == 'NO' ) {
            // viewed/not ready
            style_class = "color_status_standard font_normal";
            return style_class;
          }

        }



        // acknowledge rule #########################################################
        if (order_status == 2) {
          if (parseInt(view_status) == 1) { // already viewed

            if (parseInt(running_lapsed) > t_ack) {
              // new/viewed/lapsed
              style_class = "color_status_lapsed font_normal";

              return style_class;

            } else if(parseInt(running_lapsed)<=t_ack) {
              // new/viewed/not lapsed
              style_class = "color_status_standard font_normal";

              return style_class;

            } else { }

          } else {

            if (parseInt(running_lapsed) > t_ack) {
              // new/viewed/lapsed
              style_class = "color_status_lapsed font_bold";

              return style_class;

            } else if (parseInt(running_lapsed)<=t_ack) {
              // new/viewed/not lapsed
              style_class = "color_status_standard font_bold";

              return style_class;

            } else { }
          }
        }


        //rider out #########################################################
        if (order_status == 3) {

          if (parseInt(running_lapsed) > t_out) {
            // new/viewed/lapsed
            style_class = "color_status_lapsed font_normal";

            return style_class;


          } else if (parseInt(running_lapsed) <= t_out) {
            // new/viewed/not lapsed
            style_class = "color_status_standard font_normal";

            return style_class;

          } else { }

        }


        //rider back #########################################################
        if (order_status == 4) {
          // new/viewed/lapsed
          style_class = "color_status_rider_back font_normal";

          return style_class;

        }


        // pending #########################################################
        if (order_status == 7) {
          // new/viewed/lapsed
          style_class = "color_status_pending font_normal";

          return style_class;

        }

        // rider assigned
        if (order_status == 8) {

          if (parseInt(running_lapsed) > t_ack) {
            // new/viewed/lapsed
            style_class = "color_status_lapsed font_normal";

            return style_class;


          } else if (parseInt(running_lapsed) <= t_ack) {
            // new/viewed/not lapsed
            style_class = "color_status_standard font_normal";

            return style_class;

          }
        }
      },
      filterOrders() {
        let timeout = null;
        clearTimeout(timeout);
        // Make a new timeout set to go off in 800ms
        timeout = setTimeout(() => {
            if (this.orderFilter == "") {
              this.ordersFiltered = []
            } else{
              var query = this.orders
           
                query = query.filter(item => {

                var customer_fullname = item.customer.first_name + ' ' + item.customer.last_name

                return item.customer.first_name.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                item.customer.last_name.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                customer_fullname.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                item.status_text.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                item.order_pin.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                item.order_date.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                item.ao_text.toLowerCase().includes(this.orderFilter.toLowerCase()) || 
                item.service_method_text.toLowerCase().includes(this.orderFilter.toLowerCase()) ||
                // item.order_date_text.toLowerCase().includes(this.orderFilter.toLowerCase()) ||  
                item.price.includes(this.orderFilter) || 
                item.change_for.includes(this.orderFilter)
              })

              this.ordersFiltered = query
            }
        }, 1000);
      },
      optionsDate(order_date) {
        var date = order_date.split(' ')[0]
        console.log(date.replaceAll("/", "-"))
        return moment(new Date(date)).format("YYYY/MM/DD")
      }
  }
})

</script>

<style scoped>

.order-tab {
  border-radius: 10px;
  color: white;
  font-size: 12px;
  padding: 10px;
  margin-bottom: 6px;
  min-height: 125px;
}

.order-tab:hover {
  cursor: pointer;
  transition: background 0.5s ease;
}

.order-tab:active {
  cursor: pointer;
  transition: background 0.5s ease;
}

.order-tab.selected {
  cursor: pointer;
  transition: background 0.5s ease;
  outline: 4px; outline-style: solid; outline-color: #3989fb;
}

.color_status_standard {
  background: #58AF00;
}

.color_status_standard:hover {
  background: #4c9701;
}

.color_status_lapsed {
  background: #eb4f4f;
}

.color_status_lapsed:hover {
  background: #d34747
}

.color_status_pending {
  background: #FFCC00;
}

.color_status_pending:hover {
  background: #eabc02;
}

.color_status_rider_back {
  background: #8dce4d;
}

.color_status_rider_back:hover {
  background: #75a942;
}

.font_normal {
 font-weight: normal;
}

.font_bold {
  font-weight: bold;
}

.font_italic {
  font-weight: italic;
}


.order-status-float {
  position: sticky;
  bottom: 0px;
}

.order-details {
  overflow: auto; 
  max-height: 77vh;
}

.order-details-header {
  display: none;
}


.hide {
  display: none!important;
}

.show {
  display: block!important;
}

.order-cards {
  overflow: auto; 
  max-height: 77vh; 
  padding-left: 4px; 
  border-right: 2px solid #DEDEDE;
}

.order-header {
  padding-left: 0px; 
  border-bottom: 2px solid #DEDEDE;
}

@media screen and (max-width: 600px) {
  .order-details {
    position: absolute;
    background: rgb(229, 229, 229);
    /* width: 100%!important; */
    display: none;
    max-height: 82vh;
  }

  .order-cards {
    max-height: 82vh; 
  }

  .q-pa-lg {
    padding: 0px!important;
  }

  .order-header {
    padding: 10px;
  }

  .order-details-header {
    display: block;
  }

  .float-right {
    float: none;
  }
}
</style>