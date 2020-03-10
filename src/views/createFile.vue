<template>
    <div id="createFile">
        <iframe ref="docContent" class="frame-content" :src="src"/>
    </div>
</template>

<script>
    import {getCreateFilePath} from '../api/index'

    export default {
        name: "createFile",
        data(){
            return{
                src: ""
            }
        },
        created(){
            this.getCreateFilePath(sessionStorage.createFileUrlType);
        },
        methods:{
            getCreateFilePath(type){
                getCreateFilePath({template:type}).then(res=>{
                    if (res.data.data){
                        this.src = res.data.data;
                    }else {
                        this.showErrMeg('请求错误！');
                    }
                }).catch(()=>{
                    this.showErrMeg('请求错误！');
                });
            }
        },
        mounted(){
            // const _this = this;
            // window.onbeforeunload = function(e) {
            //     e = e || window.event;
            //     // 兼容IE8和Firefox 4之前的版本
            //     if (e) {
            //         _this.$store.state.createFileDone = true;
            //     }
            //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
            //     _this.$store.state.createFileDone = true;
            // };
        }
    }
</script>

<style scoped>
    .frame-content {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        border: none;
        /* 防止双击缩放 */
        touch-action: manipulation;
    }
    body #createFile {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        width: 100%;
        /* 防止双击缩放 */
        touch-action: manipulation;
    }
    body #createFile #wps-iframe{
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        height: 100%;
        /* 防止双击缩放 */
        touch-action: manipulation;
    }
</style>