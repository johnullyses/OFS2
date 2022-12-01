export default {
    namespaced: true,
    state: {
        sales: [],
        sources: [],
        loading: false
    },
    getters: {
        GET_SALES (state) {
            return state.sales
        },
        GET_SOURCES (state) {
            return state.sources
        },
        GET_LOADING (state) {
            return state.loading
        }
    },
    mutations: {
        SET_SALES (state, sales) {

            var total = {
                AC: 0.00,
                AdvanceTC: 0,
                BankTransferTC: 0,
                CashTC: 0,
                CreditCardTC: 0,
                DateDay: '',
                DeliverySalesTC: 0,
                Discount: 0.00,
                GcashTC: 0,
                NetSales: 0.00,
                PROMOTC: 0,
                PWDTC: 0,
                PWD_DISC: 0.00,
                PackagingSales: 0.00,
                PaymayaTC: 0,
                PickupSalesTC: 0,
                PromoDiscount: 0.00,
                SCDTC: 0,
                SCD_DISC: 0.00,
                Sales: 0.00,
                TC: 0,
                VouchersTC: 0,
                hour: ''
            }

            sales.forEach(sale => {
                sale.AC       = (!isNaN(sale.AC) && sale.AC != null  ? sale.AC : 0.00)
                sale.Discount = (!isNaN(sale.Discount) && sale.Discount != null  ? sale.Discount : 0.00)
                sale.NetSales = (!isNaN(sale.NetSales) && sale.NetSales != null ? sale.NetSales : 0.00)
                sale.PackagingSales = (!isNaN(sale.PackagingSales)  && sale.PackagingSales != null ? sale.PackagingSales : 0.00)
                sale.PromoDiscount = (!isNaN(sale.PromoDiscount) && sale.PromoDiscount != null ? sale.PromoDiscount : 0.00)
                sale.SCD_DISC = (!isNaN(sale.SCD_DISC) && sale.SCD_DISC != null  ? sale.SCD_DISC : 0.00)
                sale.Sales = (!isNaN(sale.Sales)  && sale.Sales != null ? sale.Sales : 0.00)
                sale.AdvanceTC = (!isNaN(sale.AdvanceTC) && sale.AdvanceTC != null ? sale.AdvanceTC : 0)
                sale.BankTransferTC = (!isNaN(sale.BankTransferTC) && sale.BankTransferTC != null  ? sale.BankTransferTC : 0)
                sale.CashTC = (!isNaN(sale.CashTC)  && sale.CashTC != null  ? sale.CashTC : 0)
                sale.CreditCardTC = (!isNaN(sale.CreditCardTC) && sale.CreditCardTC != null   ? sale.CreditCardTC : 0)
                sale.DeliverySalesTC = (!isNaN(sale.DeliverySalesTC) && sale.DeliverySalesTC != null  ? sale.DeliverySalesTC : 0)
                sale.GcashTC = (!isNaN(sale.GcashTC)  && sale.GcashTC != null ? sale.GcashTC : 0)
                sale.PROMOTC = (!isNaN(sale.PROMOTC) && sale.PROMOTC != null ? sale.PROMOTC : 0)
                sale.PWDTC = (!isNaN(sale.PWDTC) && sale.PWDTC != null ? sale.PWDTC : 0)
                sale.PaymayaTC = (!isNaN(sale.PaymayaTC) && sale.PaymayaTC != null ? sale.PaymayaTC : 0)
                sale.PickupSalesTC = (!isNaN(sale.PickupSalesTC) && sale.PickupSalesTC != null ? sale.PickupSalesTC : 0)
                sale.SCDTC = (!isNaN(sale.SCDTC) && sale.SCDTC != null ? sale.SCDTC : 0)
                sale.TC = (!isNaN(sale.TC) && sale.TC != null ? sale.TC : 0)
                sale.VouchersTC = (!isNaN(sale.VouchersTC) && sale.VouchersTC != null ? sale.VouchersTC : 0)

                total.AC += parseFloat(sale.AC)
                total.Discount += parseFloat(sale.Discount)
                total.NetSales += parseFloat(sale.NetSales)
                total.PackagingSales += parseFloat(sale.PackagingSales)
                total.PromoDiscount += parseFloat(sale.PromoDiscount)
                total.SCD_DISC += parseFloat(sale.SCD_DISC)
                total.Sales += parseFloat(sale.Sales)

                total.AdvanceTC += parseInt(sale.AdvanceTC)
                total.BankTransferTC += parseInt(sale.BankTransferTC)
                total.CashTC += parseInt(sale.CashTC)
                total.CreditCardTC += parseInt(sale.CreditCardTC)
                total.DeliverySalesTC += parseInt(sale.DeliverySalesTC)
                total.GcashTC += parseInt(sale.GcashTC)
                total.PROMOTC += parseInt(sale.PROMOTC)
                total.PWDTC += parseInt(sale.PWDTC)
                total.PaymayaTC += parseInt(sale.PaymayaTC)
                total.PickupSalesTC += parseInt(sale.PickupSalesTC)
                total.SCDTC += parseInt(sale.SCDTC)
                total.TC += parseInt(sale.TC)
                total.VouchersTC += parseInt(sale.VouchersTC)
            })

            total.AC = total.AC.toFixed(2)
            total.Discount = total.Discount.toFixed(2)
            total.NetSales = total.NetSales.toFixed(2)
            total.PackagingSales = total.PackagingSales.toFixed(2)
            total.PromoDiscount = total.PromoDiscount.toFixed(2)
            total.SCD_DISC = total.SCD_DISC.toFixed(2)
            total.Sales = total.Sales.toFixed(2)

            sales.push(total)
            state.sales = sales;
        },
        SET_SOURCES (state, sources) {
            sources.sources.splice(0, 0, {source_name: "All"});
            sources.payment.splice(0, 0, {payment_type: "All"});
            sources.method.splice(0, 0, {name: "All"});
            state.sources = sources;
        },
        SET_LOADING (state, loading) {
            state.loading = loading
        }
    },
    actions: {
        async getSales(context, payload) {
            context.commit("SET_LOADING",  true)
            await this.$axios.post('/api/sales/'+context.rootState.Auth.store_id, payload)
            .then(response => {
                console.log(response)
                context.commit("SET_SALES", response.data)
            }).catch(error => {
                console.log(error.response)
            })
            context.commit("SET_LOADING",  false)
        },
        async allSources(context) {
            await this.$axios.post('/api/store/'+context.rootState.Auth.store_id+'/sources')
            .then(response => {
                context.commit('SET_SOURCES', response.data)
            }).catch(error => {
                console.log(error)
            })
        },
        reset(context){
            context.commit("SET_SALES", [])
        }
    }
}