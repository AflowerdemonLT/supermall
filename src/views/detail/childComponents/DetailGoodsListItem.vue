<template>
  <div class="detail-goods-list-item">
    <img :src="goodsItem.image" alt="" />
    <div class="detail-gooods-infon">
      <div class="goods-hot-title">
        <p>{{ goodsItem.title }}</p>
      </div>
      <div class="goods-hot-price">
        <span class="price">￥{{ goodsItem.price }}</span>
        <span class="collect">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  name: "DetailGoodsListItem",
};
</script>

<style scoped>
.detail-goods-list-item {
  padding-bottom: 15px;
  position: relative;

  width: 48%;
}
.detail-goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-hot-title {
}
.goods-hot-title p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 14px;
}
.goods-hot-price {
  text-align: center;
}
.goods-hot-price .price {
  color: var(--color-high-text);
  padding-right: 5px;
  margin-right: 16px;
}
.goods-hot-price .collect {
  position: relative;
}
.goods-hot-price .collect::before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  left: -14px;
  top: 1px;

  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>