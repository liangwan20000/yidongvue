<template>
    <div>
        <!-- 展示内容 -->
        <router-view></router-view>
        <!-- 底部tabbar -->
        <van-tabbar router>
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/my">{{ user ? '我的' : '未登录' }}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
// 引入vuex
import { mapState } from 'vuex';
export default {
    // 数据
    data () {
        return {
            // 频道列表
            activeTab: 0
        };
    },
    // 计算属性
    computed: {
        ...mapState(['user'])
    }
};
</script>

<style lang="less" scoped>
    .van-tabbar {
        background-color: #FF4040;
    }
</style>

