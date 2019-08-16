<template>
    <van-popup
     position="bottom"
    :style="{ height: '80%' }"
    @click-overlay="$store.commit('setShowReplylist', false)"
    :value="$store.state.showReplylist">
        <!-- 评论头 -->
        <van-nav-bar :title="$store.state.currentComment.reply_count + '条评论'"/>
        <!-- 楼主发布的评论 -->
        <van-cell
        >
            <!-- title的插槽 -->
            <div slot="title">{{ $store.state.currentComment.aut_name }}&nbsp;&nbsp;<van-tag>楼主</van-tag></div>
            <!-- 头像 -->
            <div slot="icon">
                <img width="60" style="border-radius: 50%" :src="$store.state.currentComment.aut_photo" alt="">&nbsp;&nbsp;
            </div>
            <!-- 最右侧的按钮 -->
            <div>
                <van-button type="default" size="mini" icon="star-o">赞</van-button>
            </div>
            <!-- 评论内容 -->
            <div slot="label">
                <p>{{ $store.state.currentComment.content }}</p>
                <span>{{ $store.state.currentComment.pubdate | fltime }}</span>&nbsp;<span>回复: {{ $store.state.currentComment.reply_count }}</span>
            </div>
        </van-cell>
        <!-- 评论列表 -->
        <h6>全部评论</h6>
        <coment-list :id="$store.state.currentComment.com_id.toString()" :isArticle="false"></coment-list>
        <!-- 发布评论 -->
        <send-comment :id="$store.state.currentComment.com_id.toString()" :artId="id"></send-comment>
    </van-popup>
</template>

<script>
// 评论列表
import ComentList from './ComentList.vue';
// 发布评论
import SendComment from './SendComment.vue';
export default {
    // 评论的评论
    name: 'ReplyList',
    props: ['id'],
    // 组件
    components: {
        // 评论列表
        ComentList,
        // 发布评论
        SendComment
    },
    created () {
        console.log(this.$store.state.currentComment);
    },
    // 数据
    data () {
        return {
            show: true
        };
    }
};
</script>

<style>

</style>
