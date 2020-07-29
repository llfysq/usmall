<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px" v-for="(item,index) in attr" :key="index">
          <el-input v-model="item.value" style="width: 69%;"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestSpecAdd,
  requestSpecUpdate,
  requestSpecDetail,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
 computed:{
   ...mapGetters({
     list:"spec/list"
   })
 },

  data() {
    return {
      attr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestSpecList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    // 增加规格属性，增加一个就给attr数组里面push一个
    addAttr() {
      this.attr.push({
        value: "",
      });
    },
    // 删除规格属性，通过下标来删除
    delAttr(index) {
      this.attr.splice(index, 1);
    },
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //  清空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      },
      this.attr= [
        {
          value: "",
        },
      ]
    },
    // 添加
    add() {
      // 验证一下attr这个数组是否为空
      if (this.attr.some((item) => item.value == "")) {
        warningAlert("属性规格不能为空");
        return;
      }
      // 如果不为空就用添加的属性拼接为一个数组
      this.form.attrs = JSON.stringify(this.attr.map((item) => item.value));
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          //重新获取角色列表数据
          this.requestTotal();
          this.requestSpecList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
//获取一条数据
    getDetail(id) {
      //ajax请求
      requestSpecDetail({ id: id }).then((res) => {
        console.log(res.data)
        this.form = res.data.list[0];
        // 如果箭头函数去掉了return,想要输出一个josn，就用（）括起来
        this.attr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
      });
    },
     //点击了修改
    update() {
       if (this.attr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }

      this.form.attrs = JSON.stringify(this.attr.map((item) => item.value));
      requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestSpecList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if(this.list.length==0){
      this.requestSpecList()
    }
  },
};
</script>
<style scoped>
</style>