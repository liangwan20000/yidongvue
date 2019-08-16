<template>
    <div class="add-comment">
        <div class="input-wrap">
            <input v-model="content" type="text" placeholder="请输入内容">
        </div>
        <div class="more-wrap">
            <van-icon v-if="artId" name='star-o' style="font-size: 40px;"></van-icon>
            <van-button :disabled="content.length === 0" @click="handleSend" size="mini">发布</van-button>
        </div>
        <!-- 评论组件 -->
        <!-- <div v-if="list">
            <ComentList :id="list.art_id.toString()" :isArticle="false"></ComentList>
        </div> -->
    </div>
</template>

<script>
// 引入API
import { sendComment } from '@/api/comment.js';
// 引入评论组件
// import ComentList from './ComentList.vue';
export default {
    // 发布评论组件
    name: 'SendComment',
    // 传递过来的值
    props: ['id', 'artId'],
    // 组件
    // cumponents: {
    //     // 评论的评论组件
    //     ComentList
    // },
    // 数据
    data () {
        return {
            content: '',
            // 评论数据
            list: null
        };
    },
    // 自定义方法
    methods: {
        async handleSend () {
            // 判断是否登录
            if (!this.$checkLogin()) { return; };
            try {
                // 发送评论
                const data = await sendComment({
                    target: this.id,
                    content: this.content,
                    artId: this.artId
                });

                // data.new_obj是返回的
                this.list = data;
                console.log(this.list);
                this.$toast.success('操作成功');
            } catch (err) {
                this.$toast.fail('操作失败' + err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .add-comment {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        border-top: 2px solid #ccc;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .input-wrap {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 20px;
            height: 60px;
            display: flex;
            align-items: center;
            width: 70%;
            input {
                border: none;
                color: #999;
                font-size: 30px;
            }
        }
        .more-wrap {
                display: flex;
                width: 30%;
                align-items: center;
                justify-content: space-evenly;
            }
    }
</style>
