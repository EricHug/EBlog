<template>
  <div class="blog">
    <LightTab :list="tabList" @changeTab="changeTab" />
    <div class="blog_list">
      <ul>
        <li class="blog_item" v-for="(item,index) in blogList" :key="item._id">
          <router-link :to="'/blog/detail/'+item._id" class="title">{{item.title}}</router-link>
          <p class="content mult_line_ellipsis">{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import BlogApi from '@/api/blog'
  import LightTab from '@/views/common/LightTab'
  export default {
    name: 'BlogMain',
    components: {
      LightTab
    },
    data() {
      return {
        query: {
          page: 1,
          pageSize: 5,
          type: ''
        },
        loading: false,
        searchKey: "",
        blogList: [],
        isShowAll: false,
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
    watch:{
      'query.type'(){
        this.query.page = 1
        this.getList()
        // reset
        this.isShowAll = false
      }
    },
    mounted() {
      let self = this
      this.getList()
      // add event
      let limitTimer = null
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight && !limitTimer &&
          !self.isShowAll) {
          console.log('I touch the bottom')
          self.query.page++
            self.getList()
          limitTimer = true
          setTimeout(() => {
            limitTimer = null
          }, 3000)
        }
      })
    },
    methods: {
      getList() {
        let self = this
        BlogApi.queryByPage(self.query).then(res => {
          let data = res.data
          if (res.data.code === 200) {
            // tab jump to first need to empty records
            if(self.query.page == 1){self.blogList=[]}
            // handle the list
            self.blogList = self.blogList.concat(data.records);
            if (data.records && data.records.length == 0) {
              self.isShowAll = true
            }
          }
        })
      },
      list() {
        this.blogs = []
        this.loading = true
        GistApi.list(this.query).then((response) => {
          let result = response.data
          let pageNumber = this.$util.parseHeaders(response.headers)
          if (pageNumber) {
            this.query.pageNumber = pageNumber
          }
          for (let i = 0; i < result.length; i++) {
            for (let key in result[i].files) {
              let data = {}
              data['title'] = key
              data['url'] = result[i].files[key]
              data['description'] = result[i]['description']
              data['id'] = result[i]['id']
              data['createTime'] = this.$util.utcToLocal(result[i]['created_at'])
              data['updateTime'] = this.$util.utcToLocal(result[i]['updated_at'])
              data['hide'] = false
              this.blogs.push(data)
              break
            }
          }
        }).then(() => this.loading = false)
      },
      changeTab(item) {
        console.log(item)
        let self = this
        this.query.type = item.type
        for(let i = 0;i<this.tabList.length;i++){
          let cur = this.tabList[i]
          if (cur.type === item.type) {
            cur.active = true
          } else {
            cur.active = false
          }
        }
      }
    }
  }

</script>

<style lang="less" scoped>
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
  }

</style>
