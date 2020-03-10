<template>
  <div class="dbFile">
    <el-table
            v-loading="loading"
            :data="tableData"
            size="mini"
            align="center"
            style="width: auto">
      <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50">
        <template slot-scope="scope">
          <section>{{getRowIndex(scope.$index)}}</section>
        </template>
      </el-table-column>
      <el-table-column
              prop="name"
              label="文件名"
              align="center"
              header-align="center"
              min-width="150"/>
      <el-table-column
              prop="version"
              label="版本号"
              align="center"
              header-align="center"
              min-width="60"/>
      <el-table-column
              label="文件大小M"
              align="center"
              header-align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.size | formatFileSize(3) }}</span>
        </template>
      </el-table-column>
      <el-table-column
                prop="creator"
                label="创建者"
                align="center"
                header-align="center"/>
      <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
                header-align="center"
                min-width="120"/>
      <el-table-column
              prop="modifier"
              label="修改者"
              align="center"
              header-align="center"/>
      <el-table-column
              prop="modifyTime"
              label="修改时间"
              align="center"
              header-align="center"
              min-width="120"/>
      <el-table-column label="操作"
                       align="center"
                       header-align="center"
                       width="200">
        <template slot-scope="scope">
          <el-button round
                  size="mini"
                  @click="handleEdit(scope.row.id,scope.row.userId)">编辑/预览</el-button>
          <el-button round
                     size="mini" slot="reference" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
            v-if="showOther"
            :total="total"
            :page.sync="pageR.page"
            :limit.sync="pageR.size"
            @pagination="getFileList"
    />
    <el-upload
            v-if="showOther"
            style="float: right"
            :action="action"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-progress="handleProgress"
            :on-success="handleAvatarSuccess"
            :on-change="handleChange"
            :on-error="errFunc"
    >
      <el-button class="e-b" size="mini" title="上传文件">
        上传<i class="el-icon-upload el-icon--right"/>
      </el-button>
    </el-upload>

    <el-dropdown style="float: right;margin-right: 10px" trigger="click" @command="createFile">
      <el-button size="mini" class="e-b">
        新建<i class="el-icon-plus el-icon--right"/>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="word"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-word1"/></svg><span style="text-align: center">文字文档</span></el-dropdown-item>
        <el-dropdown-item command="excel"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-excel1"/></svg><span style="text-align: center">表格文档</span></el-dropdown-item>
        <el-dropdown-item command="ppt"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-ppt4"/></svg><span style="text-align: center">演示文档</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <Progress
            v-bind:progressing="progressing"
            v-bind:showProgressDialog="showProgressDialog"
            v-bind:fileName="fileName"
    />
<!--    一种自定义messageBox，一种自定义dialog，二选一 -->
<!--    <el-dialog-->
<!--            title="提示"-->
<!--            :visible.sync="centerDialogVisible"-->
<!--            width="25%"-->
<!--            center-->
<!--    >-->
<!--      <span style="text-align: center">确定删除当前文件？</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="danger" @click="delFile">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
  import {getFileListByPage, getViewUrlDbPath, delFile, uploadFileUrl} from '../api/index'
  import Pagination from "../components/pagination";
  import Progress from "../components/progress";
  import {fileSuffix} from "../utils/common-data";

  export default {
    name: "dbFile",
    components: {Pagination, Progress},

    data() {
      return {
        loading: false,
        showOther:false,
        tableData: [],
        pageR:{
          page:this.$page,
          size:this.$size
        },
        total: 0,
        action:uploadFileUrl,
        fileName: '',
        progressing: 1,
        showProgressDialog: false,
        file: '',
        isTrusted:false,
        centerDialogVisible: false,
        delFileId: '',
        watchClosed: ''
      }
    },

    created(){
      this.getFileList();
      this.showOther=true;
    },

    methods: {
      getFileList(){
        this.loading = true;
        getFileListByPage(this.pageR).then((res) => {
          if (res.data.data) {
            this.tableData = res.data.data.content;
            this.total = res.data.data.totalElements;
          }else {
            this.showErrMeg('请求错误！');
          }
          this.loading = false;
        }).catch(()=>{
          this.showErrMeg('请求错误！');
          this.loading = false;
        });
      },

      getViewUrlDbPath(fileId,userId){
        this.loading = true;
        const params = {
          fileId: fileId,
          userId: userId
        };
        getViewUrlDbPath(params).then((res) => {
          if (res.data) {
            let r = res.data.data;

            // 跳转 使用sessionStorage，避免关键信息在ip中暴露
            // 使用push会停留当前页面，故不采纳
            // params 传递参数，子组件无法渲染iframe组件，故不采纳
            sessionStorage.wpsUrl = r.wpsUrl;
            sessionStorage.token = r.token;
            const jump = this.$router.resolve({name: 'viewFile'});
            window.open(jump.href,'_blank');
          }else {
            this.showErrMeg('请求错误！');
          }
          this.loading = false;
        }).catch(()=>{
          this.showErrMeg('请求错误！');
          this.loading = false;
        });
      },

      handleEdit(fileId,userId){
        this.getViewUrlDbPath(fileId,userId);
      },

      handleDel(id){
        this.delFileId = id;
        this.centerDialogVisible = true;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showConfirmButton:true,
          showCancelButton:true,
          showClose: false,
          confirmButtonClass:'dbConfirmButton',
          type: 'warning',
          center: true
        }).then(() => {
          this.delFile()
        }).catch(() => {});
      },

      delFile(){
        this.loading = true;
        const param = {
          id: this.delFileId
        };
        delFile(param).then(res =>{
          if (res.data){
            const r = res.data;
            if (r.data){
              this.showSuccessMeg(r.msg);
              this.getFileList();
            }else {
              this.showErrMeg(r.msg);
            }
          }else {
            this.showErrMeg('请求错误！');
          }
          this.loading = false;
        }).catch(()=>{
          this.showErrMeg('请求错误！');
          this.loading = false;
        });
      },

      handleProgress(event, file){
        this.showProgressDialog = true;
        this.progressing=Number(parseFloat(file.percentage).toFixed(2));
        this.fileName=file.name;
        this.isTrusted=event.isTrusted;
      },

      handleAvatarSuccess(response){
        this.progressing=100;
        setTimeout(() => {
          this.showProgressDialog = false;
          if (response.data){
            this.getFileList();
            this.showSuccessMeg(response.msg);
          }else {
            this.showErrMeg(response.msg);
          }
        }, 1800);
      },

      beforeUpload(){
        // 此处判断文件类型，以及文件大小  "MB";
        const size = (Number(this.file.size) / (1024 * 1024)).toFixed(2);
        const fileName = this.file.name;
        const fileStrArr = fileName.split(".");
        const suffix = fileStrArr[fileStrArr.length - 1];

        let result = fileSuffix.some((item) => {
          return item === suffix
        });

        if (!result) {
          this.showErrMeg("不支持该文件类型");
          return false;
        }

        if (size > 10){
          this.showErrMeg("文件不能大于10MB");
          return false;
        }
      },

      handleChange(file){
        this.file = file;
      },

      errFunc(){
        this.showErrMeg('上传失败！');
      },

      createFile(template){
        sessionStorage.createFileUrlType = template;
        const jump = this.$router.resolve({name: 'createFile'});
        this.watchClosed = window.open(jump.href,'_blank');
      },

      getRowIndex(index){
        return index + 1 + (this.pageR.page -1 ) * this.pageR.size
      }
    },

    filters: {
      formatFileSize(sourceValue, fmt){
        return (Number(sourceValue) / (1024 * 1024)).toFixed(fmt);
      }
    },

    watch: {
      watchClosed(){
        // const _this = this;
        // setInterval(function () {
        //   //判断当链接目标窗口关闭，则刷新原页面
        //   if(_this.$store.state.createFileDone){
        //     alert("789456")
        //   }
        // },1000);
      }
    }
  }
</script>

<style>
  .el-message-box{
    margin-top: -15% !important;
  }
  .dbConfirmButton {
    background-color: #f56c6c !important;
    border-color: #f56c6c !important;
  }
</style>
<style scoped>
  .dbFile{
    padding-top: 2%;
    padding-left: 4%;
  }
  .e-b{
    margin-top: 20px;
    margin-right: 10px;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .icon {
    width: 1.15em;
    height: 1.15em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin: 0 8px 0 0;
  }
</style>
