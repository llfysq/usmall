<template>
<div class='box'>
    <el-table :data="memberList" style="width: 100%">
      <el-table-column prop="id" label="活动名称" width="180"></el-table-column>
   
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
 </div>
 <!--  -->
</template>
<script>
import {mapGetters,mapActions} from "vuex"
export default {
    computed:{
        ...mapGetters({
            memberList:"member/list"
        })
    },
components: {},
data() {
return {
  
};
},
methods: {
    // 编辑
    edit(){

    },
    // 删除
    del(){

    }
},
mounted() {}
};
</script>
<style scoped>
</style>