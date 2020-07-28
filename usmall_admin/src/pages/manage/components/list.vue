<template>
  <div class="box">
    <el-table :data="manageList" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  <el-pagination background layout="prev, pager, next" @current-change="chPage" :page-size="size" :total="total"></el-pagination>
  </div>
  
</template>
<script>
import { requestManageDelete } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      manageList: "manage/list",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
      requestTotal: "manage/requestTotal",
      requestChangePage: "manage/requestChangePage",
      
    }),
    // 点击编辑，通知父组件
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      requestManageDelete({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert("删除成功");
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 页面修改页码
    chPage(a){
      // 把当前页面的页码传给requestChangePage
     this.requestChangePage(a)
     this.requestList()
    }
  },
  mounted() {
    this.requestList();
    this.requestTotal();
  },
};
</script>
<style scoped>
</style>