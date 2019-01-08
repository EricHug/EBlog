<template>
  <div class="main">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }

</script>
<style lang="less">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .main {
    width: 666px;
    margin: 0 auto;
  }

</style>
