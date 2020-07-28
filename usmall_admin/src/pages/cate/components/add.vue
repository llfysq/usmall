<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--"  value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态数据渲染到页面 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!--分类名称  -->
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" label-width="100px" v-if="form.pid!==0">
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
        <!--  -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
import { mapGetters, mapActions } from "vuex";
import {
  requestCateAdd,
  requestCateDetail,
  requestCateUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestList",
      
    }),
    // 清空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
     
    },
    // 取消
    cancel() {
      this.info.show = false;
      // 如果点添加按钮需要清空一下添加页面的值
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //修改图片
    changeImg(e) {
      console.log(e);
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
      console.log(URL.createObjectURL(file));
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 添加
    add() {
      // 发起添加的请求
      requestCateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); //成功弹出框
          this.empty(); //清空
          this.cancel(); //弹框消失
          //添加成功获取角色列表,发送一个请求将数据渲染到页面
          this.requestCateList();
        } else {
          warningAlert(res.data.msg); //失败弹出框
        }
      });
    },
  //  获取一条数据
  getDetail(id){
    requestCateDetail({id:id}).then(res=>{
        this.form=res.data.list;
        this.form.id=id;
        this.imageUrl=this.$imgPre+res.data.list.img;
    })
  },
// 修改
update(){
    // 发起请求
    requestCateUpdate(this.form).then(res=>{
      if(res.data.code==200){
        successAlert(res.data.msg)
        this.empty(); //清空
          this.cancel(); //弹框消失
          //添加成功获取角色列表,发送一个请求将数据渲染到页面
          this.requestCateList();
      }else{
        warningAlert(res.data.msg)
      }
    })
}

 
  },
  mounted() {
    // 判断 如果menu的list没有请求，就发请求，如果有就不用发了
    if (this.list.length === 0) {
      this.requestCateList();
    }
  },
};
</script>
<style scoped>
.box >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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