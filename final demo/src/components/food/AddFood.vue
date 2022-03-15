<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="toShop">返回商品列表</el-button>
      <el-form :model="addFood" :rules="addRules" ref="addRules" label-width="150px">
        <el-form-item label="食品名称" prop="fname">
          <el-input v-model="addFood.fname"></el-input>
        </el-form-item>
        <el-form-item label="出售价格" prop="fprice">
          <el-input type="number" v-model="addFood.fprice"></el-input>
        </el-form-item>
        <el-form-item label="食品描述" prop="fdesc">
            <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="addFood.fdesc">
          </el-input>
        </el-form-item>
         <el-form-item label="食品类型" prop="tid">
          <el-select v-model="addFood.tid" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.tid"
              :label="item.tname"
              :value="item.tid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="upload-demo"
            action="/api/dincan/admin/uploadImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="successUpload"
            :on-error="errorUpload"
            :file-list="fileList"
            :multiple="false"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="  ">
           <el-button type="primary" @click="onFood">添加食品</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
     var valiNumberPass1 = (rule, value, callback) => {//正整数
            if (value === '') {
                callback(new Error('请输入市场价格'));
            } else if (isNaN(parseFloat(value))) {
                callback(new Error('请输正确的数值'));
            } else {
                callback();
            }
     };
    return {
     addFood:{
       fname:'',
       fprice:'',
       tid:'',
       fdesc:'',
       fpicture:''
     },
     fileList:[],
     options:[],
     addRules:{
        fname:[{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        fprice:[{ required: true, validator:valiNumberPass1, trigger: "blur" }],
        fdesc:[{ required: true, message: '请输入商品数量', trigger: 'blur'}],
     },


    }
  },
  methods: {
    toShop(){
      this.$router.push('/food');
    },
    //获取所有食品类型
    getFoodType(){
      axios.get('/api/dincan/admin/getTypes').then(res=>{  
          this.options = res.data;
      })
    },
     handlePreview(file, fileList){
       
     },
     handleRemove(file, fileList){
       axios.get('/api/dincan/admin/deleteUpload?img='+this.addFood.fpicture).then(res=>{
          this.$message.success('移除成功！');
       })
     }, 
     successUpload(response, file, fileList){
      if(response.flag){
        this.addFood.fpicture = response.img;
        this.$message.success('添加成功！');
      }
     },
     errorUpload(err, file, fileList){
        this.$message.console.error('添加失败！');
     },
     onFood(){
       if(this.addFood.fname!=''&&this.addFood.fprice!=null&&this.addFood.fdesc!=''){
         if(this.addFood.tid!=''){
          if(this.addFood.fpicture!=''){
            axios.post('/api/dincan/admin/addFood',this.addFood).then(res=>{
              if(res.data==1){
                this.$message.success("添加成功！");
                this.$router.push('/food');
              }else{
                this.$message.error("添加失败！")
              }
            })
          }else{
            this.$message("请上传食品图片");
          }
        }else{
          this.$message("请选择类型");
        }
       }else{
         this.$message("完善食品基本信息");
       }
     }
  },
  mounted(){
    this.getFoodType();
  }
}
</script>
<style lang="less" scoped>
.el-steps {
  margin: 15px 0;
  padding: 5px;
}
.el-step__title {
  font-size: 12px;
}
.el-tab-pane {
  border-bottom: black;
}
.el-form{
  width: 60%;
  margin-top: 20px;
  // /* border: 1px solid red; */
  // margin: 5px auto;
  // .el-form-item{
  //   margin: 50px 0px;
  // }
}
</style>