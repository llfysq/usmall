<template>
  <div class="box">
    <el-table :data="seckillList" style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--  -->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {successAlert,warningAlert} from "../../../util/alert"
import { requestSeckillDelete } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      seckillList: "seckill/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList:"seckill/requestList"
    }),
    // 编辑
    edit(id) {
      this.$emit("edit",id)
    },
    // 删除
    del(id) {
      requestSeckillDelete({ id: id }).then((res) => {
        if(res.data.code==200){
          successAlert("删除成功")
          this.requestList()
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
  },
  mounted() {
    if(this.seckillList.length==0){
      this.requestList()
    }
  },
};
</script>
<style scoped>
</style>