<template>
  <div class="detail-goods-list">
    <!-- <div>热门推荐</div> -->
    <div></div>
    <detail-goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    >
    </detail-goods-list-item>
  </div>
</template>

<script>
import DetailGoodsListItem from "./DetailGoodsListItem.vue";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "DetailGoodsList",
  components: {
    DetailGoodsListItem,
  },
};
</script>

<style scoped>
.detail-goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>