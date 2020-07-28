<template>
<!-- 秒杀活动 -->
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit($event)"></v-list>
    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
components:{
    vList,
    vAdd
},
data(){
return {
    info:{
        show:false,
        title:"秒杀活动添加",
        isAdd:true
    }
}
},
methods:{
     // 点击添加按钮
    add() {
      this.info.show = true;
      this.info.title = "秒杀活动添加";
      this.info.isAdd = true;
    },
    // 点击编辑按钮
    edit(id){
    this.info.show = true;
      this.info.title = "秒杀活动编辑";
      this.info.isAdd = false; 
    this.$refs.add.getDetail(id)
    }
},
mounted(){},
}
</script>
<style scoped>
</style>