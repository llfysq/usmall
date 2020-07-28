<template>
<!-- 会员管理 -->
  <div>
    <!-- 修改弹框 -->
    <v-alter :info="info" ref="alter"></v-alter>
    <!-- 列表 -->
    <v-list @edite="edite($event)"></v-list>
  </div>
</template>
<script>
import vAlter from "./components/alter";
import vList from "./components/list";
export default {
  components: {
    vAlter,
    vList,
  },
  data() {
    return {
      // 父传子，子变父变，用josn传数据
      info: {
        show: false,
        title: "会员修改",
      },
    };
  },
  methods: {
    // 点击了编辑，添加的弹框出现，需要添加页面发起请求，获取编辑的那一条数据，页面的标题改变
    edite(id) {
      this.info.show = true;
      this.info.title = "会员修改";
      //   触发子组件的事件
      this.$refs.alter.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>