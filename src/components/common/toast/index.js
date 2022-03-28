import Toast from './Toast.vue'

const obj = {}
// 这里默认会把Vue传过来
obj.install = function (Vue) {
    // console.log('执行了obj的install函数', Vue);

    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()

    // 3.将组件对象手动的挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast//把toast放到Vue原形里边，这样其他地方就可以拿到这个对象

}

export default obj