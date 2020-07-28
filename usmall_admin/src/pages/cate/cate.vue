<template>
<!-- 商品分类 -->
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 弹框 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @edite="edite($event)"></v-list>
    
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
        // 父传子，子变父变，用josn传数据
      info: {
        show: false,
        title: "商品分类添加",
        isAdd:true //用来判断是编辑按钮出现还是添加按钮出现
      },
    };
  },
  methods: {
    // 点击添加按钮，添加弹窗出现，标题改变
    add() {
      this.info.show = true;
      this.info.title = "商品分类添加";
      this.info.isAdd=true//添加按钮出现,编辑按钮不出现
    },
    // 点击了编辑，添加的弹框出现，需要添加页面发起请求，获取编辑的那一条数据，页面的标题改变
    edite(id) {
        this.info.show = true;
      this.info.title = "编辑商品分类";
    //   触发子组件的事件
        this.$refs.add.getDetail(id)
        this.info.isAdd=false//
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>