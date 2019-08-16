<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
        title="文章详情"
        left-text="返回"
        fixed
        @click-left="$router.back()"
    />
    <div class="article" v-if="article">
        <!-- 文章标题 -->
        <h2 class="article-title">{{ article.title }}</h2>
        <!-- 作者信息 -->
        <AuthInfo :article="article"></AuthInfo>
        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content">
        </div>
        <!-- 点赞和取消 -->
        <moreAction :article="article"></moreAction>
        <!-- 评论列表 -->
        <ComentList :id="article.art_id.toString()" :isArticle="true"></ComentList>
        <!-- 发布评论 -->
        <SendComment :id="article.art_id.toString()"></SendComment>
        <!-- 评论的评论 -->
        <reply-list :id="id" v-if="$store.state.showReplylist"></reply-list>
    </div>
  </div>
</template>

<script>
// 引入更多操作
import moreAction from './components/moreAction';
// 引入作者信息
import AuthInfo from './components/AuthInfo';
// 导入API
import { queryArticle } from '@/api/article.js';
// 引入评论列表
import ComentList from './components/ComentList.vue';
// 引入发布评论
import SendComment from './components/SendComment.vue';
// 引入文章评论的评论
import ReplyList from './components/ReplyList.vue';
export default {
    name: 'Article',
    props: ['id'],
    // 挂载组件
    components: {
        // 作者信息
        AuthInfo,
        // 点赞
        moreAction,
        // 评论列表
        ComentList,
        // 发布评论
        SendComment,
        // 评论详情
        ReplyList
    },
    // 定义数据
    data () {
        return {
            // 文章详情
            article: null
        };
    },
    // 创建实例前钩子函数
    created () {
        // 获取文章详情
        this.loadArticle();
    },
    // 自定义方法
    methods: {
        // 获取文章详情方法
        async loadArticle () {
            const toast = this.$toast.loading({
                mask: true,
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '正在加载中...'
            });

            try {
                // 发送请求得到结果
                let data = await queryArticle(this.id);
                // 赋值
                this.article = data;
                console.log(data);
            } catch (err) {
                console.dir(err);
            }
            toast.clear();
        }
    }
};
</script>

<style lang="less" scoped>
.article {
  margin-top: 92px;
  padding: 0px 20px;
  overflow: hidden;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
