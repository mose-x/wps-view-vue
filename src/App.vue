<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  html{
    height: 97.5%;
    width: 99%;
  }
  body{
    height: 100%;
    width: 100%;
  }
  body #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
  body #app #wps-iframe{
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    height: 100%;
    /* 防止双击缩放 */
    touch-action: manipulation;
  }

</style>
