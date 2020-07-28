<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <el-date-picker
            v-model="value1"
            @change="changeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="请选择分类" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="form.second_cateid" @change="changeSecond()">
            <el-option label="请选择分类" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="form.goodsid">
            <el-option label="请选择分类" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  data() {
    return {
      value1: "",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 二级分类的数组
      secondCateList: [],
    };
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestList",
      requestSeckillList: "seckill/requestList",
    }),
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 清空
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    // 修改一级分类
    changeFirst() {
      // 通过一级分类的id获取这条数据的下标，再获取这个数据下面的children，用于二级分类的循环遍历
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      // console.log(index);
      // console.log(this.cateList[index]);
      this.secondCateList = this.cateList[index].children;
      this.form.second_cateid = "";
    },
    // 修改二级分类,通过二级分类获取到他的children，进行三级联动，商品的选择
    changeSecond() {
      let index1=this.secondCateList.findIndex((item1)=>item1.id==this.form.second_cateid);
      //   console.log(index1);
      // console.log(this.secondCateList[index1]);
      this.threeCateList=this.secondCateList[index1].children;
      this.form.goodsid="";

    },



    // 获取开始结束的时间，将获得的时间转换为时间戳
    changeTime(e) {
       this.form.begintime = new Date(this.value1[0]).getTime();
       this.form.endtime = new Date(this.value1[1]).getTime();
       console.log( this.form.begintime)
       console.log( this.form.endtime)
    },

    // 添加
    add() {
      requestSeckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据
    getDetail(id) {
      requestSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 点击编辑
    update() {
      requestSeckillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestSeckillList();
        }
      });
    },
  },

  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
  },
};
</script>
<style scoped>
</style>