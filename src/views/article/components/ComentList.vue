<template>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
        <van-cell
          v-for="item in list"
          :key="item.com_id.toString()"
          :title="item.aut_name"
        >
            <!-- 头像 -->
            <div slot="icon">
                <img width="60" style="border-radius: 50%" :src="item.aut_photo" alt="">&nbsp;&nbsp;
            </div>
            <!-- 最右侧的按钮 -->
            <div>
                <van-button type="default" size="mini" icon="star-o">赞</van-button>
            </div>
            <!-- 评论内容 -->
            <div slot="label">
                <p>{{ item.content }}</p>
                <span>{{ item.pubdate | fltime }}</span>&nbsp;<span @click="handleReply(item)">回复: {{ item.reply_count }}</span>
            </div>
        </van-cell>
    </van-list>
</template>

<script>
// 引入方法
import { getComentList } from '@/api/comment.js';
// 引入vuex
// import { mapMutations } from '@/store/index.js';
export default {
    // 评论列表
    name: 'ComentList',
    props: ['id', 'isArticle'],
    // 数据
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            // 记录每次获取到的最后一条数据的ID，为了获取下一条数据
            offset: null
        };
    },
    // 自定义方法
    methods: {
        async onLoad () {
            try {
                // 请求数据
                const data = await getComentList({
                    isArticle: this.isArticle,
                    // 文章ID，或者评论的评论
                    source: this.id,
                    offset: this.offset
                });
                // 存储数据
                this.list.push(...data.results);
                // 存储最后一条ID
                this.offset = data.last_id;
                // 停止loading
                this.loading = false;
                // 判断数据是否全部加载完毕
                if (data.results.length === 0) {
                    this.finished = true;
                }
            } catch (err) {

            }
        },
        // 点击回复，控制显示层显示
        // 记录当前点击回复按钮对应的评论对象
        handleReply (item) {
            this.$store.commit('setShowReplylist', true);
            this.$store.commit('setCurrentComment', item);
        }
    }
};
</script>

<style>

</style>
