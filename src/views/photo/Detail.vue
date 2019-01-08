<template>
  <div class="blog_detail">
    <WithinTemplate v-bind="post" @jumpPrev="jumpPrev" @jumpNext="jumpNext">
      <div class="wt_essay">
        {{post.content}}
      </div>
    </WithinTemplate>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import BlogApi from '@/api/blog'
  import WithinTemplate from '@/views/common/WithinTemplate'
  export default {
    name: 'BlogDetail',
    components: {
      WithinTemplate
    },
    data() {
      return {
        loading: false,
        id: this.$route.params.id,
        // WithinTemplate setting
        post: {
          title: '',
          time: '',
          category: '',
          categoryLink: '',
          content: ''
        },
        prevId: '',
        nextId: ''
      }
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        if (to.fullPath.indexOf('detail') > 0) {
          this.id = to.params.id
          this.getDetail()
        } else {
          return false
        }
      }
    },
    mounted() {
      let self = this
      this.getDetail()
    },
    methods: {
      jumpPrev() {
        let index = this.$route.path.lastIndexOf('\/')
        let newPath = this.$route.path.slice(0,index+1) + this.prevId?this.prevId: ''
        this.$router.push({
          path: newPath 
        })
      },
      jumpNext() {
        let index = this.$route.path.lastIndexOf('\/')
        let newPath = this.$route.path.slice(0,index+1) + this.nextId?this.nextId: ''
        this.$router.push({
          path: newPath 
        })
      },
      getDetail() {
        let self = this
        BlogApi.queryById({
          id: self.id
        }).then(res => {
          let data = res.data
          if (res.data.code === 200) {
            Object.assign(self.post, {
              title: data.result.title,
              content: data.result.content,
              time: data.result.createDate.slice(0, 10),
              previous: data.prev?data.prev.title:null,
              next: data.next?data.next.title:null,
              category: data.result.type == 0? '散记':'技术小文',
              categoryLink: '/blog/main'
            })
            self.prevId = data.prev?data.prev._id:''
            self.nextId = data.next?data.next._id:''
          }
        })
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/index.less';
  .blog_detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: @backgroundColor;
  }
</style>
