"use strict";(globalThis["webpackChunkofs_2_0"]=globalThis["webpackChunkofs_2_0"]||[]).push([[763],{6763:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var s=a(3673),o=a(2323);const i={key:0},n={key:1,style:{"text-align":"center"}},l=["innerHTML"],r=["innerHTML"],c={class:"flex flex-center"},g={class:"buttons row justify-center"},p={class:"row items-start q-pa-md"},h=["src"],u={class:"button-text"};function m(e,t,a,m,d,_){const w=(0,s.up)("q-spinner-tail"),y=(0,s.up)("q-icon"),b=(0,s.up)("q-input"),f=(0,s.up)("q-btn"),v=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(v,{style:{"max-height":"90vh",overflow:"auto"}},{default:(0,s.w5)((()=>[e.loading?((0,s.wg)(),(0,s.iD)("div",i,[(0,s.Wm)(w,{style:{display:"block","margin-left":"auto","margin-right":"auto"},color:"primary",size:"5em"})])):(0,s.kq)("",!0),0==e.loading?((0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("p",{class:"title",innerHTML:e.homepage_title},null,8,l),(0,s._)("p",{class:"desc",innerHTML:e.homepage_desc},null,8,r),(0,s._)("div",c,[(0,s.Wm)(b,{rounded:"",outlined:"",label:"Search Items","bg-color":"white",class:"search_button",dense:""},{append:(0,s.w5)((()=>[(0,s.Wm)(y,{name:"search"})])),_:1})]),(0,s._)("div",g,[(0,s._)("div",p,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.categories,(t=>((0,s.wg)(),(0,s.iD)("div",{key:t.id,class:"col-xs-12 col-sm-12 col-md-4"},[(0,s.Wm)(f,{class:"button faq",to:t.url+"/"+t.id},{default:(0,s.w5)((()=>[(0,s._)("img",{src:e.url+"/"+t.icon,style:{height:"125px"}},null,8,h),(0,s._)("span",u,(0,o.zw)(t.title),1)])),_:2},1032,["to"])])))),128))])])])):(0,s.kq)("",!0)])),_:1})}var d=a(741);const _=(0,s.aZ)({name:"PageIndex",async beforeMount(){await this.getHomepage(),await this.getCategory(),this.homepage_title=this.homepage[0]?this.homepage[0].homepage_title:"",this.homepage_desc=this.homepage[0]?this.homepage[0].homepage_descriptions:"",this.categories=this.category?this.category:"",this.url=this.backend_url},computed:{...(0,d.Se)("Homepage",{homepage:"GET_HOMEPAGE",category:"GET_CATEGORY",loading:"GET_LOADING",backend_url:"GET_URL"})},methods:{...(0,d.nv)("Homepage",["getHomepage","getCategory","getHomepageContents"])},data(){return{homepage_title:"",homepage_desc:"",categories:[],url:""}}});var w=a(4260),y=a(4379),b=a(682),f=a(4842),v=a(4554),k=a(8240),T=a(7518),H=a.n(T);const q=(0,w.Z)(_,[["render",m],["__scopeId","data-v-ca321a70"]]),x=q;H()(_,"components",{QPage:y.Z,QSpinnerTail:b.Z,QInput:f.Z,QIcon:v.Z,QBtn:k.Z})}}]);