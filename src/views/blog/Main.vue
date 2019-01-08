<template>
  <div class="blog">
    <LightTab :list="tabList" @changeTab="changeTab" />
    <div class="blog_list" v-show="item.active" v-for="(item,index) in blogList" :key="item.type">
      <ul style="min-height:400px;">
        <li class="blog_item" v-for="(citem,cindex) in item.acticles" :key="citem.id">
          <router-link :to="'/blog/detail/'+citem.id+'?type='+query.type" class="title">{{citem.title}}</router-link>
          <p class="content mult_line_ellipsis">{{citem.content}}</p>
        </li>
        <li v-if="item.acticles==0">
          <p class="emergency_tip">一片空白。。还没写呢("▔□▔)！！！</p>
        </li>
      </ul>
      <LightPage :isShowPrev="item.pageNum!=1" :isShowNext="item.recordsPages>item.pageNum" @triggerPrev="jumpPrev(item)"
        @triggerNext="jumpNext(item)"></LightPage>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import BlogApi from '@/api/blog'
  import LightTab from '@/views/common/LightTab'
  import LightPage from '@/views/common/LightPage'
  export default {
    name: 'BlogMain',
    components: {
      LightTab,
      LightPage
    },
    data() {
      return {
        query: {
          pageNum: 1,
          pageSize: 3,
          type: ''
        },
        loading: false,
        blogList: [],
        tabList: [{
            name: '全部',
            type: '',
            active: true
          },
          {
            name: '散记',
            type: 0,
            active: false
          },
          {
            name: '技术小文',
            type: 1,
            active: false
          }
        ]
      }
    },
    computed: {
      tabShowIndex() {
        return this.tabList.findIndex(item => item.active)
      }
    },
    watch: {
      tabList: {
        handler(arr) {
          let self = this
          arr.map((item, index) => {
            self.$set(self.blogList[index], 'active', item.active)
          })
        },
        deep: true
      },
      '$route.query': {
        handler(to, from) {
          if (to.type != undefined) {
            let type = to.type === '' ? to.type : parseInt(to.type)
            this.$nextTick(function () {
              this.responesTab(type)
            })
          }
        },
        immediate: true
      }
    },
    mounted() {
      let self = this
      this.initBlogList()
      this.getList()
      // add event
      // let limitTimer = null
      // window.addEventListener('scroll', () => {
      //   if (document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight && !limitTimer &&
      //     !self.isShowAll) {
      //     console.log('I touch the bottom')
      //     self.query.pageNum++
      //       self.getList()
      //     limitTimer = true
      //     setTimeout(() => {
      //       limitTimer = null
      //     }, 3000)
      //   }
      // })
    },
    methods: {
      initBlogList() {
        let self = this
        let blogList = this.tabList.map(item => {
          return {
            active: item.active,
            type: item.type,
            acticles: []
          }
        })
        // this.$set(this,blogList,blogList)
        blogList.map((item, index) => {
          self.$set(self.blogList, index, item)
        })
        // this.blogList = blogList
      },
      getList() {
        let self = this
        BlogApi.queryByPage(self.query).then(res => {
          let data = res.data.data
          if (res.data.code === 200) {
            self.$set(self.blogList, self.tabShowIndex, {
              acticles: data,
              pageNum: res.data.pageNum,
              recordsPages: res.data.pages,
              type: self.query.type,
              active: true
            })
          }
        })
      },
      // tab切换
      changeTab(cindex) {
        this.$router.push({
          query: {
            type: this.tabList[cindex]['type']
          }
        })
      },
      responesTab(ctype = '') {
        let cindex = 0
        this.tabList.map((item, index) => {
          item.active = item.type === ctype ? true : false
          if (item.type === ctype) {
            cindex = index
          }
        })
        // 获取当前params发起请求
        const {
          pageNum,
          type
        } = this.blogList[cindex]
        this.query.pageNum = pageNum
        this.query.type = type
        this.getList()
      },
      // 上一页
      jumpPrev(item) {
        item.pageNum -= 1
        this.query.pageNum = item.pageNum
        this.query.type = item.type
        this.getList()
      },
      // 下一页
      jumpNext(item) {
        item.pageNum += 1
        this.query.pageNum = item.pageNum
        this.query.type = item.type
        this.getList()
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/css/default.less';
  .blog {
    .blog_item {
      position: relative;
      width: 100%;
      margin: 0 0 15px;
      padding: 15px 2px 20px 0;
      border-top: 1px solid #f0f0f0;
      word-wrap: break-word;

      &:first-child {
        border-top: none;
      }

      .title {
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        margin-bottom: 4px;
      }

      .content {
        font-size: 12px;
      }
    }

    .emergency_tip {
      text-align: center;
      padding-top: 188px;
    }
  }

</style>
