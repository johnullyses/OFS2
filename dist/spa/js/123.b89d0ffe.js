"use strict";(self["webpackChunkofs_2_0"]=self["webpackChunkofs_2_0"]||[]).push([[123],{7123:(t,e,s)=>{s.r(e),s.d(e,{default:()=>L});var l=s(3673),o=s(2323);const i={style:{overflow:"auto",height:"86vh"}},a={class:"q-pa-md row",style:{"margin-left":"15px","margin-right":"15px","padding-left":"0px","border-bottom":"2px solid #DEDEDE"}},r=(0,l._)("div",{class:"col-6"},[(0,l._)("div",{style:{"font-size":"20px"}},[(0,l._)("b",null,"Product Availability")])],-1),d={class:"col-6"},n={style:{"font-size":"15px","text-align":"right"}},c=(0,l._)("b",null,"Date: ",-1),u=(0,l._)("div",{style:{"margin-left":"15px","margin-top":"15px","font-size":"15px"}},[(0,l._)("b",null,"Filters:")],-1),p={class:"items-start q-pa-md row"},h={class:"col-sm-3 col-xs-6 q-pa-sm"},m={class:"col-sm-3 col-xs-6 q-pa-sm"},g={class:"q-pa-md",style:{"padding-top":"20px"}},_={key:0},w={key:1},v=(0,l._)("div",{class:"text-h6"},"Success",-1),f=(0,l.Uk)(" Updated Succesfully ");function b(t,e,s,b,y,x){const S=(0,l.up)("q-icon"),k=(0,l.up)("q-avatar"),P=(0,l.up)("q-input"),q=(0,l.up)("q-select"),I=(0,l.up)("q-btn"),W=(0,l.up)("q-td"),Z=(0,l.up)("q-table"),D=(0,l.up)("q-card-section"),F=(0,l.up)("q-card-actions"),Q=(0,l.up)("q-card"),T=(0,l.up)("q-dialog"),C=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.iD)("div",i,[(0,l._)("div",null,[(0,l._)("div",a,[r,(0,l._)("div",d,[(0,l._)("div",n,[c,(0,l.Uk)((0,o.zw)(this.todate),1)])])])]),u,(0,l._)("div",p,[(0,l._)("div",h,[(0,l.Wm)(P,{style:{"min-width":"120px","min-height":"20px","max-width":"200px"},color:"blue",rounded:"",outlined:"",modelValue:t.filter,"onUpdate:modelValue":e[0]||(e[0]=e=>t.filter=e),placeholder:"Search"},{append:(0,l.w5)((()=>[(0,l.Wm)(k,null,{default:(0,l.w5)((()=>[(0,l.Wm)(S,{name:"search"})])),_:1})])),_:1},8,["modelValue"])]),(0,l._)("div",m,[(0,l.Wm)(q,{rounded:"",outlined:"",modelValue:t.prodFilter,"onUpdate:modelValue":[e[1]||(e[1]=e=>t.prodFilter=e),e[2]||(e[2]=t=>this.toggleFilter())],options:[{label:"All",value:"2"},{label:"Active",value:"1"},{label:"Inactive",value:"0"}],label:"Status Filter",class:"col-12 col-md-3",style:{"max-width":"200px"}},null,8,["modelValue"])])]),(0,l._)("div",g,[(0,l.Wm)(Z,{title:"",rows:t.rows,columns:t.columns,"row-key":"name",pagination:t.pagination,filter:t.filter,loading:t.loading},{"body-cell-active":(0,l.w5)((e=>[(0,l.Wm)(W,{props:e},{default:(0,l.w5)((()=>[(0,l._)("div",null,[1==e.value?((0,l.wg)(),(0,l.iD)("div",_,[(0,l.Wm)(I,{style:{"background-color":"#58af00"},icon:"check",onClick:s=>t.clickToggle(e)},null,8,["onClick"])])):((0,l.wg)(),(0,l.iD)("div",w,[(0,l.Wm)(I,{style:{"background-color":"red"},icon:"close",onClick:s=>t.clickToggle(e)},null,8,["onClick"])]))])])),_:2},1032,["props"])])),_:1},8,["rows","columns","pagination","filter","loading"]),(0,l.Wm)(T,{modelValue:t.persistent,"onUpdate:modelValue":e[3]||(e[3]=e=>t.persistent=e),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:(0,l.w5)((()=>[(0,l.Wm)(Q,{class:"bg-green text-white",style:{width:"300px"}},{default:(0,l.w5)((()=>[(0,l.Wm)(D,null,{default:(0,l.w5)((()=>[v])),_:1}),(0,l.Wm)(D,{class:"q-pt-none"},{default:(0,l.w5)((()=>[f])),_:1}),(0,l.Wm)(F,{align:"right",class:"bg-white text-black"},{default:(0,l.w5)((()=>[(0,l.wy)((0,l.Wm)(I,{flat:"",label:"OK"},null,512),[[C]])])),_:1})])),_:1})])),_:1},8,["modelValue"])])])}s(246);var y=s(3617),x=s(1959),S=new Date,k=S.getFullYear()+"-"+(S.getMonth()+1)+"-"+S.getDate();const P=(0,l.aZ)({name:"StoreItemsList",data:()=>({selected:(0,x.iH)([]),filter:(0,x.iH)(""),rows:[],status:0,todate:k,prodFilter:(0,x.iH)(""),persistent:(0,x.iH)([!1]),pagination:{page:1,rowsPerPage:25},columns:[{name:"name",required:!0,label:"Product Name",align:"left",field:t=>t.name,format:t=>`${t}`,sortable:!0},{name:"Description",label:"Description",field:t=>t.description,sortable:!0},{name:"active",required:!0,label:"ACTION",align:"left",field:t=>t.is_active,format:t=>`${t}`,sortable:!0}]}),computed:{...(0,y.Se)("Auth",{user:"GET_PROFILE"}),...(0,y.Se)("ProductAvailability",{storeProducts:"GET_STORE_ITEMS",loading:"GET_LOADING"})},methods:{...(0,y.nv)("ProductAvailability",["getStoreItems","updateProductStatus","getStoreItemsWithStatus"]),async clickToggle(t){1==t.row.is_active?this.status=0:this.status=1,console.log(t.row.is_active),this.updateProductStatus({store_id:this.user.store_id,productID:t.row.id,status:this.status}).then((async()=>{this.persistent=!0,await this.getStoreItems({store_id:this.user.store_id}).then((()=>{this.rows=this.storeProducts,console.log(this.storeProducts)}))}))},async toggleFilter(){console.log(this.prodFilter),1==this.prodFilter.value||0==this.prodFilter.value?await this.getStoreItemsWithStatus({store_id:this.user.store_id,status:this.prodFilter.value}).then((()=>{this.rows=this.storeProducts})):await this.getStoreItems({store_id:this.user.store_id}).then((()=>{this.rows=this.storeProducts,console.log(this.storeProducts)}))}},watch:{user:{async handler(t){await this.getStoreItems({store_id:this.user.store_id}).then((()=>{this.rows=this.storeProducts,console.log(this.storeProducts)}))},deep:!0}},async beforeMount(){await this.getStoreItems({store_id:this.user.store_id}).then((()=>{this.rows=this.storeProducts,console.log(this.storeProducts)}))}});var q=s(4260),I=s(4842),W=s(5096),Z=s(4554),D=s(2448),F=s(8107),Q=s(3884),T=s(8240),C=s(8886),A=s(6778),E=s(151),V=s(5589),U=s(9367),O=s(677),z=s(7518),G=s.n(z);const H=(0,q.Z)(P,[["render",b]]),L=H;G()(P,"components",{QInput:I.Z,QAvatar:W.Z,QIcon:Z.Z,QSelect:D.Z,QTable:F.Z,QTd:Q.Z,QBtn:T.Z,QToggle:C.Z,QDialog:A.Z,QCard:E.Z,QCardSection:V.Z,QCardActions:U.Z}),G()(P,"directives",{ClosePopup:O.Z})}}]);