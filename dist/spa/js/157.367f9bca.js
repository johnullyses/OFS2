"use strict";(globalThis["webpackChunkofs_2_0"]=globalThis["webpackChunkofs_2_0"]||[]).push([[157],{9157:(e,t,a)=>{a.r(t),a.d(t,{default:()=>O});var o=a(9835),s=a(6970),i=a(1957);const l={class:"q-pa-md",container:""},r={class:"q-pa-md row",style:{"margin-left":"15px","margin-right":"15px","padding-left":"0px","border-bottom":"2px solid #DEDEDE"}},n=(0,o._)("div",{class:"col-6"},[(0,o._)("div",{style:{"font-size":"20px"}},[(0,o._)("b",null,"Store Management")])],-1),d={class:"col-6"},c={style:{"font-size":"15px","text-align":"right"}},p=(0,o._)("b",null,"Date: ",-1),u={class:"q-gutter-md row items-start q-pa-md"},m={style:{"min-height":"100vh"}},g={class:"q-pa-md"},_=["onClick"],h=(0,o._)("div",{class:"text-h6"},"ERROR ",-1);function w(e,t,a,w,b,f){const v=(0,o.up)("q-btn"),S=(0,o.up)("q-td"),C=(0,o.up)("q-chip"),y=(0,o.up)("q-table"),T=(0,o.up)("q-card-section"),q=(0,o.up)("q-card-actions"),L=(0,o.up)("q-card"),x=(0,o.up)("q-dialog"),I=(0,o.Q2)("close-popup");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",l,[(0,o._)("div",null,[(0,o._)("div",r,[n,(0,o._)("div",d,[(0,o._)("div",c,[p,(0,o.Uk)((0,s.zw)(this.todate),1)])])])]),(0,o._)("div",u,[(0,o.Wm)(v,{color:"primary","icon-right":"add",label:"Add Store","no-caps":"",onClick:f.addStore},null,8,["onClick"])]),(0,o._)("div",m,[(0,o._)("div",g,[(0,o.Wm)(y,{class:"store-list",pagination:e.pagination,loading:e.storesListLoading,"visible-columns":e.visibleColumns,color:"primary",columns:e.columns,rows:e.rows,"row-key":"name",ref:"tb"},{"body-cell-store_code":(0,o.w5)((e=>[(0,o.Wm)(S,{props:e},{default:(0,o.w5)((()=>[(0,o._)("a",{onClick:(0,i.iM)((t=>f.routeToStore(e.row.store_id)),["prevent"]),href:"#"},(0,s.zw)(e.row.store_code),9,_)])),_:2},1032,["props"])])),"body-cell-is_active":(0,o.w5)((e=>[(0,o.Wm)(S,{props:e},{default:(0,o.w5)((()=>[(0,o.Wm)(C,{color:e.row.is_active?"green":e.row.is_active?"grey":"red","text-color":"white",dense:"",class:"text-weight-bolder",square:""},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(e.row.is_active?"YES":"NO"),1)])),_:2},1032,["color"])])),_:2},1032,["props"])])),_:1},8,["pagination","loading","visible-columns","columns","rows"])])])]),(0,o.Wm)(x,{modelValue:e.alert,"onUpdate:modelValue":t[0]||(t[0]=t=>e.alert=t),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:(0,o.w5)((()=>[(0,o.Wm)(L,{class:(0,s.C_)(e.alertColor+" text-white"),style:{width:"300px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(T,null,{default:(0,o.w5)((()=>[h])),_:1}),(0,o.Wm)(T,{class:"q-pt-none"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(e.alertMessage),1)])),_:1}),(0,o.Wm)(q,{align:"right",class:"bg-white text-teal"},{default:(0,o.w5)((()=>[(0,o.wy)((0,o.Wm)(v,{flat:"",label:"OK"},null,512),[[I]])])),_:1})])),_:1},8,["class"])])),_:1},8,["modelValue"])],64)}a(9665);var b=a(3100),f=new Date,v=f.getFullYear()+"-"+(f.getMonth()+1).toString().padStart(2,"0")+"-"+f.getDate().toString().padStart(2,"0");const S={name:"StoreManagement",data:()=>({alert:!1,alertMessage:"",alertColor:"bg-green",todate:v,visibleColumns:["store_code","store_name","is_active","city"],columns:[{name:"store_id",label:"Store ID",field:"store_id",align:"center"},{name:"store_code",label:"Store Code",field:"store_code",align:"center"},{name:"store_name",label:"Store Name",field:"store_name",align:"left"},{name:"is_active",label:"Is Active",field:"is_active",align:"center"},{name:"hostname",label:"Hostname",field:"hostname",align:"left"},{name:"city",label:"City",field:"city",align:"left"},{name:"actions",label:"Actions",field:"",align:"center"}],rows:[],pagination:{page:1,rowsPerPage:30}}),computed:{...(0,b.Se)("Auth",{user:"GET_PROFILE"}),...(0,b.Se)("StoreManagement",{storesList:"GET_STORE_LIST",storesListLoading:"GET_STORE_LIST_LOADING",batsubscriptionInfo:"GET_BAT_SUBSCRIPTION_INFO"})},methods:{...(0,b.nv)("StoreManagement",["storeList","getsubscriptionInfo"]),async addStore(){await this.getsubscriptionInfo().then((()=>{this.storesList.length>=this.batsubscriptionInfo?(this.alert=!0,this.alertColor="bg-red",this.alertMessage="Store Limit Reached"):this.$router.push({path:"/store/create"})}))},routeToStore(e){this.$router.push({path:"/store/"+e})}},async beforeMount(){await this.storeList().then((()=>{this.rows=this.storesList}))}};var C=a(1639),y=a(4455),T=a(7580),q=a(7220),L=a(7691),x=a(2074),I=a(4458),k=a(3190),E=a(1821),W=a(2146),D=a(9984),M=a.n(D);const Z=(0,C.Z)(S,[["render",w]]),O=Z;M()(S,"components",{QBtn:y.Z,QTable:T.Z,QTd:q.Z,QChip:L.Z,QDialog:x.Z,QCard:I.Z,QCardSection:k.Z,QCardActions:E.Z}),M()(S,"directives",{ClosePopup:W.Z})}}]);