<template>
  <div v-if="currentUser">
        <van-nav-bar
        	title="个人信息"
            right-text="保存"
            left-arrow
            @click-left="$router.back()"
        />
            <!-- @click-right="btnSave" -->
        <van-cell-group>
            <van-cell title="头像" is-link @click="showUpload = true">
                <div slot="default">
                    <img width="60" style="border-radius: 50%;" height="60" :src="currentUser.photo" alt="">
                </div>
            </van-cell>
            <van-cell title="昵称" is-link :value="currentUser.name" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="性别" is-link :value="currentUser.gender ? '女' : '男'" />
            <van-cell title="生日" is-link :value="currentUser.birthday"/>
        </van-cell-group>
        <!-- 弹出选择图片 -->
        <upload-photo @upload-success="handleUploadSuccess" v-model="showUpload"></upload-photo>
  </div>
</template>

<script>
// 引入接口API
import { getUserProfile } from '@/api/user.js';
// 弹出预览图片
import UploadPhoto from './components/UploadPhoto.vue';
export default {
    // 用户个人资料
    name: 'UserProfile',
    // 组件
    components: {
        // 选择图片组件
        UploadPhoto
    },
    // 数据
    data () {
        return {
            // 用户数据
            currentUser: null,
            // 控制预览图片弹窗开关
            showUpload: false
        };
    },
    // 创建实例前生命周期函数
    created () {
        // 获取用户个人资料
        this.loadProfile();
    },
    // 自定义方法
    methods: {
        // 获取用户个人资料
        async loadProfile () {
            try {
                // 发送请求
                let data = await getUserProfile();
                // 获取数据
                this.currentUser = data;
            } catch (err) {
                // 错误提示
                this.$toast.fail('获取个人信息失败' + err);
            }
        },
        // 接收传递过来的图片
        handleUploadSuccess (photo) {
            this.currentUser.photo = photo;
        }
    }
};
</script>

<style lang="less" scopde>
    .van-dialog /deep/ .van-cell__title {
        text-align: center;
    }
</style>
