import Vue from 'vue'
import VueX from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(VueX)

const store = new VueX.Store({
    state: {
        cartList: []
    },
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一 一点（所以下边被注释的函数我就把它放到actions里边）
    mutations,
    getters,
    actions,
    modules: {}
})



export default store