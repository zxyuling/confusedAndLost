<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body,html,#app{
  background: #000;
  color:#fff;
  font-size: 8px;  
  overflow: hidden;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
