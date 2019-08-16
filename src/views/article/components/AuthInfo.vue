<template>
    <div class="auth-info" v-if="article">
        <div class="base-info">
            <img class="avatar" :src="article.aut_photo" alt="">
            <div>
                <p>{{ article.aut_name }}</p>
                <p>{{ article.pubdate | fltime }}</p>
            </div>
        </div>
        <div>
            <van-button
                @click="handleFollow"
                :type="article.is_followed ? 'default' : 'danger'"
                :loading="false"
            >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
        </div>
    </div>
</template>

<script>
// 引入全局过滤器
import '@/filters/index.js';
// 引入关注用户
import { followUser, UnFollowUser } from '@/api/user.js';
export default {
    name: 'AuthInfo',
    // 接收传过来的用户信息
    props: ['article'],
    // 定义数据
    data () {
        return {
            text: 123
        };
    },
    // 自定义方法
    methods: {
        // 点击关注按钮
        async handleFollow () {
            // 判断是否登录，提示
            if (!this.$checkLogin()) { return; }
            try {
                // 判断是否已关注
                if (this.article.is_followed) {
                    // 如果已关注
                    await followUser(this.article.aut_id);
                    this.article.is_followed = false;
                } else {
                    // 没有关注
                    await UnFollowUser(this.article.aut_id);
                    this.article.is_followed = true;
                }
            } catch (err) {
                this.$toast.fail('操作失败' + err);
                console.dir(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
  .van-button {
      font-size: 30px;
  }
}
</style>
