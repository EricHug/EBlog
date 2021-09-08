<template>
  <div class="within_template">
    <div class="wt_header">
      <div class="previous_post">
        <a href="javascript:;" class="jump_btn" @click="jumpPrev" v-if="previous">
          {{previous}}
        </a>
        <a class="deactivate_touch" v-else>没有上一篇了</a>
      </div>
      <div class="current_post">
        <h1 class="cur_title">{{title}}</h1>
        <p>
          <a href="javascript:;" v-if="time">{{time}}</a>&nbsp;
          <router-link :to="{
            name:'BlogMain'
          }">In home</router-link>
        </p>
      </div>
      <div class="next_post">
        <a href="javascript:;" class="jump_btn" @click="jumpNext" v-if="next">
          {{next}}
        </a>
        <a class="deactivate_touch" v-else>没有下一篇了</a>
      </div>
    </div>
    <div class="wt_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import BlogApi from '@/api/blog'
  export default {
    name: 'WithinTemplate',
    components: {},
    props: {
      title: String,
      time: String,
      category: String,
      categoryLink: String,
      previous: String,
      next: String,
    },
    data() {
      return {
        loading: false,
      }
    },
    mounted() {},
    methods: {
      jumpPrev() {
        this.$emit('jumpPrev')
      },
      jumpNext() {
        this.$emit('jumpNext')
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/index.less';
  .within_template {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px 93px;
    background-color: @backgroundColor;
    z-index: 66;
    overflow: scroll;
    .wt_header {
      width: 100%;
      line-height: 32px;
    }
    .jump_btn {
      font-size: 18px;
      display: block;
      font-weight: 600;
      position: relative;
      -ms-word-break: break-word;
      word-break: break-word; // margin-top: 10px;
      color: #121212;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap;
      &:before {
        content: '';
        background-size: contain;
        display: block;
        height: 12px;
        position: absolute;
        top: 9px;
        width: 15px;
      }
    }
    .deactivate_touch {
      font-size: 18px;
      display: block;
      font-weight: 600;
      position: relative; // margin-top: 10px;
      cursor: text;
      user-select: none;
      &:hover {
        text-decoration: none;
      }
    }
    .previous_post a {
      float: left;
      padding-left: 25px;
      &:before {
        background: url(../../assets/image/arrow-black-left.svg) no-repeat;
        left: 0;
      }
    }
    .next_post a {
      float: right;
      padding-right: 25px;
      &:before {
        background: url(../../assets/image/arrow-black-right.svg) no-repeat;
        right: 0;
      }
    }
    .current_post {
      position: absolute;
      width: 800px;
      left: 50%;
      margin-left: -400px;
      text-align: center;
      .cur_title {
        color: #000;
        font-size: 22px;
      }
    }
    .wt_content {
      width: 100%;
      margin-top: 100px;
    }
    .wt_essay {
      width: 600px;
      margin: 0 auto;
      font-size: 14px;
      p {
        margin-bottom: 25px;
      }
    }
  }

</style>
