<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestManageAdd,requestManageDelete,requestManageUpdate,requestManageDetail } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestManageList: "manage/requestList",
      requestTotal:"manage/requestTotal"
    }),
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //  清空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 添加
    add() {
       if (!this.form.username) {
        warningAlert("请输入用户名");
        return;
      } else if (!this.form.password) {
        warningAlert("请输入密码");
        return;
      }
      requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestManageList();
          this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
     //获取一条数据
    getDetail(id) {
      //ajax
      requestManageDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password=""
      });
    },
    // 修改
    update() {
      requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.requestRoleList();
    }
  },
};
</script>
<style scoped>
</style>