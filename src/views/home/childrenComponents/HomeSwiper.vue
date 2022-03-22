<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <!-- 监听轮播图中的图片加载  -->
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    // 只要在它加载出来一张图片的时候发送一次就好了
    // 因为只要有一张图片便可撑开空间
    imageLoad() {
      // 给它发送到home中监听即可
      if (!this.isLoad) {
        //这样做的目的是只 发送一次事件（如果已经发出事件了就不会再发出了）
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>