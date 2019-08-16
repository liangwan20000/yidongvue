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
        ComentList
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
            try {
                // 发送请求得到结果
                let data = await queryArticle(this.id);
                // 赋值
                this.article = data;
            } catch (err) {
                console.dir(err);
            }
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
