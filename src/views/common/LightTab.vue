<template>
  <div class="light_tab">
    <span class="lt_item" :style="{width:width?width:'auto'}" v-for="(item,index) in list" :key="index">
      <a href="javascript:;" @click="changeTab(index)" :class="item.active?'link_active':''">{{item.name}}</a>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'LightTab',
    components: {},
    props: {
      width: String,
      list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    mounted() {},
    methods: {
      changeTab(index) {
        this.$emit('changeTab', index)
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/index.less';
  .light_tab {
    text-align: right;
    padding: 10px 10px 0;
    .lt_item {
      display: inline-block;
      text-align: center;
      a {
        padding: 0 6px;
        text-decoration: underline;
        color: rgba( 0, 0, 0, .9);
        &.link_active {
          text-decoration: none;
          user-select: none;
          cursor: text;
        }
      }
    }
  }

</style>
