<template>
<!-- 管理员管理 -->
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit($event)"></v-list>
    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      // 父传子，子变父变，用josn
      info: {
        show: false,
        title: "用户添加",
        isAdd: true,
      },
    };
  },
  methods: {
    // 点击添加按钮
    add() {
      this.info.show = true;
      this.info.title = "添加管理员";
      this.info.isAdd = true;
    },
    // list点击编辑按钮，list子组件$emit通知父组件，父组件通过$event接收，发出指令给add子组件显示出来
    edit(id) {
      this.info.show = true;
      this.info.title = "编辑管理员";
      this.info.isAdd = false;
      this.$refs.add.getDetail(id)//父组件通过ref通知add子组件获取list点击要修改的那条数据内容
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>