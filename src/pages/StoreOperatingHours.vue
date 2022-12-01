<template>
  <div class="q-pa-lg"  style="padding-right: 0px; padding-left: 0px; height:100vh; overflow: auto;">
    <div class="q-pa-md row" style="border-bottom: 2px solid #DEDEDE;">
      <div class="col-8">
        <div><b>Store Name:</b> {{profile.store_name}} </div>
      </div>
      <div class="col-4">
        <div class="float-right"><b>Date:</b> {{todate}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="q-pa-md">
          <b style="font-size: 16px; color: #5C5C5C;">Store Hours</b>
        </div>
        <div style="padding: 0px 5px 0px 0px; margin-top: 8px;" >
          <q-card class="no-shadow q-pa-sm" style="height: 73.5vh; overflow: auto;">
            <div v-for="(date, index) in tempSchedule" :key="index" class="row q-pa-md" style="border-bottom: 2px solid #DEDEDE;">
              <div class="col-10">
                <div style="font-size: 16px;">{{date.day_of_week}}</div>
                <div><b>{{date.start_time}} - {{date.end_time}}</b></div>
              </div>
              <div class="col-2">
                <q-btn style="width: 70px; font-size: 13px; text-transform: lowercase; height: 20px;  border-radius: 20px;" @click="dialog = true, setEditIndex(index)" dense color="green" text-color="white" label="Edit" />
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="q-pa-md">
          <b style="font-size: 16px; color: #5C5C5C;">Holidays or Special Hours</b>
          <q-btn style="margin-left: 20px; width: 35px;border-radius: 50%; " @click="dialog2 = true"  dense color="green" text-color="white" label="+" />
        </div>
        <div style="padding:  0px 0px 0px 5px;">
          <q-card class="no-shadow" style="height: 73.5vh; overflow: auto;">
             <q-card class="no-shadow q-pa-sm" style="height: 73.5vh;">
            <div v-for="(date, index) in holidays" :key="index" class="row q-pa-md" style="border-bottom: 2px solid #DEDEDE;">
              <div class="col-10">
                <div style="font-size: 16px;">{{date.date}}</div>
                <div><b>{{date.start_time}} - {{date.end_time}}</b></div>
              </div>
              <div class="col-2">
                <q-btn flat @click="dialog2 = true, editHoliday(date)" dense color="green" text-color="black" icon="edit" />
                <q-btn flat @click="confirm = true, holidayId = date.id" dense color="green" text-color="black" icon="delete" />
              </div>
            </div>
          </q-card>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card style="max-width: 500px;" >
        <q-card-section>
          <div class="text-h6">{{tempSchedule[index].day_of_week}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row col-5 q-pa-sm">
            <div class="col-12 q-pa-sm">
              <b style="font-size: 15px">Start Time</b>
            </div>
            <div class="col-6 q-pa-sm">
              Hour
              <q-select dense filled v-model="time.start.hour" :options="getHours()" />
            </div>
            <div class="col-6 q-pa-sm">
              Minute
              <q-select dense filled v-model="time.start.minute" :options="getMinutes()" />
            </div>
          </div>
          <div class="row col-5 q-pa-sm">
            <div class="col-12 q-pa-sm">
              <b style="font-size: 15px">End Time</b>
            </div>
            <div class="col-6 q-pa-sm">
              Hour
              <q-select dense filled v-model="time.end.hour" :options="getHours()" />
            </div>
            <div class="col-6 q-pa-sm">
              Minute
              <q-select dense filled v-model="time.end.minute" :options="getMinutes()" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="dialog = false" />
          <q-btn flat label="OK" color="primary" @click="setTime()" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-dialog v-model="dialog2">
      <q-card style="max-width: 500px;" >
        <q-card-section>
          <div class="text-h6">Holidays or Special Hours</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row col-5 q-pa-sm">
            <div class="col-12 q-pa-sm">
              <b style="font-size: 15px">Start Time</b>
            </div>
            <div class="col-6 q-pa-sm">
              Hour
              <q-select dense filled v-model="holiday.start.hour" :options="getHours()" />
            </div>
            <div class="col-6 q-pa-sm">
              Minute
              <q-select dense filled v-model="holiday.start.minute" :options="getMinutes()" />
            </div>
          </div>
          <div class="row col-5 q-pa-sm">
            <div class="col-12 q-pa-sm">
              <b style="font-size: 15px">End Time</b>
            </div>
            <div class="col-6 q-pa-sm">
              Hour
              <q-select dense filled v-model="holiday.end.hour" :options="getHours()" />
            </div>
            <div class="col-6 q-pa-sm">
              Minute
              <q-select dense filled v-model="holiday.end.minute" :options="getMinutes()" />
            </div>
          </div>
          <div class="row col-5 q-pa-sm">
            <div class="col-12 q-pa-sm">
              <b style="font-size: 15px">Date</b>
            </div>
            <div class="col-12 q-pa-sm">
              <q-input bg-color="white" :min="todate" outlined type="date" v-model="holiday.date" dense ></q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="dialog2 = false, resetHolidayFrom()" />
          <q-btn flat label="OK" color="primary" @click="saveHoliday()" :loading="loading" />
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
   <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Remove this Setting?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat :loading="loading" label="Ok" @click="removeHoliday()" color="primary"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';

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
  name: 'StoreOperatingHours',
  computed: {
    ...mapGetters('HubDec', {
      schedule: 'GET_SCHEDULE',
      loading: 'GET_HUB_DEC_LOADING',
      holidays: 'GET_HOLIDAYS'
    }),
    ...mapGetters('Auth', {
      profile: 'GET_PROFILE'
    }),
  },
  async mounted () {
    if (this.profile.store_id) {
    await this.getStoreOperatingHours()
      if (this.schedule.length > 0) {
        this.tempSchedule = JSON.parse(JSON.stringify(this.schedule))
      }
    }
  },
  data: () => ({
    todate:date,
    dialog: false,
    dialog2: false,
    index: -1,
    tempSchedule: [
      {
        day_of_week: "Sunday",
        day: 1,
        start_time: "01:23:00",
        end_time: "02:23:00",
      },
      {
        day_of_week: "Monday",
        day: 2,
        start_time: "01:23:00",
        end_time: "02:23:00",
      },
      {
        day_of_week: "Tuesday",
        day: 3,
        start_time: "01:23:00",
        end_time: "02:23:00",
      },
      {
        day_of_week: "Wednesday",
        day: 4,
        start_time: "01:23:00",
        end_time: "02:23:00",
      },
      {
        day_of_week: "Thursday",
        day: 5,
        start_time: "01:23:00",
        end_time: "02:23:00",
      },
      {
        day_of_week: "Friday",
        day: 6,
        start_time: "01:23:00",
        end_time: "02:23:00",
      },
      {
        day_of_week: "Saturday",
        day: 7,
        start_time: "01:23:00",
        end_time: "02:23:00",
      }
    ],
    time: {
      start: {
        hour: '00',
        minute: '00'
      },
      end: {
        hour: '00',
        minute: '00'
      }
    },
    holiday: {
      start: {
        hour: '00',
        minute: '00'
      },
      end: {
        hour: '00',
        minute: '00'
      },
      date: ''
    },
    alert: false,
    alertMessage: '',
    alertColor: 'bg-green',
    holidayEdit: false,
    holidayId: -1,
    confirm: false
  }),
  methods: {
    ...mapActions('HubDec', [
      'setStoreOperatingHours',
      'getStoreOperatingHours',
      'createHoliday',
      'updateHoliday',
      'deleteHoliday'
    ]),
    setEditIndex(index) {
      this.index = index
      this.time = {
        start: {
         hour: '00',
          minute: '00'
        },
        end: {
          hour: '00',
          minute: '00'
        }
      }
    },
    getHours() {
      var hours = []
      const zeroPad = (num, places) => String(num).padStart(places, '0')

      for (let i = 0; i < 24; i++) {
        hours.push(zeroPad(i, 2))
      }

      return hours
    },
     getMinutes() {
      var hours = []
      const zeroPad = (num, places) => String(num).padStart(places, '0')
      
      for (let i = 0; i < 60; i++) {
        hours.push(zeroPad(i, 2))
      }

      return hours
    },
    async setTime() {
      this.tempSchedule[this.index].start_time = this.time.start.hour + ":" + this.time.start.minute + ":00"
      this.tempSchedule[this.index].end_time   = this.time.end.hour + ":" + this.time.end.minute + ":00"
      
      await this.save()
      
      this.dialog = false
    },
    async save () {
      console.log(this.tempSchedule)

      await this.setStoreOperatingHours({
        schedule: this.tempSchedule
      })
        .then(async response => {
          if (response) {
            await this.getStoreOperatingHours()
            this.tempSchedule = JSON.parse(JSON.stringify(this.schedule))

            this.alert = true
            this.alertColor = "bg-green"
            this.alertMessage = 'Successfully Updated!'
          } else {
              this.alert = true
              this.alertColor = "bg-orange"
              this.alertMessage = 'Failed to save, please try again.'
          }
        })
      this.time = {
        start: {
         hour: '00',
          minute: '00'
        },
        end: {
          hour: '00',
          minute: '00'
        }
      }
    },
    resetHolidayFrom () {
      this.holidayEdit = false
      this.holidayId = -1
      this.holiday = {
        start: {
          hour: '00',
          minute: '00'
        },
        end: {
          hour: '00',
          minute: '00'
        },
        date: ''
      }
    },
    async saveHoliday () {

      var startHour = parseInt(this.holiday.start.hour);
      var endHour = parseInt(this.holiday.end.hour);

      if (startHour > endHour) {
        this.alert = true
        this.alertColor = "bg-orange"
        this.alertMessage = 'Invalid date.'
      } else if (this.holiday.date == "") {
         this.alert = true
         this.alertColor = "bg-orange"
         this.alertMessage = 'Please select date.'
      } else {
        if (!this.holidayEdit) {
        
          await this.createHoliday({
            start_time: this.holiday.date + " " + this.holiday.start.hour + ":" + this.holiday.start.minute + ":00",
            end_time: this.holiday.date + " " + this.holiday.end.hour + ":" + this.holiday.end.minute + ":00"
          })
            .then(async response => {
              if (response) {
                await this.getStoreOperatingHours()
                this.holiday = {
                  start: {
                    hour: '00',
                    minute: '00'
                  },
                  end: {
                    hour: '00',
                    minute: '00'
                  },
                  date: ''
                }
                this.dialog2 = false
                this.alert = true
                this.alertColor = "bg-green"
                this.alertMessage = 'Successfully Created!'
              } else {
                this.alert = true
                this.alertColor = "bg-orange"
                this.alertMessage = 'Failed to save, please try again.'
              }
            })
        } else {
          await this.updateHoliday({
            start_time: this.holiday.date + " " + this.holiday.start.hour + ":" + this.holiday.start.minute + ":00",
            end_time: this.holiday.date + " " + this.holiday.end.hour + ":" + this.holiday.end.minute + ":00",
            id: this.holidayId
          })
            .then(async response => {
              if (response) {
                await this.getStoreOperatingHours()
                this.holiday = {
                  start: {
                    hour: '00',
                    minute: '00'
                  },
                  end: {
                    hour: '00',
                    minute: '00'
                  },
                  date: ''
                }
                this.dialog2 = false
                this.alert = true
                this.alertColor = "bg-green"
                this.alertMessage = 'Successfully Updated!'
              } else {
                this.alert = true
                this.alertColor = "bg-orange"
                this.alertMessage = 'Failed to save, please try again.'
              }
            })
        }
      }
    },
    editHoliday (date) {
      var start_time = date.start_time.split(":")
      var end_time = date.end_time.split(":")

       this.holiday = {
          start: {
            hour: start_time[0],
            minute: start_time[1]
          },
          end: {
            hour: end_time[0],
            minute: end_time[1]
          },
          date: date.date_y_m_d
       }
      this.holidayId = date.id
      this.holidayEdit = true
    },
    async removeHoliday() {
      await this.deleteHoliday({id:this.holidayId})
        .then(async response => {
         if (response) {
            this.holidayId = -1
            await this.getStoreOperatingHours()
            this.confirm = false
          }
        })

    }
  }
})
</script>
