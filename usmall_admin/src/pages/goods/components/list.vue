<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="address" label="商品价格"></el-table-column>
      <el-table-column prop="address" label="市场价格"></el-table-column>
      <el-table-column prop="address" label="图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
         
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-table-column>
      <el-table-column prop="address" label="是否新品">
        <template>
          <el-button type="primary">是</el-button>
          <el-button type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否热卖">
        <template>
          <el-button type="primary">是</el-button>
          <el-button type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template>
          <el-button type="primary">启用</el-button>
          <el-button type="danger">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button type="primary">编辑</el-button>
          <del-btn>删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
          imageUrl: '',
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="stylus">
.box >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .box >>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .box >>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .box >>> .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>