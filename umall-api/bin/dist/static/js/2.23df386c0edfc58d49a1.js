webpackJsonp([2],{"/0eK":function(t,e){},P2Xi:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("mvHQ"),s=n.n(i),o=n("Dd8w"),a=n.n(o),r=n("NYxO"),l=n("D/cR"),c=n("BGi1"),d={props:["info"],computed:a()({},Object(r.c)({list:"menu/list"})),components:{},data:function(){return{form:{rolename:"",menus:"",status:1},defaultKey:[],defaultProps:{children:"children",label:"title"}}},methods:a()({},Object(r.b)({requestMenuList:"menu/requestList",requestRoleList:"role/requestList"}),{empty:function(){this.form={rolename:"",menus:"",status:1},this.$refs.tree.setCheckedKeys([])},cancel:function(){this.info.show=!1,this.info.isAdd||this.empty()},add:function(){var t=this;this.form.menus=s()(this.$refs.tree.getCheckedKeys()),Object(l.F)(this.form).then(function(e){200==e.data.code?(Object(c.a)(e.data.list),t.empty(),t.cancel(),t.requestRoleList()):Object(c.b)(e.data.msg)})},getDetail:function(t){var e=this;Object(l.H)({id:t}).then(function(n){e.form=n.data.list,e.defaultKey=JSON.parse(n.data.list.menus),e.form.id=t})},update:function(){var t=this;this.form.menus=s()(this.$refs.tree.getCheckedKeys()),Object(l.J)(this.form).then(function(e){200===e.data.code?(Object(c.a)(e.data.msg),t.cancel(),t.empty(),t.requestRoleList()):Object(c.b)(e.data.msg)})}}),mounted:function(){0===this.list.length&&this.requestMenuList()}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("el-dialog",{attrs:{title:t.info.title,visible:t.info.show},on:{"update:visible":function(e){return t.$set(t.info,"show",e)}}},[n("el-form",{attrs:{model:t.form}},[n("el-form-item",{attrs:{label:"角色名称","label-width":"100px"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.rolename,callback:function(e){t.$set(t.form,"rolename",e)},expression:"form.rolename"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"角色权限","label-width":"100px"}},[n("el-tree",{ref:"tree",attrs:{data:t.list,"show-checkbox":"","node-key":"id",props:t.defaultProps,"default-checked-keys":t.defaultKey}})],1),t._v(" "),n("el-form-item",{attrs:{label:"状态","label-width":"100px"}},[n("el-switch",{attrs:{"active-value":1,"inactive-value":2},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){return t.cancel()}}},[t._v("取 消")]),t._v(" "),t.info.isAdd?n("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")]):n("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("修改")])],1)],1)],1)},staticRenderFns:[]};var f=n("VU/8")(d,u,!1,function(t){n("QTtB")},"data-v-6f5fdf48",null).exports,m={computed:a()({},Object(r.c)({list:"role/list"})),components:{},data:function(){return{}},methods:a()({},Object(r.b)({requestList:"role/requestList"}),{adite:function(t){this.$emit("edite",t)},del:function(t){var e=this;Object(l.G)({id:t}).then(function(t){200==t.data.code?(Object(c.a)("删除成功"),e.requestList()):Object(c.b)(t.data.msg)})}}),mounted:function(){this.requestList()}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list}},[n("el-table-column",{attrs:{prop:"id",label:"角色编号",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"rolename",label:"角色名称",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?n("el-button",{attrs:{type:"primary"}},[t._v("启用")]):n("el-button",{attrs:{type:"info"}},[t._v("禁用")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary"},on:{click:function(n){return t.adite(e.row.id)}}},[t._v("编辑")]),t._v(" "),n("del-btn",{on:{confirm:function(n){return t.del(e.row.id)}}})]}}])})],1)],1)},staticRenderFns:[]};var b={components:{vAdd:f,vList:n("VU/8")(m,h,!1,function(t){n("ZdlV")},"data-v-7ad835c8",null).exports},data:function(){return{info:{show:!1,title:"添加角色",isAdd:!0}}},methods:{add:function(){this.info.show=!0,this.info.title="添加角色",this.info.isAdd=!0},edite:function(t){this.info.show=!0,this.info.title="编辑角色",this.$refs.add.getDetail(t),this.info.isAdd=!1}},mounted:function(){}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")]),t._v(" "),n("v-add",{ref:"add",attrs:{info:t.info}}),t._v(" "),n("v-list",{on:{edite:function(e){return t.edite(e)}}})],1)},staticRenderFns:[]};var v=n("VU/8")(b,p,!1,function(t){n("/0eK")},"data-v-81f7bef4",null);e.default=v.exports},QTtB:function(t,e){},ZdlV:function(t,e){}});
//# sourceMappingURL=2.23df386c0edfc58d49a1.js.map