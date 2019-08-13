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
                <van-cell-group>
                    <van-cell
                    v-for="item in list"
                    :key="item"
                    :title="item"
                    icon="search" />
                </van-cell-group>

        <!-- </van-nav-bar> -->
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
            list: []
        };
    },
    methods: {
        onSearch () {
            console.log(1);
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
