<template>
  <div id="viewBody" class="view-body" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>
<style>

</style>
<style lang="scss">
  @import './assets/css/unis.css';
  @import './assets/css/bootstrap.css';
  @import './assets/css/common.scss';
  @import './assets/css/animate.scss';
  html,
  body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .view-body{
      width: 100%;
      height: 100%;
      position: relative;
    }
    button{
      z-index: 99;
    }
    .relative {
      position: relative;
    }

  }

</style>
<style lang="scss" src="./assets/unis-ui-scss/unis.scss"/>
