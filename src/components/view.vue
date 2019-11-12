<template>
    <div id="viewFile"></div>
</template>
<script>
    export default {
        props:['wpsUrl','token'],
        data(){
            return{}
        },
        mounted(){
            this.openWps(this.wpsUrl,this.token);
        },
        methods:{
            openWps(url,token){
                let wps = this.wps.config({
                    mount: document.querySelector('#app'),
                    wpsUrl: url
                });
                wps.setToken(token);
            }
        }
    }
</script>
