"use strict";(self["webpackChunkofs_2_0"]=self["webpackChunkofs_2_0"]||[]).push([[434],{7434:(e,t,a)=>{a.r(t),a.d(t,{default:()=>O});var s=a(3673),o=a(2323),i=a(8880);const l={class:"q-pa-md",container:""},r={class:"q-pa-md row",style:{"margin-left":"15px","margin-right":"15px","padding-left":"0px","border-bottom":"2px solid #DEDEDE"}},n=(0,s._)("div",{class:"col-6"},[(0,s._)("div",{style:{"font-size":"20px"}},[(0,s._)("b",null,"Store Management")])],-1),d={class:"col-6"},c={style:{"font-size":"15px","text-align":"right"}},p=(0,s._)("b",null,"Date: ",-1),u={class:"q-gutter-md row items-start q-pa-md"},m={style:{"min-height":"100vh"}},_={class:"q-pa-md"},g=["onClick"],h=(0,s._)("div",{class:"text-h6"},"ERROR ",-1);function w(e,t,a,w,b,f){const v=(0,s.up)("q-btn"),S=(0,s.up)("q-td"),C=(0,s.up)("q-chip"),y=(0,s.up)("q-table"),q=(0,s.up)("q-card-section"),L=(0,s.up)("q-card-actions"),T=(0,s.up)("q-card"),x=(0,s.up)("q-dialog"),I=(0,s.Q2)("close-popup");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",l,[(0,s._)("div",null,[(0,s._)("div",r,[n,(0,s._)("div",d,[(0,s._)("div",c,[p,(0,s.Uk)((0,o.zw)(this.todate),1)])])])]),(0,s._)("div",u,[(0,s.Wm)(v,{color:"primary","icon-right":"add",label:"Add Store","no-caps":"",onClick:f.addStore},null,8,["onClick"])]),(0,s._)("div",m,[(0,s._)("div",_,[(0,s.Wm)(y,{class:"store-list",pagination:e.pagination,loading:e.storesListLoading,"visible-columns":e.visibleColumns,color:"primary",columns:e.columns,rows:e.rows,"row-key":"name",ref:"tb"},{"body-cell-store_code":(0,s.w5)((e=>[(0,s.Wm)(S,{props:e},{default:(0,s.w5)((()=>[(0,s._)("a",{onClick:(0,i.iM)((t=>f.routeToStore(e.row.store_id)),["prevent"]),href:"#"},(0,o.zw)(e.row.store_code),9,g)])),_:2},1032,["props"])])),"body-cell-is_active":(0,s.w5)((e=>[(0,s.Wm)(S,{props:e},{default:(0,s.w5)((()=>[(0,s.Wm)(C,{color:e.row.is_active?"green":e.row.is_active?"grey":"red","text-color":"white",dense:"",class:"text-weight-bolder",square:""},{default:(0,s.w5)((()=>[(0,s.Uk)((0,o.zw)(e.row.is_active?"YES":"NO"),1)])),_:2},1032,["color"])])),_:2},1032,["props"])])),_:1},8,["pagination","loading","visible-columns","columns","rows"])])])]),(0,s.Wm)(x,{modelValue:e.alert,"onUpdate:modelValue":t[0]||(t[0]=t=>e.alert=t),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:(0,s.w5)((()=>[(0,s.Wm)(T,{class:(0,o.C_)(e.alertColor+" text-white"),style:{width:"300px"}},{default:(0,s.w5)((()=>[(0,s.Wm)(q,null,{default:(0,s.w5)((()=>[h])),_:1}),(0,s.Wm)(q,{class:"q-pt-none"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,o.zw)(e.alertMessage),1)])),_:1}),(0,s.Wm)(L,{align:"right",class:"bg-white text-teal"},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)(v,{flat:"",label:"OK"},null,512),[[I]])])),_:1})])),_:1},8,["class"])])),_:1},8,["modelValue"])],64)}var b=a(3617),f=new Date,v=f.getFullYear()+"-"+(f.getMonth()+1).toString().padStart(2,"0")+"-"+f.getDate().toString().padStart(2,"0");const S={name:"StoreManagement",data:()=>({alert:!1,alertMessage:"",alertColor:"bg-green",todate:v,visibleColumns:["store_code","store_name","is_active","city"],columns:[{name:"store_id",label:"Store ID",field:"store_id",align:"center"},{name:"store_code",label:"Store Code",field:"store_code",align:"center"},{name:"store_name",label:"Store Name",field:"store_name",align:"left"},{name:"is_active",label:"Is Active",field:"is_active",align:"center"},{name:"hostname",label:"Hostname",field:"hostname",align:"left"},{name:"city",label:"City",field:"city",align:"left"},{name:"actions",label:"Actions",field:"",align:"center"}],rows:[],pagination:{page:1,rowsPerPage:30}}),computed:{...(0,b.Se)("Auth",{user:"GET_PROFILE"}),...(0,b.Se)("StoreManagement",{storesList:"GET_STORE_LIST",storesListLoading:"GET_STORE_LIST_LOADING",batsubscriptionInfo:"GET_BAT_SUBSCRIPTION_INFO"})},methods:{...(0,b.nv)("StoreManagement",["storeList","getsubscriptionInfo"]),async addStore(){await this.getsubscriptionInfo().then((()=>{this.storesList.length>=this.batsubscriptionInfo?(this.alert=!0,this.alertColor="bg-red",this.alertMessage="Store Limit Reached"):this.$router.push({path:"/store/create"})}))},routeToStore(e){this.$router.push({path:"/store/"+e})}},async beforeMount(){await this.storeList().then((()=>{this.rows=this.storesList}))}};var C=a(4260),y=a(8240),q=a(8107),L=a(3884),T=a(7030),x=a(6778),I=a(151),k=a(5589),E=a(9367),W=a(677),D=a(7518),M=a.n(D);const Z=(0,C.Z)(S,[["render",w]]),O=Z;M()(S,"components",{QBtn:y.Z,QTable:q.Z,QTd:L.Z,QChip:T.Z,QDialog:x.Z,QCard:I.Z,QCardSection:k.Z,QCardActions:E.Z}),M()(S,"directives",{ClosePopup:W.Z})}}]);