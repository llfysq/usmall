<template>
<!-- 秒杀活动 -->
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 列表 -->
    <v-list></v-list>
    <!-- 添加 -->
    <v-add :info="info"></v-add>
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
        show:true,
        title:"秒杀活动添加"
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
},
mounted(){},
}
</script>
<style scoped>
</style>