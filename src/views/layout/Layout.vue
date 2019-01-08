<template>
  <section>
    <div class="ax_header">
      <ax-header></ax-header>
    </div>
    <div class="ax_nav">
      <ax-nav></ax-nav>
    </div>
    <div class="ax_main">
      <ax-main></ax-main>
    </div>
    <div class="ax_foot">
      <ax-foot></ax-foot>
    </div>
    <!-- other setting -->
    <div style="position:absolute; top:20px; right:20px; z-index:1000;">
      <el-tooltip effect="dark" :content="fullButton.full?'退出':'全屏'" placement="bottom-end">
        <el-button @click="full" :icon="fullButton.full?'el-icon-close':'el-icon-rank'" circle></el-button>
      </el-tooltip>
    </div>
  </section>
</template>
<script>
  import AxHeader from './components/AxHeader'
  import AxNav from './components/AxNav'
  import AxMain from './components/AxMain'
  import AxFoot from './components/AxFoot'
  export default {
    components: {
      AxHeader,
      AxNav,
      AxMain,
      AxFoot
    },
    data() {
      return {
        fullButton: {
          full: false
        }
      }
    },
    mounted() {},
    created() {

    },
    methods: {
      full() {
        if (!this.fullButton.full) {
          this.$util.fullScreen()
          this.fullButton.full = true
        } else {
          this.$util.fullExit()
          this.fullButton.full = false
        }
      }
    }
  }
</script>

<style lang="less">
  .ax_header {
    // z-index:10;
    position:relative;
    width: 100%;
    height: 250px;
  }

  .ax_nav {
    z-index:10;
    position:relative;
    width: 100%;
    height: 50px;
    margin-bottom: 40px;
  }

  .ax_main {
    z-index:999;
    position:relative;
    width: 100%;
    margin-bottom: 88px;
  }

  .ax_foot {
    z-index:66;
    position:fixed;
    bottom:0;
    width: 100%;
  }

</style>
