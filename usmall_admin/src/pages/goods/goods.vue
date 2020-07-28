<template>
<!-- 商品管理 -->
<div>
    <!-- 添加按钮 -->
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
        title:"商品添加"
    }
    
}
},
methods:{
    // 点击添加按钮
    add(){
        this.info.show=true;
        this.info.title="商品添加"

    }
},
mounted(){},
}
</script>
<style scoped>
</style>