export default {
    install (Vue, options) {
        Vue.prototype.$checkLogin = function () {
            // 有登录状态
            if (this.$store.state.user) {
                return true;
            }
            // 没有登录状态
            this.$dialog.confirm({
                title: '登录提示',
                message: '该操作需要登录，需要登录吗？'
            }).then(() => {
                // on confirm
                this.$router.push({ name: 'login' });
            }).catch(() => {
                // on cancel
            });
        };
    }
}
;
