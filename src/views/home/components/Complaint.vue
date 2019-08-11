<template>
    <!-- v-model="show"等于 -->
    <!-- v-bind:value="show" -->
    <!-- v-on:input="show = $event" -->
    <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
    >
        <van-cell-group v-show="!isReportShow">
            <van-cell icon="location-o" title="不感兴趣"></van-cell>
            <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReportShow = true"></van-cell>
            <van-cell icon="location-o" title="拉黑作者"></van-cell>
        </van-cell-group>
        <!-- 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权' -->
        <van-cell-group v-show="isReportShow">
            <van-cell icon="arrow-left" @click="isReportShow = false" />
            <van-cell icon="location-o" title="标题夸张"></van-cell>
            <van-cell icon="location-o" title="低俗色情"></van-cell>
            <van-cell icon="location-o" title="错别字多"></van-cell>
            <van-cell icon="location-o" title="旧闻重复"></van-cell>
            <van-cell icon="location-o" title="错别字多"></van-cell>
            <van-cell icon="location-o" title="广告软文"></van-cell>
            <van-cell icon="location-o" title="内容不实"></van-cell>
            <van-cell icon="location-o" title="涉嫌违法犯罪"></van-cell>
            <van-cell icon="location-o" title="侵权"></van-cell>
            <van-cell icon="location-o" title="其他问题"></van-cell>
        </van-cell-group>

    </van-dialog>
</template>

<script>
export default {
    // 组件名称
    name: 'complaint',
    // 接收传递的值
    props: ['value'],
    // 计算属性
    created () {

    },
    // 数据
    data () {
        return {
            isReportShow: false
        };
    }

};
</script>

<style>
    .van-dialog {
        top: 50%;
    }
</style>
