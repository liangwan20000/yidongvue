<template>
    <!-- 弹出频道列表 -->
    <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '90%', width: '100%' }">
        <!-- 已有频道列表 -->
        <div class="channel">
            <div class="channel-head">
                <!-- 左侧提示 -->
                <div>
                    <span class="title">我的频道</span>
                    <span class="desc">点击进入频道</span>
                </div>
                <!-- 按钮 -->
                <div>
                    <van-button
                        v-show="!showClose"
                        @click="showClose=true"
                        type="danger"
                        plain
                        size="mini"
                    >
                        编辑
                    </van-button>
                    <div v-show="showClose">
                        <van-button size="mini" plain type="danger" class="title">全部删除</van-button>&nbsp;
                        <van-button size="mini" plain type="danger" class="title" @click="showClose = false">完成</van-button>
                    </div>
                </div>
            </div>
            <!-- 展示已有频道 -->
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                    @click="handleMy(index)"
                    v-for="(item, index) in channels"
                    :key="item.id">
                    <span class="text" :class="{ active: index === activeTab }">{{ item.name }}</span>
                    <!-- 推荐不让删 -->
                    <van-icon class="close-icon" name="close" v-show="showClose && item.name !== '推荐'"/>
                </van-grid-item>
            </van-grid>
        </div>

        <!-- 所有频道列表 -->
        <div class="channel">
            <!-- 所有频道标题 -->
            <div class="channel-head">
                <div>
                    <span class="title">频道推荐</span>
                    <span class="desc">点击添加频道</span>
                </div>
            </div>
            <!-- 展示所有频道 -->
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                    @click="handleSelect(item)"
                    v-for="item in recoChannels"
                    :key="item.id">
                    <div class="info">
                        <span class="text">{{ item.name }}</span>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
    </van-popup>
</template>

<script>
// 引入删除方法
import { getAllChannels, deleteUserChannels, resetUserChannels } from '@/api/channel';
export default {
    name: 'show',
    props: ['value', 'channels', 'activeTab'],
    data () {
        return {
            showClose: false,
            // 存储所有频道数据
            allChannels: []
        };
    },
    // 首次渲染后
    mounted () {
        this.query();
    },
    // 自定义方法
    methods: {
        // 引入请求所有频道方法
        // ...mapActions('homeChannel', ['request', 'deleteUserChannels']),
        async query () {
            // 获取所有频道
            let data = await getAllChannels().catch((err) => {
                return console.log(err);
            });
            this.allChannels = data.channels;
        },
        // 传递点击的频道索引
        async handleMy (index) {
            if (!this.showClose) {
                this.$emit('selectMyIndex', index);
            } else {
                // 如果是推荐，什么都不做
                if (index === 0) { return; }
                // 获取删除ID
                let item = this.channels[index];
                // 删除内存中对应的频道
                this.channels.splice(index, 1);
                // 判断用户是否登录
                if (this.$store.state.user) {
                    console.log(1);
                    // 发送请求删除数据中的频道
                    await deleteUserChannels(item.id).catch((err) => { return console.log(err); });
                } else {
                    console.log(this.channels);
                    // 用户没有登录保存到本地
                    window.localStorage.setItem('channels', JSON.stringify(this.channels));
                }
            };
        },
        // 点击推荐频道，push到我的频道
        async handleSelect (item) {
            this.channels.push(item);
            // 判断用户是否登录
            if (this.$store.state.user) {
                let channels = [...this.channels];
                // 用户登录发送请求 保存我的频道到服务器
                channels = channels.splice(1).map((item, index) => {
                    return {
                        id: item.id,
                        seq: index + 1
                    };
                });
                await resetUserChannels(channels);
            } else {
                // 用户未登录保存到本地
                window.localStorage.setItem('channels', JSON.stringify(this.channels));
            }
        }
    },
    // 计算属性
    computed: {
        // 引入请求所有频道方法
        // ...mapState('homeChannel', ['allChannels']),
        // 获取推荐的频道列表
        recoChannels () {
            let ary = this.allChannels;
            if (!ary) { return; }
            // 获取我的频道ID
            const ids = this.channels.map((item) => {
                return item.id;
            });
            // 返回不在我的频道中的所有频道
            return ary.filter((item) => {
                return !ids.includes(item.id);
            });
        }
    }
};
</script>

<style lang="less" scoped>
    .channel {
        // 标题
        .channel-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            // 标题文字
            .title {
                font-size: 30px;
                margin-right: 5px;
            }
            // 进入频道文字
            .desc {
                font-size: 12px;
            }
        }
        .channel-content {
            .text {
                font-size: 16px;
            }
            .active {
                color: red;
            }
            .close-icon {
                font-size: 20px;
                position: absolute;
                top: -5px;
                right: -5px;
                z-index: 99;
                background-color: #fff;
            }
            .info {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
