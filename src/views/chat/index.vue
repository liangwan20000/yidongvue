<template>
    <div class="page-user-chat">
        <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
        <!-- 聊天列表 -->
        <div class="chat-list" ref="chatList">
            <!-- 聊天消息 -->
            <div
                v-for="(msg, index) in messages"
                :key="msg.timestamp + index"
                class="chat-item"
                :class="msg.robot ? 'left' : 'right'"
                >
                <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="chat-pao">{{ msg.msg }}</div>
            </div>
            <!-- <div class="chat-item right">
                <div class="chat-pao">ewqewq</div>
                <van-image  fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div> -->
        </div>
        <div class="reply-container van-hairline--top">
            <van-field v-model="value" placeholder="说点什么...">
                <van-loading v-if="commentLoading" slot="button" type="spinner" size="16px"></van-loading>
                <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
            </van-field>
        </div>
    </div>
</template>

<script>
// 导入socketio
import io from 'socket.io-client';
import { mapState } from 'vuex';
export default {
    // 组件名
    name: 'Socketio',
    // 数据
    data () {
        return {
            // 发送的消息
            value: '',
            commentLoading: false,
            // socketIO对象
            socketio: null,
            // 聊天记录
            messages: []
        };
    },
    // 计算属性
    computed: {
        ...mapState(['user'])
    },
    // 实例创建前
    created () {
        this.socket = io('http://ttapi.research.itcast.cn', {
            // 设置token
            query: {
                token: this.user.token
            }
        });
        // 注册socketio事件
        // 建立连接
        this.socket.on('connect', () => {
            // this.socketio.send({ msg: '你好', timestamp: Date.now() });
            // this.socketio.emit('message', { msg: '你好', timestamp: Date.now() });
        });
        // 发送的内容
        this.socket.on('message', (data) => {
            // 存储聊天记录
            this.messages.push({
                // 机器人发的做标记
                robot: true,
                // 聊天记录
                ...data
            });
            // 控制滚动条
            this.handleScroll();
        });
        // 断开连接
        this.socket.on('disconnect', () => {
            console.log('断开连接');
        });
    },
    methods: {
        // 发送消息
        send () {
            // 准备好消息
            const msg = {
                // 聊天内容
                msg: this.value,
                // 时间
                timestamp: Date.now(),
                // 标记
                robot: false
            };
            // 存储消息
            this.messages.push(msg);
            // 发送消息
            this.socket.send(msg);
            // 控制滚动条
            this.handleScroll();
        },
        // 控制滚动条
        handleScroll () {
            // 数据更新之后，等待本次更新后的数据在界面上渲染之后在执行
            this.$nextTick(() => {
                // 设置滚动出去的距离
                this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
            });
        }
    }
};
</script>

<style scoped lang='less'>
    .page-user-chat {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        padding: 92px 0 100px 0;
        .chat-list {
            height: 100%;
            overflow-y: scroll;
            .chat-item{
                padding: 20px;
                .van-image{
                  vertical-align: top;
                }
                .chat-pao{
                    vertical-align: top;
                    display: inline-block;
                    min-width: 80px;
                    max-width: 70%;
                    min-height: 80px;
                    line-height: 80px;
                    border: 0.5px solid #c2d9ea;
                    border-radius: 8px;
                    position: relative;
                    padding: 0 20px;
                    background-color: #e0effb;
                    word-break: break-all;
                    font-size: 28px;
                    color: #333;
                    &::before{
                        content: "";
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        top: 26px;
                        border-top:1px solid #c2d9ea;
                        border-right:1px solid #c2d9ea;
                        background: #e0effb;
                    }
                }
            }
        }
    }
    .chat-item.right{
        text-align: right;
        .chat-pao{
            margin-left: 0;
            margin-right: 30px;
            &::before{
                right: -12px;
                transform: rotate(45deg);
            }
        }
    }
    .chat-item.left{
        text-align: left;
        .chat-pao{
            margin-left: 30px;
            margin-right: 0;
            &::before{
                left: -12px;
                transform: rotate(-135deg);
            }
        }
    }
    .van-image{
        width: 80px;
        height: 80px;
    }
    .reply-container {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 88px;
        width: 100%;
        background: #f5f5f5;
        z-index: 9999;
    }
</style>
