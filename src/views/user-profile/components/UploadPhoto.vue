<template>
    <van-dialog
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
    >
        <van-cell-group>
            <van-cell title="从相册选择"></van-cell>
            <van-cell title="拍照"></van-cell>
            <van-cell title="取消" @click="$emit('input', false)"></van-cell>
        </van-cell-group>
    </van-dialog>
</template>

<script>
export default {
    // 展示图片
    name: 'UploadPhoto',
    // 接收值
    props: ['value'],
    // 数据
    data () {
        return {
            show: true
        };
    }
};
</script>

<style lang="less" scopde>

</style>
