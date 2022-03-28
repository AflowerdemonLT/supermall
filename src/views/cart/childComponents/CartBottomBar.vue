<template>
  <div class="bottom-bar">
    <div class="check-contet">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="allChecedkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计{{ totalPrice }}</div>
    <div class="calculate" @click="calculateClick">
      去计算({{ checkedLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

import { mapGetters } from "vuex";

import { CHECKED_ALL } from "../../../store/mutation-types";

export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    // 通过监听商品是否有未选中的 判断
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    // 通过监听商品是否有未选中的 判断是否勾选全选按钮
    isSelectAll() {
      //判断商品列表中是否有未选中的商品
      //  1.filter方法
      //  if (this.cartList.length == 0) return false; //如果商品列表没有数据 也是显示不全选
      //  return !this.cartList.filter((item) => !item.checked).length;

      // 2.find方法
      // find 只要找到一个 就停止查找
      // 只要找到商品列表中有一个是未选中的 就直接不显示全选
      if (this.cartList.length == 0) return false; //如果商品列表没有数据 也是显示不全选
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    allChecedkClick() {
      if (this.isSelectAll) {
        //如果所有商品都被选中了(点击直接变成全部没有选中)
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        //如果有没被选中的商品 点击全选 直接泉被选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calculateClick() {
      this.$toast.show("请选择购买的商品", 2000);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;

  display: flex;
  height: 40px;
  bottom: 0;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-contet {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
  text-align: center;
}
.calculate {
  width: 90px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>