<template>
  <div class="box">
    <el-table :data="list" style="width: 100%;margin-bottom:20px;" row-key="id" border :tree-props="{children:'children'}">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
      
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <!-- 图片传上去到数据库之后路径会发生变化，所有要添加上路径Vue.prototype.$imgPre="http://localhost:3000" -->
          <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="adite(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { requestBannerDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";

import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "banner/requestList",
    }),

    adite(id) {
      // console.log(scope)
      this.$emit("edite", id);
    },
    // 删除
    del(id){
          requestBannerDelete({id:id}).then(res=>{
              if(res.data.code==200){
                  successAlert("删除成功")
                  this.requestList()
              }else{
                  warningAlert(res.data.msg)
              }
          })
      }

  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>