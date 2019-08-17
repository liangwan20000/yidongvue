<template>
    <van-dialog
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
    >
        <van-cell-group>
            <van-cell title="从相册选择" @click="handleSelectPhoto"></van-cell>
            <input type="file" @change="handleFile" ref="file" style="display: none">
            <van-cell title="拍照"></van-cell>
            <van-cell title="取消" @click="$emit('input', false)"></van-cell>
        </van-cell-group>
    </van-dialog>
</template>

<script>
// 引入API
import { getUserData } from '@/api/user.js';
// 图片预览组件
import Vue from 'vue';
import { ImagePreview } from 'vant';

Vue.use(ImagePreview);
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
    },
    // 自定义方法
    methods: {
        // 点击弹出选择图片弹窗
        handleSelectPhoto () {
            // 获取fail标签点击
            this.$refs.file.click();
        },
        // 当选择图片后去预览图片
        handleFile () {
            // this.$refs.file.files[0]
            // 关闭弹框
            this.$emit('input', false);
            // 图片的预览
            ImagePreview({
                // 显示的图片
                images: [
                    URL.createObjectURL(this.$refs.file.files[0])
                ],
                // 是否显示页码
                showIndex: false,
                // 增加一个上传方法
                onClose: this.handleUpload
            });
        },
        // 上传文件
        handleUpload () {
            this.$dialog.confirm({
                message: '是否设置该图片为头像'
            }).then(async () => {
                // 加载提示
                const toast = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '正在上传...'
                });
                try {
                    // 上传图片
                    let data = await getUserData('photo', this.$refs.file.files[0]);
                    // 更改父组件中显示的头像
                    this.$emit('upload-success', data.photo);
                    // 成功提示
                    this.$toast.success('上传成功');
                } catch (err) {
                    // 失败提示
                    this.$toast.fail('上传失败' + err);
                }
                // 关闭提示
                toast.clear();
            }).catch(() => {});
        }
    }
};
</script>

<style lang="less" scopde>

</style>
