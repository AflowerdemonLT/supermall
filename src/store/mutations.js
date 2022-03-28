import { ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED, CHECKED_ALL } from './mutation-types'

export default {

    // 任务分发
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)

    },
    [CHANGE_CHECKED](state, payload) {
        payload.checked = !payload.checked


    },
    [CHECKED_ALL](state, payload) {
        for (let item of payload) {
            item.checked = true
        }
    }

}