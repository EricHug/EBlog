<template>
  <div class="nav">
    <div class="tab_wrapper">
      <ul class="tabs">
        <li class="active">
          <router-link to="/blog">博文</router-link>
        </li>
        <li>
          <router-link to="/photography">摄像</router-link>
        </li>
      </ul>
    </div>
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
<style lang="less" scoped>
  .nav {
    width: 100%;
    .tab_wrapper {
      width: 100%;
      .tabs {
        width: 100%;
        text-align: center;
        li {
          margin: 0 30px;
          display: inline;
          margin: 0 10px;
          white-space: nowrap;
          text-transform: uppercase;
          font-weight: bold;
          a {
            font-size: 14px;
            display: inline-block;
            padding: 15px 0;
            height: 50px;
            line-height: 50px;
            border-bottom: 2px solid transparent;
            color: #71767a;
            cursor: pointer;
          }
          &:hover {
            a {
              color: #0099e5
            }
          }
          &.active {
            a {
              color: #0099e5;
              border-bottom: 2px solid #0099e5;
              &:hover{
                text-decoration:none;
              }
            }
          }
        }
      }
    }
  }

</style>
