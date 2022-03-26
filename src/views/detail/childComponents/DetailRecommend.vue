<template>
  <div class="detail-recommend">
    <!-- <goods-list :goods="recommendList"></goods-list> -->
    <!-- {{ recommendList }} -->
    <!-- <goods-list-item
      v-for="(item, index) in recommendList"
      :key="index"
      :goods="item"
    ></goods-list-item> -->
    <div class="so-hot">热门推荐</div>
    <detail-goods-list :goods="recommendList"></detail-goods-list>
  </div>
</template>

<script>
import DetailGoodsList from "./DetailGoodsList.vue";
export default {
  name: "DetailRecommend",
  components: {
    DetailGoodsList,
  },
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-recommend {
  /* text-align: center; */
}
.detail-recommend .so-hot {
  padding: 15px 0 15px 5px;
  color: var(--color-high-text);
}
</style>