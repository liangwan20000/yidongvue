<template>
  <div>
        <!-- 导航头 -->
        <!-- <van-nav-bar
        right-text="取消"
        left-arrow
        @click-right="$router.push('/')"
        > -->
        <van-search
            show-action
            v-model="value"
            @input="handle"
            @search="onSearch"
            @cancel="$router.push('/layout')"
            slot="title"
            placeholder="请输入搜索关键词"
            background="#FF4040"/>
            <!-- 智能提示 -->
            <van-cell-group v-show="list.length">
                <van-cell
                @click="onSearch(item)"
                v-for="item in list"
                :key="item"
                :title="item"
                icon="search" />
            </van-cell-group>
        <!-- </van-nav-bar> -->
        <!-- 搜索历史 -->
        <van-cell-group v-show="!list.length">
            <van-cell
            title="历史记录">
                <van-icon
                v-show="!showClose"
                    slot="right-icon"
                    name="delete"
                    style="line-height: inherit;"
                    @click="showClose = true"
                />
                <div v-show="showClose">
                    <span>全部删除</span>&nbsp;
                    <span @click="showClose = false">完成</span>
                </div>
            </van-cell>
            <van-cell
                v-for="item in hitories"
                :key="item"
                :title="item">
                <van-icon
                    v-show="showClose"
                    slot="right-icon"
                    name="close"
                    style="line-height: inherit;"
                />
            </van-cell>
        </van-cell-group>
  </div>
</template>

<script>
// 获取搜索建议
import { get } from '@/api/search.js';
// 引入lodash
import _ from 'lodash';
export default {
    data () {
        return {
            // 实时跟新的值
            value: '',
            // 搜索的数据
            list: [],
            // 控制显示隐藏
            showClose: false,
            // 历史记录
            hitories: JSON.parse(window.localStorage.getItem('hitories')) || []
        };
    },
    methods: {
        // 搜索
        onSearch (item) {
            // 对不同搜索方式的处理
            let value = item || this.value;
            // 判断数组是否重复
            if (!this.hitories.includes(value)) {
                // 保存搜索记录
                this.hitories.push(value);
                // 保存到本地
                window.localStorage.setItem('hitories', JSON.stringify(this.hitories));
            }
        },
        // 实时响应搜索框
        handle: _.debounce(async function () {
            try {
                // 判断输入框是否为空
                if (!this.value) {
                    this.list = [];
                    return;
                };
                // 发送请求
                let data = await get(this.value);
                // 赋值
                this.list = data.options;
            } catch (err) {
                this.$toast.fail('获取频道数据失败');
                console.dir(err);
            }
        }, 800)
    }
};
</script>

<style>
    .van-nav-bar__title {
        padding: 0;
        height: 90px;
    }
</style>
