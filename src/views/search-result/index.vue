<template>
    <div>
        <van-nav-bar
            title="搜索结果"
            left-text="返回"
            left-arrow
            fixed
            @click-left="$router.back()"
        />
        <!-- 文章列表 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <!-- 每一条数据 -->
            <van-cell
                v-for="item in list"
                :key="item.art_id.toString()"
                :title="item.title"
            >
                <!-- 文章里的内容 -->
                <div slot="label">
                    <template v-if="item.cover.type">
                        <van-grid :border="false" :column-num="3">
                            <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
                                <van-image lazy-load :src="item"/>
                            </van-grid-item>
                        </van-grid>
                    </template>
                    <p>
                        <span>{{ item.aut_name }}</span>&nbsp;
                        <span>{{ item.comm_count }}条评论</span>&nbsp;
                        <span>{{ item.pubdate | fltime}}</span>
                        <van-icon name="close" class="xx" @click="handleArticleShow(item)"/>
                    </p>
                    <van-grid :column-num="3">
                    <van-grid-item
                        text="评论"
                    />
                    <van-grid-item
                        text="点赞"
                    />
                    <van-grid-item
                        text="分享"
                    />
                    </van-grid>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
// 引入查询方法
import { getsearchresults } from '@/api/search.js';
// 引入全局过滤器
import '@/filters/index.js';
export default {
    name: 'SearchResult',
    // 接受路由参数
    props: ['q'],
    // 实例创建前
    created () {
    },
    // 数据
    data () {
        return {
            // 搜索结果
            list: [],
            loading: false,
            finished: false,
            // 页码
            page: 1,
            // 每页获取多少条数据
            perPage: 10,
            // 总共多少页
            pageCount: 0
        };
    },
    // 自定义方法
    methods: {
        async onLoad () {
            // 延迟加载
            this.$sleep(1000);
            try {
                // 发送请求
                let data = await getsearchresults({
                    page: this.page,
                    perPage: this.perPage,
                    q: this.q
                });
                // 获取搜索结果
                this.list.push(...data.results);
                // 关闭loding
                this.loading = false;
                // 是否加载完毕
                this.pageCount = Math.ceil(data.total_count / this.perPage);
                // 是否加载完毕
                if (this.page >= this.pageCount) {
                    // 停止加载
                    this.finished = true;
                }
                this.page++;
            } catch (err) {
                console.dir(err);
            }
        }
    }
};
</script>

<style>
    .van-list {
        margin-top: 92px;
    }
</style>
