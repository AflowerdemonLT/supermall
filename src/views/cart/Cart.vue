<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComponents/CartList.vue";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    // 两种语法（mapGetters辅助函数 -> 仅仅是将store中的getter 映射到局部计算属性）
    // 1.数组语法
    // ...mapGetters(["cartLength", "cartList"]), //将getters里的东西转成计算属性

    // 2.对象语法
    // key值是给它重新起的名字 后边就是getters中的真实名字(映射到getters)
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>