<template>
    <div class="login">
        <!-- 导航头 -->
        <van-nav-bar
          title="黑马头条"
        />
        <!-- 登录框 -->
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                label="手机号"
                placeholder="请输入手机号"
                clearable
                left-icon="contact"
                name="mobile"
                v-validate="'required|digits:11'"
                :error-message="errors.first('mobile')"
            />
            <van-field
                v-model="user.code"
                label="验证码"
                placeholder="请输入验证码"
                clearable
                left-icon="gem-o"
                name="code"
                v-validate="'required|digits:6'"
                :error-message="errors.first('code')"
            >
                <van-button slot="button" size="small" type="default">发送验证码</van-button>
            </van-field>
            <van-button
                native-type="button"
                type="info"
                @click="loding"
                :loading="btnLoading"
                loading-type="spinner"
                loading-text="登录中..."
            >登录</van-button>
        </van-cell-group>
    </div>
</template>

<script>
// 引入请求API
import { login } from '@/api/user.js';
export default {
    // 数据
    data () {
        return {
            // 登录开关
            btnLoading: false,
            // 提交信息
            user: {
                mobile: '13911111111',
                code: '246810'
            }
        };
    },
    // 自定义方法
    methods: {
        async loding () {
            // 打开登录等待
            this.btnLoading = true;
            // 登录前验证
            const valid = await this.$validator.validate();
            if (!valid) {
                // 关闭登录等待
                this.btnLoading = false;
                return;
            };
            // 获取登录状态
            let token = await login(this.user).catch((err) => { return this.$toast.fail('登录失败' + err); });
            // 保存登录状态
            this.$store.commit('setUser', token);
            // 提示登陆成功
            this.$toast.success('登录成功');
            // 获取当前路由中的查询字符串，如果有跳转到redirect
            // 如果没有跳转到首页
            this.$router.push({
                path: this.$route.query.redirect || '/layout'
            });
            // 关闭登录等待
            this.btnLoading = false;
        }
    },
    // 创建实例前生命周期函数
    created () {
        const dict = {
            custom: {
                mobile: {
                    required: '请输入手机号码',
                    digits: '手机号码必须是11位数字'
                },
                code: {
                    required: '请输入验证码',
                    digits: '验证码必须是6位数字'
                }
            }
        };
        this.$validator.localize('zh_CN', dict);
    }
};
</script>

<style>
    .van-button {
        width: 90%;
        transform: translateX(5%);
    }
</style>

