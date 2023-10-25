(function(n,o){typeof exports=="object"&&typeof module<"u"?module.exports=o(require("@mahdikhashan/vue3-click-outside"),require("vue")):typeof define=="function"&&define.amd?define(["@mahdikhashan/vue3-click-outside","vue"],o):(n=typeof globalThis<"u"?globalThis:n||self,n["vue-context"]=o(n["@mahdikhashan/vue3-click-outside"],n.Vue))})(this,function(n,o){"use strict";Array.from||(Array.from=e=>[].slice.call(e)),Array.isArray||(Array.isArray=e=>Object.prototype.toString.call(e)==="[object Array]");const y=Array.from,S=Array.isArray,u={ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40},b=(e,t)=>!e||typeof e.contains!="function"?!1:e.contains(t),h=(e,t,s)=>{e&&e.addEventListener&&e.addEventListener(t,s)},a=(e,t,s)=>{e&&e.removeEventListener&&e.removeEventListener(t,s)},E=e=>(e||[]).filter(g),d=e=>c(e)?e.getBoundingClientRect():null,c=e=>!!(e&&e.nodeType===Node.ELEMENT_NODE),g=e=>{if(!c(e)||!b(document.body,e)||e.style.display==="none")return!1;const t=d(e);return!!(t&&t.height>0&&t.width>0)},m=(e,t)=>y((c(t)?t:document).querySelectorAll(e)),v=(e,t,s)=>{t&&c(e)&&e.setAttribute(t,s)},l=(e,t)=>{let s=e.parentElement;for(;s!==null&&!s.classList.contains(t);)s=s.parentElement;return s};return{directives:{clickOutside:n.directive},props:{closeOnClick:{type:Boolean,default:!0},closeOnScroll:{type:Boolean,default:!0},lazy:{type:Boolean,default:!1},itemSelector:{type:[String,Array],default:()=>[".v-context-item",".v-context > li > a"]},role:{type:String,default:"menu"},subMenuOffset:{type:Number,default:10},useScrollHeight:{type:Boolean,default:!1},useScrollWidth:{type:Boolean,default:!1},heightOffset:{type:Number,default:25},widthOffset:{type:Number,default:25},tag:{type:String,default:"ul"}},computed:{style(){return this.show?{top:`${this.top}px`,left:`${this.left}px`}:null}},data(){return{top:null,left:null,show:!1,data:null,localItemSelector:"",activeSubMenu:null}},created(){this.localItemSelector=this.mapItemSelector(this.itemSelector)},beforeDestroy(){this.closeOnScroll&&this.removeScrollEventListener()},methods:{addScrollEventListener(){h(window,"scroll",this.close)},addHoverEventListener(e){e.querySelectorAll(".v-context__sub").forEach(t=>{h(t,"mouseenter",this.openSubMenu),h(t,"mouseleave",this.closeSubMenu)})},close(){if(this.show){for(;this.activeSubMenu!==null;)l(this.activeSubMenu,"v-context__sub").dispatchEvent(new Event("mouseleave"));this.resetData(),this.removeHoverEventListener(this.$el),this.closeOnScroll&&this.removeScrollEventListener(),this.$emit("close")}},focusItem(e,t){const s=t.find((i,r)=>r===e);s&&s.focus()},focusNext(e,t){this.show&&(e.preventDefault(),e.stopPropagation(),this.$nextTick(()=>{const s=this.getItems();if(s.length<1)return;let i=s.indexOf(e.target);t&&i>0?i--:!t&&i<s.length-1&&i++,i<0&&(i=0),this.focusItem(i,s)}))},getItems(){return E(m(this.localItemSelector,this.activeSubMenu||this.$el))},mapItemSelector(e){return S(e)&&(e=e.map(t=>`${t}:not(.disabled):not([disabled])`).join(", ")),e},onClick(){this.close()},onKeydown(e){const t=e.keyCode;if(t===u.ESC)this.close();else if(t===u.DOWN)this.focusNext(e,!1);else if(t===u.UP)this.focusNext(e,!0);else if(t===u.RIGHT){const s=l(e.target,"v-context__sub");s&&s.getElementsByClassName("v-context")[0]!==this.activeSubMenu&&(s.dispatchEvent(new Event("mouseenter")),this.focusNext(e,!1))}else if(t===u.LEFT){if(!this.activeSubMenu)return;const s=l(this.activeSubMenu,"v-context__sub");s.dispatchEvent(new Event("mouseleave"));const i=this.getItems(),r=i.indexOf(s.getElementsByTagName("a")[0]);this.focusItem(r,i)}},open(e,t){this.data=t,this.show=!0,this.$nextTick(()=>{[this.top,this.left]=this.positionMenu(e.clientY,e.clientX,this.$el),this.$el.focus(),this.setItemRoles(),this.addHoverEventListener(this.$el),this.closeOnScroll&&this.addScrollEventListener(),this.$emit("open",e,this.data,this.top,this.left)})},openSubMenu(e){const t=this.getSubMenuElementByEvent(e),s=l(t.parentElement,"v-context"),i=d(e.target);if(this.activeSubMenu!==s)for(;this.activeSubMenu!==null&&this.activeSubMenu!==s&&this.activeSubMenu!==t;)l(this.activeSubMenu,"v-context__sub").dispatchEvent(new Event("mouseleave"));t.style.display="block";let[r,f]=this.positionMenu(i.top,i.right-this.subMenuOffset,t);t.style.left=`${f}px`,t.style.top=`${r}px`,this.activeSubMenu=t},closeSubMenu(e){const t=this.getSubMenuElementByEvent(e),s=l(t,"v-context");if(this.activeSubMenu!==t)for(;this.activeSubMenu!==null&&this.activeSubMenu!==t;)l(this.activeSubMenu,"v-context__sub").dispatchEvent(new Event("mouseleave"));t.style.display="none",this.activeSubMenu=s&&l(s,"v-context__sub")?s:null},getSubMenuElementByEvent(e){return e.target.getElementsByTagName("ul")[0]},positionMenu(e,t,s){const i=this.useScrollHeight?s.scrollHeight:s.offsetHeight,r=window.innerHeight-i-this.heightOffset,f=this.useScrollWidth?s.scrollWidth:s.offsetWidth,p=window.innerWidth-f-this.widthOffset;return e>r&&(e=r),t>p&&(t=p),[e,t]},removeScrollEventListener(){a(window,"scroll",this.close)},removeHoverEventListener(e){e.querySelectorAll(".v-context__sub").forEach(t=>{a(t,"mouseenter",this.openSubMenu),a(t,"mouseleave",this.closeSubMenu)})},resetData(){this.top=null,this.left=null,this.data=null,this.show=!1},setItemRoles(){m(this.localItemSelector,this.$el).forEach(e=>{v(e,"role","menuitem"),v(e,"tabindex","-1")})}},watch:{closeOnScroll(e,t){e!==t&&(e&&this.show?this.addScrollEventListener():this.removeScrollEventListener())},itemSelector(e,t){e!==t&&(this.localItemSelector=this.mapItemSelector(e))}},render(){if(this.lazy&&!this.show)return o.h(!1);this.onKeydown,this.closeOnClick&&this.onClick;const e=[[o.vShow,this.show],[n,this.close]],t=o.h(this.tag,{class:"v-context",style:this.show?{top:`${this.top}px`,left:`${this.left}px`}:null,tabindex:"-1",role:this.role,"aria-hidden":this.lazy?null:String(!this.show),on:{contextmenu:s=>{s.preventDefault()},keydown:this.onKeydown}},this.$slots.default({data:this.data}));return o.withDirectives(t,e)}}});
