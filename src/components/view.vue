<template>
    <div id="viewFile"></div>
</template>
<script>
    export default {
        props:['wpsUrl','token'],
        data(){
            return{
                // 是否开启简易模式
                simpleMode:false
            }
        },
        mounted(){
            this.openWps(this.wpsUrl,this.token);
        },
        methods:{
            openWps(url, token) {
                let _this = this;
                const wps = _this.wps.config({
                    mode: _this.simpleMode?'simple':'normal',
                    mount: document.querySelector('#app'),
                    wpsUrl: url,
                });
                wps.setToken({"token": token});
                let app = wps.Application;
                this.console.log(JSON.stringify(app))
            }
        }
    }
</script>
