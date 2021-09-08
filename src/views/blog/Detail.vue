<template>
  <div class="blog_detail">
    <WithinTemplate v-bind="post" @jumpPrev="jumpPrev" @jumpNext="jumpNext">
      <div class="wt_essay" v-html="post.content">
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
  import POSTS from '@/json/posts.json'
  export default {
    name: 'BlogDetail',
    components: {
      WithinTemplate
    },
    data() {
      return {
        loading: false,
        id: this.$route.params.id,
        type: this.$route.query.type,
        // WithinTemplate setting
        post: {
          title: '',
          time: '',
          category: '',
          categoryLink: '',
        },
        prevId: '',
        nextId: '',
        posts: POSTS.RECORDS
      }
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        if (to.fullPath.indexOf('detail') > 0) {
          this.id = to.params.id
          this.type = to.query.type
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
        let newPath = this.$route.path.slice(0,index+1) + this.prevId?this.prevId+'': ''
        let type = this.type
        this.$router.push({
          path: newPath + `?type=${type}`
        })
      },
      jumpNext() {
        let index = this.$route.path.lastIndexOf('\/')
        let newPath = this.$route.path.slice(0,index+1) + this.nextId?this.nextId+'': ''
        let type = this.type
        this.$router.push({
          path: newPath + `?type=${type}`
        })
      },
      getDetail() {
        let self = this
        let curIndex = 0
        console.log(111,this.posts)
        this.post = this.posts.find((item,index)=>{
          if(item.id == this.id){
            curIndex =  index
            return true
          }
        })
        console.log(2222,this.post)

        let len = this.posts.length
        this.prevPost = curIndex === 0?this.posts[len-1]:this.posts[curIndex-1]
        this.nextPost = (curIndex+1) === len ? this.posts[0]:this.posts[curIndex+1]
        this.prevId = this.prevPost['id']
        this.nextId = this.nextPost['id']

        if(this.prevId){
          this.post.previous = this.prevPost.title
        }
        if(this.nextId){
          this.post.next = this.nextPost.title
        }

        // BlogApi.queryAroundById({
        //   id: self.id,
        //   type: self.type
        // }).then(res => {
        //   let data = res.data.data
        //   if (res.data.code === 200) {
        //     Object.assign(self.post, {
        //       title: data['cur'].title,
        //       content: data['cur'].content,
        //       time: data['cur'].createtime.slice(0, 10),
        //       previous: data['prev']?data['prev'].title:null,
        //       next: data['next']?data['next'].title:null,
        //       category: data['cur'].type == 0? '散记':'技术小文',
        //       categoryLink: '/blog/main?type=' + data['cur'].type
        //     })
        //     self.prevId = data['prev']?data['prev'].id:''
        //     self.nextId = data['next']?data['next'].id:''
        //   }
        // })
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/default.less';
  .blog_detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: @backgroundColor;
  }
</style>
