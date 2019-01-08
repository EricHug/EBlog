<template>
  <div class="light_page">
      <p>
          <a href="javascript:;" class="prev_page" @click="emitPrev" v-show="isShowPrev">{{prevName}}</a>
          <a href="javascript:;" class="next_page" @click="emitNext" v-show="isShowNext">{{nextName}}</a>
      </p>
  </div>
</template>
<script>
  export default {
    name: 'LightPage',
    components: {},
    props: {
      prevName: {
        type: String,
        default: '上一页'
      },
      nextName: {
        type: String,
        default: '下一页'
      },
      isShowPrev: {
          type: Boolean,
          default: false
      },
      isShowNext: {
          type: Boolean,
          default: false
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    mounted() {},
    methods: {
      emitPrev(){
        this.$emit('triggerPrev')
      },
      emitNext(){
        this.$emit('triggerNext')
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/index.less';
  .light_page {
    padding: 10px;
    .prev_page{
        float:left;
    }
    .next_page{
        float:right;
    }
  }
</style>
