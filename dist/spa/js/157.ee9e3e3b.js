(self["webpackChunkofs_2_0"]=self["webpackChunkofs_2_0"]||[]).push([[157],{5576:(e,l,s)=>{"use strict";s.r(l),s.d(l,{default:()=>C});var a=s(3673),t=s(4222),o=s.n(t),r=s(3317),n=s.n(r);const d=e=>((0,a.dD)("data-v-a3711c56"),e=e(),(0,a.Cn)(),e),u={class:"background q-pa-lg"},A=d((()=>(0,a._)("div",{class:"background-half mobile-hide"},null,-1))),i={class:"row",style:{"min-height":"600px"}},p={class:"col-md-5 mobile-hide",style:{background:"rgba(88, 175, 0, 0.4)"}},m=d((()=>(0,a._)("h3",null,[(0,a._)("b",null,"OFS")],-1))),g=d((()=>(0,a._)("p",{style:{"margin-top":"150px"}},[(0,a.Uk)("Login to access your "),(0,a._)("b",null,[(0,a.Uk)("Order "),(0,a._)("br"),(0,a.Uk)("Fullfilment Service")])],-1))),y={class:"col-md-7 col-xs-12",style:{padding:"50px"}},c=d((()=>(0,a._)("div",{style:{"margin-top":"20px"}},[(0,a._)("b",{style:{"font-size":"30px"}},"OFS")],-1))),f=d((()=>(0,a._)("p",{style:{"margin-top":"10px"}},[(0,a.Uk)("Login to access your "),(0,a._)("b",null,[(0,a.Uk)("Order "),(0,a._)("br"),(0,a.Uk)("Fullfilment Service")])],-1))),w=d((()=>(0,a._)("h6",null,[(0,a._)("b",null,"Log In")],-1))),U=d((()=>(0,a._)("span",null,"Email",-1))),h=d((()=>(0,a._)("span",null,"Password",-1))),k=d((()=>(0,a._)("div",{style:{"text-align":"right"}},"Forgot Password?",-1))),S=d((()=>(0,a._)("div",{class:"text-h6"},"Alert",-1))),B=(0,a.Uk)(" Invalid Email or Password ");function V(e,l,s,t,r,d){const V=(0,a.up)("q-img"),b=(0,a.up)("center"),J=(0,a.up)("q-input"),x=(0,a.up)("q-btn"),Z=(0,a.up)("q-form"),K=(0,a.up)("q-card"),I=(0,a.up)("q-card-section"),Q=(0,a.up)("q-card-actions"),q=(0,a.up)("q-dialog"),P=(0,a.Q2)("close-popup");return(0,a.wg)(),(0,a.iD)("div",u,[(0,a.Wm)(K,{class:"login"},{default:(0,a.w5)((()=>[A,(0,a._)("div",i,[(0,a._)("div",p,[(0,a.Wm)(b,{style:{"margin-bottom":"70px","margin-top":"150px"}},{default:(0,a.w5)((()=>[(0,a.Wm)(V,{src:o(),loading:"lazy","spinner-color":"white",style:{width:"60%"}}),m,g])),_:1})]),(0,a._)("div",y,[(0,a.Wm)(b,{class:"desktop-hide",style:{"margin-bottom":"5px","margin-top":"5px"}},{default:(0,a.w5)((()=>[(0,a.Wm)(V,{src:n(),loading:"lazy","spinner-color":"white",height:"70px",style:{"max-width":"70px"}}),c,f])),_:1}),(0,a.Wm)(Z,{onSubmit:e.onSubmit,onReset:e.onReset,class:"q-gutter-md"},{default:(0,a.w5)((()=>[(0,a.Wm)(b,{class:"mobile-hide",style:{"margin-top":"80px","margin-bottom":"30px"}},{default:(0,a.w5)((()=>[w])),_:1}),U,(0,a.Wm)(J,{filled:"",modelValue:e.username,"onUpdate:modelValue":l[0]||(l[0]=l=>e.username=l),placeholder:"john@doe.com","lazy-rules":"",rules:[e=>null!==e&&""!==e||"Please type your email"]},null,8,["modelValue","rules"]),h,(0,a.Wm)(J,{filled:"",type:"password",modelValue:e.password,"onUpdate:modelValue":l[1]||(l[1]=l=>e.password=l),placeholder:"Enter your password here","lazy-rules":"",rules:[e=>null!==e&&""!==e||"Please type your password"]},null,8,["modelValue","rules"]),k,(0,a._)("div",null,[(0,a.Wm)(b,null,{default:(0,a.w5)((()=>[(0,a.Wm)(x,{style:{width:"100%"},label:"Login",type:"submit",color:"green"})])),_:1})])])),_:1},8,["onSubmit","onReset"])])])])),_:1}),(0,a.Wm)(q,{modelValue:e.alert,"onUpdate:modelValue":l[2]||(l[2]=l=>e.alert=l)},{default:(0,a.w5)((()=>[(0,a.Wm)(K,null,{default:(0,a.w5)((()=>[(0,a.Wm)(I,null,{default:(0,a.w5)((()=>[S])),_:1}),(0,a.Wm)(I,{class:"q-pt-none"},{default:(0,a.w5)((()=>[B])),_:1}),(0,a.Wm)(Q,{align:"right"},{default:(0,a.w5)((()=>[(0,a.wy)((0,a.Wm)(x,{flat:"",label:"OK",color:"primary"},null,512),[[P]])])),_:1})])),_:1})])),_:1},8,["modelValue"])])}var b=s(3617);const J=(0,a.aZ)({name:"OrderDetails",data:()=>({username:"",password:"",alert:!1}),computed:{},methods:{...(0,b.nv)("Auth",["login"]),async onSubmit(){await this.login({username:this.username,password:this.password}).then((e=>{e||(this.alert=!0)}))}}});var x=s(4260),Z=s(151),K=s(4027),I=s(5269),Q=s(4842),q=s(8240),P=s(6778),L=s(5589),M=s(9367),O=s(677),R=s(7518),W=s.n(R);const v=(0,x.Z)(J,[["render",V],["__scopeId","data-v-a3711c56"]]),C=v;W()(J,"components",{QCard:Z.Z,QImg:K.Z,QForm:I.Z,QInput:Q.Z,QBtn:q.Z,QDialog:P.Z,QCardSection:L.Z,QCardActions:M.Z}),W()(J,"directives",{ClosePopup:O.Z})},4222:e=>{e.exports="data:image/png;base64,UklGRvgRAABXRUJQVlA4TOwRAAAv+UAVEDWHgrZtmIQ/7f0RiIgJQLbNwSWZzphvqEujewSMGvPXcAOwdf3/KcrNC/7df19Od/VO9++Pvc/Jmbq/i9iZFdu2bdS23dhObTO2bTu1Gae27U5sq3aTNqht27Zt27Ztfts1q+50nZpB7c7Krm3buhALJv4Mc+lJjDDbOEZ1OYM+pgAAAOL/////////////mwC69f+rtiKaI3vu7nbuvri7u7tzLu7u7u7u7u7u3H332Wdj6Vu3A7JbAam7FuJkXgCt0AAFWEYBNEBERBGExFRAO85kHk8FOx33uQ3gJZC9aMesu6aGWf8hJ7VsGoAg23baJvvfTSyZ9Z8cfYWZmZnKDB4Itm2bkcWVbduudif/pWz892On4bTatmX54/9P8B9mYAEbwq1zWIAJmILoRKp7IztbeOeaAFs3fJkhlhnyMkNbZujKDB2ZoZl8jgoxmaEsM0xlhqfMQAiR/M3khyUfv1SRgpKCf6gUnPdDpRCkQMsg35MZdsJw8n+T71N6SKlKzUjdS72ESr1KXUql11XWSL5Gub7OEoVzK/mxUdisXLC8vDz5g6WFlKPUf1ypqTJG8uXLy4XQMSEbkD08yK83ShU5xfJEUSMQQgiZ4bhykHIoYktJlimWL08fyxXv1WguzfyJWJAGNB6OZQ8O9MT5lYGUbRFdKrJMkfxqJVt41PtYsyTjM+0zhrec9GX1jzBCxyS54kmZFfGl1MsSyccrV/Niq828p1Z74Qpfly04wpXJc5MVTsq0iC91bGXIRyY/WCtueblpL032rmZribeYDOCKM684k19MPMqBkHJa0AICFlbUg0uJSxGYlEURX6pLCrcskXy15PdqQvxHUMwSxZmIjbtgEsGKLDVeuKUmEDCLgCkETJNKcUnxS5FamTL5fsnfiyHKWk7y5CxASWhpwEiKCVWiECUJU4yGkGqeUqNSwJEyvmC1NvmpyX+MUsZyUiRnASShodWUycvXODg2J2nzCAz+ocI/VngHGlfXZC8crtIUEouigGJiGCvjJt8n+TtR1n7rD5myMyZHYXNxLYkKZ6XGr9qemvo8lox4yxj5ljboOa/zta7GaiJDfSMgVtg4rsBIFlU/qSc1JgVY1km+avK7Y+gsKGmJ+PomiERKkEafjOuztQTd7lWccPRHWunJqxvWwiMRE0VTKr3YyrzJx24pxvVCvAISIQXfvLZxPPHzV11uNVzh2M+U/N1vdsLlFyo+qSLVMV7Zx5KP48oZHdRuL/DWs56s/pFeUQYV7LesuZ3vgFyrURiJrOSPnG3AKTY99Lh4Fk9fFzWhVNillYmTX+rIrfaqN17M+oloMhzJER7oXS7FvJj6KQgSMqTRa/NxTrXPU4mHb/DxVRZ6f4kDyIAicAI5IP/HIAboAi4AFASwAGU2ABVIAAuQ/OMfg3RgA6QBdgRAUDkMwFYGiDlKPqpDCB0TAlvZfkpvjvyUDIEhs9zN1+UsyfhQ7nKvOfqvFhQ1qawIABTYgjHw7wbHIAPQ+oEC8EtwCDTjTQxawQedY4OeXQQAeNBOgj2gEwACwQPBC4h3AQVQBwY8QR+oBsFAHqAFWfLFtXebCiZrRYzgnRA6Q9zJZbZCSBRGDBBbXKUpFt9x6pVmc2YLNSm+MGAJThgIigCyB0hlGpBG+jaYZSBYBepeoItpgO8FlJgeUwMaDAafoOkyIZZ8JQX7WUnmVcx/yWm2zp7VApG9cZKWW/R4TPPg7hqeUJL6kAIKehXDwQ0QdYFTBZjHAQGMCBI8ADj4UYCzF2hQQK8G1sNIgsZzBVjyqZLf4yjKgjKWU8ISKZOTQEhCINoPxE/ssq7cbYKr2PVW8ztQlqq2UDDKqD07wJEyZpSHMGr1LoB4HQX4eYFmBXQrAIlxwT0gDzBLvnTyK5K/nfzf8vI1/ety9nuZx2zmEpAfySQw+4Hc5OTa+j0XqcGTl488PB2lo4eACnqCdx8Ceu1oCjCJAYLoBs/gAOyDOxdBseNK4FUB7l6gVrmRAkgi8TEALsTMko+efOrkE6/9gYYjYOhHMiMo9fR0yUpHXNUaywlr4TFSebkUSABQpROUAjVAARBaBMog3wUWswJ8dII8ILURswcBfpDoYM/5AtOgKw36wXxVB0FfBF0LPINiW8dVfrakTo97hatn+kBFqsf8d3AX7WCAw3TAfDCNz8sGAIJLbQXAbc6PgyXtIhvJByDWPm56labBlUYgEgsB+8rshaPZvkuduWmQZ6iLHP9zFha/QAFGRVLmAcCLKji/krmrPEbbVzYnonqYc5kv2FK4Uq7ad5gB6P9ry8VCwIayox0uTerwBtuBIv1Pedq82Hy3/gI8IZP6k0IOAPsaYDHfxrU5sgHLGhAwb4B7EQXcA+A8AV4PAxB3UQgwIyFgQsETDTG/BynZyLcMlTjn89KgNue2VJUDO8flG6ii6iciqX7zBzRUX2X+V0iBhdozAXRUQb0FAn+FrZYQAw5arZ+NE46ADyJLcCyxzbqytwRTf2M4k/W2Q76Rys01/Uxy14BjaIA9wIBYpbdcDMBYJsBVGzWkWq3zkjI9+FJAzRyRpOJ8noTEEnP15RRndexnUhhEztLyM4EUWsCpFPAGQEK8aYFspVMAGWL7UG5UUqxDBUwCs0hShj5gLTxVlzOc3Ynfcf6R4q3FgNSKBYJtBXRY7iZUJrTgNZTW5yspoFI52vCRpAg9Ph3I3FzjLPd+LFn/xoCUd8AOwLUConM38AYUkBL2AIUAp6QAPwXcfTSSSa25AkPZ59P/opjieTucA1FA4aRIAs5VVVkpd5+tqoCIMKChVS4p+1KqgqxYUomOJ+Zy0yXO9vC3LDfXICkGI7VtgQBjbOUKuTvX5pThw4CMBuhLCjBQwPdtYklJOc65BaaBzwWM8Qy1jY0YqeRIwDt/11FAYBiQ1RYqWfsBubGkcBz/JMxfcNZrrcYiMI8MAegXUZbK3bHAk7KFsENplygptSrgEaTEsn1rLsKUowWYa3dqcpI2RKgoioEs9FYnUUB27mx0ZXthkyvg71yxTpUZSFc2AEKiSSVpDo6t+PgNc90fqtx9g0RMURRSGUH2SQVs5O9JClgLA/nK6cwHuHntIbPllC8D62hSco4S4zfMXcFIyYdNqBCgBgHtBwCJjECswmqDhlVAeWrKzSnAx+teCujMANwqle4TTQpa6le5mqtNMNf+3PReA6YoXt5F2FLaBwOeBUZIPiQboKcBo5CfUh0+BaBOooAILzCkgJZ4QJwqsPtsNJPqVLx9TaLCGXO112MRUBRSxRb+RQ1cBLyF6VYz+exFlIOFTKhVTNknFTDgtYICyuIdTVvG4kv5KWGK8QwMQ99yWMvSWHFxLQioKAaIYMMq/KgXEKQKMjOxkRWu4dcz1S+b+nOFP/QAzFTbjAbSqLZsGf5N0YIyV57PMDbqI+3meiheLgUcA/hqvIIHYPy1tpjXn8N2ohGY+gAJ6t/WQLgG8jwuoAFWv2pd51uFOhDKQgpG6l0P/EKVRMz8NIitIoNPR6NoCgqpDos53100gjbAo5zr+9RPMp9Xu7V6P2U+M3uSxs6n1I4FPKnvw3RArRHE/VDp849UPzmw30drrbXWWgdsc9B90Nm1ZSo1hImSULZZV54Oj6n+z0Uu0hSqRACFlH4U+7ODvNmQoPFG+6hK56NMBQdKKDjbhNmxwL3GX4NW4Ai0gOYZQNWwdAIsh02oEdx2DaJuAZJecBHqwMXUj2vhVafMRsoLAxpCVtLTZN/D0Nw0JBQiN9dkAZD6kUKKYwu4As9jOtiNwr2Y2e0cwUDF3OM7At/xLA3gxerespXiw2k1Coxk9sLRaN/HzJSfmOjm6WrUhAKAOS32xqJ83pzvj3MdM7M/x9mF+XYcpaLpO9hVlPv91DKWQkTAPwY+vfi9xPjdvDSIjQ6XhlASOQpbVE0BAEh5RjMQEaFBc4PIOLOmbCdgM+xyrzH/B4T1ej5zg7wI17kYALPMEfCAA0uoEtk7jigJVW05tVW9nenqW47S9vZn0K8hnu1kKwGVKprnfI3GGP0Sitn3J/XbVYM7sNCfrhJwmyrmOeXO/Jr95Mi1Nmw5RMCWATA+8QlUERKY22t3Nz90XaPdfN91v95mqPDgS3x74eJZnITFFAUU6CPgyTK93fW+XFWpCqYOB5gs8ABfDAaU5rmDX4KST2orNNrx9BZz1DePvh/lMGAchI5vgS1+0X27Fqu1nCJgZAgAafQkMJZdsBOu9X+q+OpPH19legL4/7Mxsyrjd99995do23I/cJ8Ldd89YAB481n8hit33333H5/SSkcErBNgNWDURISAEAHH4RWGCFhVwCgCnsPXFKXIni91nbvHSzVJgVcgmJ11j1JE7ErRSEncs62iKKSWP5aTZb56lbeAwSFH/iDAdgC2lt8yh+sVp6r7Ch7P+/6T6q57FZB8mWd5bOnbzvfeyuNBQOzbOhA+heN8E76lXxfAPVXd389f3o8rlVYUhVR6Pj4N3qh3CkKVZ7VOjn0rx+dJbkIb/1V0bqBjxxz0BLdnuZK2kaPR3ey9bqdMSvKHjvOQPN9KzuxfRVGMkoeH0HdnqbabJQmIHHWTfJECpOj9JO0tPmTr0yuHov+fzWzgJUhWdExIclsrPftVUUjZ5WBrJHmRC/y/5hQHNLMp70JyS44DkVwtVZHqCjfbXIqfVx7hx1Mp3w9o9p9mA3+SJKBy3IsksFr5SdkWhVRlDsAwya1Ua2YtzkpyhdSvSR7BcSPXJ1N3u8GzbMrV5iLJxVKLkGxz8MEHr3gZsE6SfaYeQHLIwQcffPD2P0+Sh3IASq+mV35SbkXxvxx8kuRGLD0w2CFnjfcGkjyUqTt4P8nHHMvMwBDJ1Sy9nSVIfjX1d5KNmrocyZGrmaR2iqK3HKxAcneKTX+cPfTpmt7RtwPMkbyKOaf8MMmhHcBQseOQBBGue2mHItm1YxnHqaoRpHKLQur7Jzm4H0mwMrHiVLpfRn+Ldq5OST7PZZVIXi/kYiTvFtQzyVUc711GX6UaoB+p1qIopPwth8dhGuw/BxjfI8B/NbObkLyZefZM8v+OE2nvJwmcXX1r45K8l8O/hEgJn/71OZQSlxKTkpWykaoqiqKY0/IIsA6TSu+jwVEz2AzJIX2+SPJyA2uLpQDhGiS5kOtJqSmB9kVIfrrUkKorci2VZ/ms3KSD5Denj/ZBkt/0OR7JSZ+lXa7JJpuci+m5zNVrk0022eRdmN5dqVHk+ahzW26BZqPg3sFtTOm43kr6XFrHJFfxuR3J1mvXfJ/n4buSOcZdSa+5xEjJSM1tdrP7zqHUxq+kSqU8pKgt17eaY/hHKNyfw5yv0h5FEsz41EjyrxZys6dYhLFXMtd8prdbYkr1wS+W+rLjCI4baTsheZfpPZYiObLjQOOme++5dvPpf9z0/mr9vXlUdtyrxEgxSYVKNX5JyiAfUnpSNVLdB5QSyEeLiyxyD8XsHGOTc8Wy1kl+1eN+JL/vaN9CUw8x/9LhnkVa6lRKKDspeqnVIi1VnovRyV3Np9l+yL1EuwrJy/3TUStJns2xiyivKn2kwgpnY1kNJvVW6LPkYVckK2lvIPmIaJVJ8g4ARfkgSd7Lwl4Esr5feklRFu4OsuqqcEux5+A5JLmpB6wGJID+c0jyDdHseiR5l0GB/QcbfAFJ7udcYYuRfEgWZytZUiEexW2zkQJ9uYdUUQ4etAF6X8PMqoxN8gCO5UgCtZR1Tf/GLT0ryUM5vkySA5tdgeQ3Q8A1yec5ViG5Lfaksn2kBLORwio8V8+BVdmKz3L/NLMd/JrklI5KJE+j2MV85tqEqW8heRPHb0nuw8zuRPI4AQbuSU7pOBLJb7MnleQjRZHNf3yk2vNgVm/dH1bu0LSprW7jZmcw5+Dv30C7z9JsE+dZQtnUMcy5k31s4Cr/dMzX7gbqPoWZ7eBJG3hEtSG/PNrNgI05j/f+DfzY2B/AoxPL+O0eUib5MHtF4ze5SY1HsBxuZ9qb3GSOLVk18aNdUkpZSbG6pC6kAPNSBj6u1LYmFWGZv0lrS4rKKhwHk4odS+pZ6k5q5PKWw46OuuGGpA7O/gWrkJQi/ohU9HukVC2XT5cK3L2UixSDrfsy"},3317:(e,l,s)=>{e.exports=s.p+"img/mangdonalds.b1894f81.png"}}]);