<template>
    <div id="nav">
        <h3>
            <router-link :to="{name:'webFile'}" exact>URL在线文档预览</router-link>
            &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link :to="{name:'dbFile'}" exact>数据库文档预览</router-link>
        </h3>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    #nav {
        height: auto;
        padding-top: 2%;
        width: calc(100% - 200px);
        margin-left: 6%;
        text-align: center;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
