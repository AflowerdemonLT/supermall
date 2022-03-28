import { ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED } from './mutation-types'


export default {
    addCart(context, payload) {

        return new Promise((resolve, reject) => {
            // 1.在商品数组中查找商品是否在商品数组中已经存在
            // 存在的话就用 oldProduct 记录(指向) 它
            let oldProduct = context.state.cartList.find((item) => {
                return item.iid == payload.iid
            })
            // 2.判断oldProduct是否有指向 如果有
            // 那就说明传进来的商品已经存在 直接给它的数量加一就好了
            // 如果没有，那么它就是新商品 先给它添加个count属性 然后赋值为1 ,在将它添加到数组中即可
            if (oldProduct) {
                // oldProduct.count+=1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            } else {
                payload.count = 1
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')

            }
        })
    },

    aChangeChecked(context, payload) {

        const checkProduct = context.state.cartList.find((item) => {
            return item.iid = payload
        })


        context.commit(CHANGE_CHECKED, checkProduct)
    }
}