import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from './components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装 toast 插件(use它，到时候就会去执行，它的install)
Vue.use(toast)

// 解决移动端的300毫秒延迟
// attach->附加
// 附加到body上
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
