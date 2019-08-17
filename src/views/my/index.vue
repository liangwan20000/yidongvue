<template>
  <div>
        <!-- 未登录 -->
        <un-login v-if="!user"></un-login>
        <!-- 已登录 -->
        <user-info v-else></user-info>
        <!-- 其他 -->
        <van-cell-group>
            <van-grid clickable>
                  <van-grid-item icon="star" text="我的收藏"/>
                  <van-grid-item icon="chat" text="我的评论"/>
                  <van-grid-item icon="like" text="我的点赞"/>
                  <van-grid-item icon="browsing-history" text="浏览历史"/>
            </van-grid>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="消息通知" is-link />
            <van-cell title="用户反馈" is-link />
            <van-cell title="小智同学" is-link />
            <van-cell title="系统设置" is-link to="/settings" />
        </van-cell-group>
  </div>
</template>

<script>
// 引入未登录
import UnLogin from './components/UnLogin.vue';
// 引入我的
import UserInfo from './components/UserInfo.vue';
import { mapState } from 'vuex';
export default {
    // 未登录
    name: 'My',
    components: {
        // 未登录
        UnLogin,
        // 已登录
        UserInfo
    },
    computed: {
        ...mapState(['user'])
    }
};
</script>

<style>

</style>
