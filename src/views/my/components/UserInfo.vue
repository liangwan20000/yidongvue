<template>
    <van-cell-group class="user-info" v-if="currentUser">
        <van-cell class="base-info" is-link :border="false" to="/user-profile">
            <div slot="title">
                <img class="avatar" :src="currentUser.photo" alt="">
                <span class="title">{{ currentUser.name }}</span>
            </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
            <van-grid-item>
                <span class="count">{{ currentUser.art_count }}</span>
                <span class="text">头条</span>
            </van-grid-item>
            <van-grid-item>
                <span class="count">{{ currentUser.follow_count }}</span>
                <span class="text">关注</span>
            </van-grid-item>
            <van-grid-item>
                <span class="count">{{ currentUser.fans_count }}</span>
                <span class="text">粉丝</span>
            </van-grid-item>
            <van-grid-item>
                <span class="count">{{ currentUser.like_count }}</span>
                <span class="text">获赞</span>
            </van-grid-item>
        </van-grid>
    </van-cell-group>
</template>

<script>
// 用户信息
import { getUserInfo } from '@/api/user.js';
export default {
    // 用户信息
    name: 'UserInfo',
    // 数据
    data () {
        return {
            currentUser: null
        };
    },
    // 创建实例前
    created () {
        // 获取用户信息
        this.loadUserInfo();
    },
    // 自定义方法
    methods: {
        // 获取用户信息
        async loadUserInfo () {
            try {
                // 发送请求
                let data = await getUserInfo();
                this.currentUser = data;
            } catch (err) {
                // 错误提示
                this.$toast.fail('获取用户信息失败' + err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .user-info {
        .base-info {
            display: flex;
            align-items: center;
            background-color: #0096fa;
            div {
                display: flex;
                align-items: center
            }
            .avatar {
                margin-right: 30px;
                width: 100px;
                border-radius: 100%;
            }
        }
        .data-info {
            .text {
                font-size: 28px;
            }
            .count {
                font-size: 24px;
            }
        }
        /deep/ .van-cell__right-icon {
            color: #fff
        }
        /deep/ .van-grid-item__content {
            background-color: #0096fa;
        }
    }
</style>
