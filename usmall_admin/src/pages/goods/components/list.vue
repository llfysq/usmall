<template>
  <div class="box">
    <el-table :data="list" style="width: 100%" >
      <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
    <el-table-column label="图片" width="180">
        <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary"  v-if="scope.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="adite(scope.row.id)">编辑</el-button>
          <del-btn  @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->

    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total"></el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {requestGoogsDelete} from "../../../util/request"
import {successAlert,warningAlert} from "../../../util/alert"
export default {
  computed:{
    ...mapGetters({
      list:"goods/list",
      total:"goods/total",
      size:"goods/size"
    })
  },
  data() {
    return {
         
    };
  },
  methods: {
    ...mapActions({
      requestList: "goods/requestList",
      requestTotal: "goods/requestTotal",
      requestChangePage: "goods/requestChangePage",
    }),

    adite(id) {
      // console.log(scope)
      this.$emit("edit", id);
    },
    // 删除
    del(id){
          requestGoogsDelete({id:id}).then(res=>{
              if(res.data.code==200){
                  successAlert("删除成功")
                  this.requestList()
                   this.requestTotal()
              }else{
                  warningAlert(res.data.msg)
              }
          })
      },
       //修改页码
    cPage(a){
      // 把当前页面的页码传给requestChangePage
        this.requestChangePage(a)
        this.requestList()
    }
 

  },
  mounted() {
      this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped >
img{
  width: 100px;
  height: 100px;
}
</style>