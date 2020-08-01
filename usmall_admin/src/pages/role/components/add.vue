<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="100px">
          <!-- :default-checked-keys="[5]"默认选中 -->
          <el-tree :data="list" show-checkbox node-key="id" :props="defaultProps" ref="tree" :default-checked-keys="defaultKey"></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestRoleAdd, requestRoleDetail,requestRoleUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultKey:[],
      // 树形结构数据
      defaultProps: {
        children: "children", //判断他的子节点
        label: "title", //展示出来的
      },
    };
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestList",
      requestRoleList: "role/requestList",
    }),
    // 清空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 给树形选中的清空一下
      // this.defaultKey=[]//直接给一个空值清空不了，要使用他自己的方法
      this.$refs.tree.setCheckedKeys([]);
    },
    // 取消
    cancel() {
      this.info.show = false;
      // 如果点添加按钮需要清空一下添加页面的值
      if(!this.info.isAdd){
        this.empty()
      }
    },
    // 添加
    add() {
      // console.log(this.$refs.tree.getCheckedKeys());//获取到树形结构选中的key
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.form)
      // 发起添加的请求
        if (!this.form.rolename) {
        warningAlert("请输入角色名称");
        return;
      }
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list); //成功弹出框
          this.empty(); //清空
          this.cancel(); //弹框消失
          //添加成功获取角色列表,发送一个请求将数据渲染到页面
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg); //失败弹出框
        }
      });
    },
    // 获取一条数据
    getDetail(id) {
      // 发起ajax请求,把获取一条数据的请求拿过来
      requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.defaultKey=JSON.parse(res.data.list.menus);
        this.form.id=id;//修改数据需要传一个数据，里面要求有id，现在我们没有，所有就添加一个
      });
    },
    // 点击修改按钮
    update(){
       // console.log(this.$refs.tree.getCheckedKeys());//获取到树形结构选中的key
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // 发起请求
      requestRoleUpdate(this.form).then(res=>{
        if(res.data.code===200){
          successAlert(res.data.msg)
          this.cancel()
          this.empty()
          this.requestRoleList()
          
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    // 判断 如果menu的list没有请求，就发请求，如果有就不用发了
    if (this.list.length === 0) {
      this.requestMenuList();
    }
  },
};
</script>
<style scoped>
</style>