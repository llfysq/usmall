<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor" class="dialog">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="form.specsid" @change="changeSpec()">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in specArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <div id="desc"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { successAlert, warningAlert } from "../../../util/alert";
import {
  requestGoogsAdd,
  requestGoogsDetail,
  requestGoogsUpdate,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
    }),
  },
  data() {
    return {
      //编辑器对象
      editor: null,
      imageUrl: "",
      secondArr: [],
      specArr: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
        //获取分类列表
      requestCateList: "cate/requestList",
      //获取规格列表
      requestSpecList: "spec/requestList",
        //获取商品总数
      requestGoodsCount:"goods/requestTotal",
       //获取商品列表
      requestGoogsList: "goods/requestList",
    }),

     //创建富文本编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      //取值 设置值
      this.editor.txt.html(this.form.description);
    },
    // 清空
    empty() {
   
      this.imageUrl = "";
      this.secondArr = [];
      this.specArr = [];
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    //   编辑器置空
      this.editor.txt.html('')
    },
    // 取消
    cancel() {
      this.info.show = false;
      // 如果点添加按钮需要清空一下添加页面的值
      if (!this.info.isAdd) {
        this.empty();
      }
    },
   
    // 处理一级分类，获取二级分类
    changeFirst(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      //   console.log(index);
      this.secondArr = this.cateList[index].children;
      //   console.log(this.secondArr);
      //传了true,second_cateid就不置空；没传就置空
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    // 图片
    changeImg(e) {
      //   console.log(e);//e打印出来就是上传这张图片的信息

      // 限制上传图片的大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      // 判断上传的文件是不是图片，图片的后缀名有JPG、GIF、png、JPEG
      var extname = e.name.slice(e.name.lastIndexOf(".")); //从最后的.开始截取后缀名
      var extArr = [".png", ".jpg", ".gif", "jpeg"];
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供），some() 不会对空数组进行检测。不会改变原始数组。
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传的图片必须是图片");
      }
      //file是上传的文件
      var file = e.raw;
      //生成一个URL地址，赋值给imageUrl,展示出来
      //   console.log(URL.createObjectURL(file));
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 根据规格获取规格属性
    changeSpec(bool) {
      let index1 = this.specList.findIndex((i) => i.id == this.form.specsid);
      console.log(index1);
      // 获取这个规格下的规格属性赋值给一个空数组
      this.specArr = this.specList[index1].attrs;
      //   console.log(this.specArr);
      //传了true,specsattr就不置空；没传就置空
      if (!bool) {
        this.form.specsattr = [];
      }
    },
    // 点击添加按钮
    add() {
        // 取出编辑器上的东西
      this.form.description = this.editor.txt.html();
    //   商品规格属性要转成字符串
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGoogsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
           //  //重新获取总的数量
          this.requestGoodsCount();
            ////重新获取角色列表数据
          this.requestGoogsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestGoogsDetail({ id: id }).then((res) => {
          // console.log(res)
        this.form = res.data.list;
        // 补一个id
        this.form.id = id;
        // 图片
        this.imageUrl = this.$imgPre + this.form.img;
        //根据一级分类计算出二级分类的数组
        this.changeFirst(true);
        //根据商品规格计算出商品属性
        this.changeSpec(true);
        // 商品规格属性
        this.form.specsattr = JSON.parse(this.form.specsattr);
        // console.log( this.form.specsattr)
      });
    },
    // 点击修改按钮
    update() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGoogsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestGoogsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.requestCateList();
    }
    //  获取所有的规格数据,在不改变原来的基础上获取，可以传一个变量，这里我们传一个true过去
    this.requestSpecList(true);
  },
};
</script>
<style scoped lang="stylus">
..box >>> .dialog {
  min-width: 700px;
}

.box >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box >>> .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>