(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{501:function(e,t,r){"use strict";r.r(t);var o=r(2),l=(r(23),{data:function(){return{form:{image:[],userName:"",phone:"",password:"",role:""},formRules:{userName:[{required:!0,message:"Please input name of employee"}],phone:[{required:!0,message:"Please input phone number"}],password:[{required:!0,message:"Please input password"}],role:[{required:!0,message:"Please select a role"}]},roleOptions:[{value:"ADMIN",label:"Admin"},{value:"EMPLOYEE",label:"Employee"}],showUpload:!0}},methods:{toggleUpload:function(){this.showUpload=!this.showUpload},handleChange:function(e){this.form.image.push(e.raw),this.toggleUpload()},handleRemove:function(){this.form.image.pop(),this.toggleUpload()},createUser:function(){var e=this;this.$refs.form.validate(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=18;break}if(0!==e.form.image.length){t.next=4;break}return e.$message.error("Please Upload Image"),t.abrupt("return");case 4:return o=e.$loading(),t.prev=5,t.next=8,e.$store.dispatch("admin/addUser",e.form);case 8:e.$message.success("User Created Successfully"),e.$router.push("/admins"),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(5),e.$message.error("User Creation Failed");case 15:return t.prev=15,o.close(),t.finish(15);case 18:case"end":return t.stop()}}),t,null,[[5,12,15,18]])})));return function(e){return t.apply(this,arguments)}}())},goTo:function(){this.$router.push("/admins")}}}),n=l,c=r(43),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"main-form mb-5"},[r("h2",{staticClass:"main-form__title"},[e._v("Add User")]),e._v(" "),r("el-form",{ref:"form",staticClass:"mt-5",attrs:{rules:e.formRules,model:e.form}},[r("div",{staticClass:"d-flex align-items-center gap-4 mb-5"},[r("el-upload",{staticClass:"upload-demo",class:{hideUpload:!e.showUpload},attrs:{"list-type":"picture-card",action:"#","on-change":e.handleChange,"on-remove":e.handleRemove,"show-file-list":!0,"auto-upload":!1,limit:1,accept:"image/*"}},[r("i",{staticClass:"el-icon-upload"})]),e._v(" "),r("div",{staticClass:"img-caption"},[r("h5",[e._v("Image Of User")]),e._v(" "),r("h6",[e._v("Please Upload Image 160*160")])])],1),e._v(" "),r("div",{staticClass:"d-flex flex-wrap gap-5 mb-4"},[r("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"User Name",prop:"userName"}},[r("el-input",{model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),e._v(" "),r("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"Phone",prop:"phone"}},[r("el-input",{attrs:{type:"number",placeholder:"(+973) 1555389225"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1),e._v(" "),r("div",{staticClass:"d-flex flex-wrap gap-5 mb-4"},[r("el-form-item",{staticStyle:{width:"500px"},attrs:{prop:"password",label:"Password"}},[r("el-input",{attrs:{type:"password","show-password":""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"Role",prop:"role"}},[r("el-select",{staticStyle:{width:"500px"},attrs:{placeholder:"Select Role"},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},e._l(e.roleOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)]),e._v(" "),r("button",{staticClass:"btn btn--pink btn--add",on:{click:function(t){return t.preventDefault(),e.createUser()}}},[e._v("\n    Save\n  ")]),e._v(" "),r("button",{staticClass:"btn btn--white btn--add",on:{click:function(t){return t.preventDefault(),e.goTo()}}},[e._v("\n    Cancel\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports}}]);