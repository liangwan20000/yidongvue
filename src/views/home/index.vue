<template>
    <div>
        <!-- 头部 -->
        <div class="home-top">
            <van-nav-bar fixed title="黑马头条" left-text="返回">
                <van-input name="search" slot="center" />
            </van-nav-bar>
        </div>

        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

        <!-- 频道 -->
        <van-tabs v-model="activeTab">
            <van-tab v-for="item in channels"
            :title="item.name"
            :key="item.id">

                <!-- 文章列表 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <van-cell
                        v-for="item in item.articles"
                        :key="item.aut_id"
                        :title="item.title"
                    >
                        <div slot="label">
                            <template v-if="item.cover.type">
                                <van-grid :border="false" :column-num="3">
                                    <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
                                        <van-image lazy-load :src="item"/>
                                    </van-grid-item>
                                </van-grid>
                            </template>
                            <p>
                                <span>{{ item.aut_name }}</span>
                                <span>{{ item.comm_count }}</span>
                                <span>{{ item.pubdate }}</span>
                            </p>
                        </div>

                    </van-cell>
                </van-list>

            </van-tab>
        </van-tabs>

        </van-pull-refresh>
    </div>
</template>

<script>
// 引入请求频道的方法
import { getChannels } from '../../api/channel.js';
import { getArticles } from '../../api/article.js';
export default {
    name: 'Home',
    // 数据
    data () {
        return {
            // 当前频道
            activeTab: 0,
            // 控制发起异步请求
            loading: false,
            // 结束加载
            finished: false,
            // 文章列表加载状态
            isLoading: false,
            // 展示的文章列表
            list: [],
            // 频道列表
            channels: [],
            // 时间戳
            timestamp: Date.now()
        };
    },
    // 自定义方法
    methods: {
        // 获取频道对应的文章列表
        async article () {

        },
        // 获取频道列表
        async loadChannels () {
            try {
                // 从store中获取登录信息
                const user = this.$store.state.user;
                // 判断是否登录
                if (user) {
                    const data = await getChannels();
                    // 获取频道列表
                    this.channels = data.channels;
                    // console.log(this.list);
                } else {
                    // 没有登录，从本地获取数据，如果没有再重新请求，请求到数据后存储到本地
                    this.channels = JSON.parse(window.localStorage.getItem('channels')) || [];
                    if (this.channels.length === 0) {
                        const data = await getChannels();
                        this.channels = data.channels;
                        window.localStorage.setItem('channels', JSON.stringify(this.channels));
                    }
                };
                // 给每一个频道添加articles属性
                this.channels.forEach((item) => {
                    item.articles = [];
                    // 动态增加的成员想要成为响应式的数据，需要使用$set
                    // this.$set(item, 'acticles', []);
                });
            } catch (err) {
                this.$stoast.fail('获取频道数据失败');
                console.log(err);
            }
        },
        // 加载文章列表
        async onLoad () {
            // 获取当前频道的id
            const activeChannel = this.channels[this.activeTab];
            // 发送请求
            const data = await getArticles({
                channelId: activeChannel.id,
                timestamp: this.timestamp
            });
            console.log(data);
            // 把文章列表存储到channel的articles属性中
            activeChannel.articles.push(...data.results);
            // 保存时间戳
            this.timestamp = data.pre_timestamp;
            // 加载状态结束
            this.loading = false;
        },
        // 下拉刷新
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 1000);
        }
    },
    // 创建实例前
    created () {
        // 获取频道列表
        this.loadChannels();
    }
};
</script>

<style lang="less" scoped>
    .van-tabs {
        margin-top: 92px;
        margin-bottom: 100px;
    }
    .van-tabs /deep/ .van-tabs__content {
        color: red;
    }
</style>

