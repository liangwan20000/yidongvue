import Vue from 'vue';
import Vuex from 'vuex';
// 引入存储模块
import { getUser, setUser } from '@/utils/local.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 初始化的时候，直接获取本地用户状态
        user: getUser(),
        // 控制replylist显示隐藏
        showReplylist: false,
        // 当前点击回复按钮的评论对象
        currentComment: null
    },
    // 同步处理state
    mutations: {
        // 同步中定义方法setUser
        setUser (state, user) {
            // 修改state的值
            state.user = user;
            // 存储到本地
            setUser(user);
        },
        // 控制replyList显示隐藏
        setShowReplylist (state, value) {
            // 获取值
            state.showReplylist = value;
        },
        // 评论对象
        setCurrentComment (state, value) {
            // 获取评论对象
            state.currentComment = value;
        }
    },
    actions: {

    }
});
