<template>
    <viewFile v-bind:wpsUrl="jwpsUrl" v-bind:token="jtoken"/>
</template>
<script>
    import viewFile from '../components/view'
    export default {
        data(){
            return{
                jwpsUrl:'',
                jtoken:''
          }
        },
        created() {
            this.jwpsUrl = sessionStorage.wpsUrl;
            this.jtoken = sessionStorage.token;
        },
        // 通过组件渲染wps的 iframe 框架
        components: {
            viewFile
        }
    }
</script>
