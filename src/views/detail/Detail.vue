<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";

import { getDetail, GoodsInfo } from "network/detail";
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
    };
  },
  activated() {
    // 现在我在 keepalive 那里 excloude Detail了（排除在外）
    // 那么 Detail将会被频繁的创建和销毁 所用 当我们每次点击
    // goodItem的时候 Detail都会被从新创建 就会调用created()函数了
  },
  created() {
    // 1.获取并保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 1.获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      // 用获取到的数据来构造我自身
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  },
};
</script>

<style scoped>
</style>