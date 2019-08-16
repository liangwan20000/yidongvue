<template>
    <div class="more-action">
        <van-button
            @click="handleLike"
            :icon="isLick ? 'star' : 'star-o'"
            round
            :loading="lickLoading"
            type="default"
        >{{ isLick ? '取消' : '' }}点赞</van-button>

        <van-button
            @click="handleUnLike"
            :icon="unLick ? 'clear' : 'close'"
            round
            :loading="unLickLoading"
            type="default"
        >{{ unLick ? '取消' : '' }}不喜欢</van-button>
    </div>
</template>

<script>
// 引入点赞、不喜欢API
import { praiseArticle, delPraiseArticle, likeArticle, dellikeArticle } from '@/api/article.js';
export default {
    // 组件名称
    name: 'moreAction',
    props: ['article'],
    data () {
        return {
            // 加载提示
            unLickLoading: false,
            lickLoading: false,
            // 不喜欢
            switchPraise: null,
            // 点赞
            switchLick: null
        };
    },
    // 计算属性
    computed: {
        // 用户文章的状态 -1：无状态；0-不喜欢；1-点赞
        isLick () {
            // 是否点赞
            return this.switchLick === 1;
        },
        unLick () {
            // 不喜欢
            return this.switchPraise === 0;
        }
    },
    // 自定义方法
    methods: {
        // 点赞
        async handleLike () {
            // 判断是否登录
            if (!this.$checkLogin()) {
                return;
            }
            // 开启等待
            this.lickLoading = true;
            try {
                // 用户文章的状态 -1：无状态；0-不喜欢；1-点赞
                // 判断当前状态
                if (this.isLick) {
                    // 取消点赞
                    await delPraiseArticle(this.article.art_id);
                    // 切换状态
                    this.switchLick = -1;
                } else {
                    // 点赞
                    await praiseArticle(this.article.art_id);
                    // 切换状态
                    this.switchLick = 1;
                }
                // 关闭等待
                this.lickLoading = false;
            } catch (err) {
                return this.$toast.fail('操作失败' + err);
            }
        },
        // 不喜欢
        async handleUnLike () {
            // 判断是否登录
            // 判断是否登录
            if (!this.$checkLogin()) {
                return;
            };
            // 开启等待
            this.unLickLoading = true;
            try {
                // 用户文章的状态 -1：无状态；0-不喜欢；1-点赞
                // 判断当前状态
                if (this.unLick) {
                    // 取消不喜欢
                    await dellikeArticle(this.article.art_id);
                    // 切换状态
                    this.switchPraise = -1;
                } else {
                    // 不喜欢
                    await likeArticle(this.article.art_id);
                    // 切换状态
                    this.switchPraise = 0;
                };
                // 关闭等待
                this.unLickLoading = false;
            } catch (err) {
                return this.$toast.fail('操作失败' + err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
