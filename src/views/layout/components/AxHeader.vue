<template>
  <div class="header">
    <div class="banner" :style="{background:'url('+bannerUrl+') center center no-repeat'}"></div>
    <div class="sentence">
      <h1>The first glance Heartbeat</h1>
      <h3>Whatever is worth doing is worth doing well.</h3>
      <div class="nologin">
        <el-row class="ax_row">
          <!-- <el-button type="primary" size="mini" class="ax_button" @click="showModal('login')">登录</el-button>
          <el-button type="success" size="mini" class="ax_button" @click="showModal('register')">注册</el-button> -->
        </el-row>
      </div>
      <div class="logined"></div>
    </div>
    <LoginRegister :isShowModal="modal0" :activeName="activeName"></LoginRegister>
  </div>
</template>
<script>
  import Banner from '@/assets/headbk.png'
  import LoginRegister from '@/components/LoginRegister'
  export default {
    components: {
      LoginRegister
    },
    data() {
      return {
        bannerUrl: Banner,
        modal0: false,
        activeName: 'first'
      }
    },
    methods: {
      showModal(name) {
        let self = this
        self.activeName = name
        self.modal0 = true
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/default.less';

  .header {
    position: relative;
    width: 100%;
    height: 100%;

    .banner {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #fff;
      text-align: center;
      width: 100%;
    }

    .sentence {
      position: relative;
      z-index: 6;
      display: flex;
      align-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: 100%;

      .nologin {
        width: 100%;
        display: flex;
        align-content: center;
        align-items: center;

        .ax_row {
          width: 100%;
          text-align: center;
          .mt(40);
        }
      }
    }
  }

</style>
