<template>
  <div class="webFile">
    <div id="nav">
      <h2>
        <router-link to="/webFile">webFile</router-link>
        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link to="/dbFile">dbFile</router-link>
      </h2>
    </div>
    <h1>请输入可访问的webFileURL</h1>
    <div style="margin: 20px 0;"></div>
    <el-input class="cl-textarea"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea">
    </el-input>
    <div style="margin: 40px 0;"></div>
    <br>
    <el-button icon="el-icon-delete" class="el-button" @click="clClean">clean</el-button>
    <el-button icon="el-icon-check" class="el-button" @click="clSubmit">view</el-button>
  </div>
</template>

<script>
  export default {
    name: "webFile",
    data() {
      return {
        textarea: ''
      }
    },
    methods:{
      clClean(){
        this.textarea  = '';
        this.console.success('cleaned textarea value');
      },
      clSubmit(){
        this.getViewUrlWebPath();
      },
      getViewUrlWebPath(){
        if (!this.textarea) {
          this.showErrMeg('输入内容不能为空！');
          return;
        }else {
          let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
          if(!(reg.test(this.textarea))){
            this.showErrMeg('请输入正确的file url！');
            return;
          }
        }
        this.axios.get('/v1/api/file/getViewUrlWebPath?fileUrl=' + this.textarea).then((res) => {
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
        }).catch(()=>{
          this.showErrMeg('请求错误！');
        });
      }
    }
  }
</script>

<style scoped>
  .cl-textarea{
    width: 50%;
    height: 20%;
  }
</style>
