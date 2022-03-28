<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="navbar"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scrollListen="scrollListen"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="goodsImageLoad"
      ></detail-goods-info>
      <!-- <test :detailInfo="detailInfo" @imageLoad="imageLoad"></test> -->
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-commont-info
        :commont-info="commontInfo"
        ref="comment"
      ></detail-commont-info>
      <!-- <detail-recommend :recommendList="recommendList"></detail-recommend> -->
      <div class="so-hot">热门推荐</div>
      <goods-list :goods="recommendList" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComponents/DetailParamInfo.vue";
import Test from "./childComponents/Test.vue";
import DetailCommontInfo from "./childComponents/DetailCommontInfo.vue";
import DetailRecommend from "./childComponents/DetailRecommend.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComponents/DetailBottomBar.vue";

import { debounce } from "common/utils";
import { itemListenerMixin, showBackTop } from "../../common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    Test,
    DetailCommontInfo,
    DetailRecommend,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, showBackTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commontInfo: {},
      recommendList: [],
      themeTopsY: [0, 100, 300, 1000],
      getThemeTopsY: null,
      currentIndex: 0,

      // 这里原本有个itemImageListener: null,的 现在它
      // 被我放到混入 mixin里面了
    };
  },

  activated() {
    //没有keepalive根本不会调用 哈哈哈
    // console.log("进来");
    // 进来
    // 现在我在 keepalive 那里 excloude Detail了（排除在外）
    // 那么 Detail将会被频繁的创建和销毁 所用 当我们每次点击
    // goodItem的时候 Detail都会被从新创建 就会调用created()函数了
  },
  deactivated() {
    //没有keepalive根本不会调用 哈哈哈
    // console.log("离开");
  },
  destroyed() {
    // --->这一切都是为了只在 hom 或 detail 是当前页面时 才监听图片加载
    // console.log("destroyed");
    // 离开 也就是 销毁组件的同时 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  mounted() {
    // 1.接收事件总线上的 goodsListItem 里的 图片加载监听事件
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // // 对监听事件进行保存
    // this.itemImageListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
  updated() {},
  created() {
    // 1.获取并保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
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

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品的详情信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取用户评论信息
      this.commontInfo = data.rate.list[0];

      // 根据最新的数据，对应的DOM是已经被渲染出来了
      // 但是图片依然没有加载完（目前获取的offsetTop是没有包含图片的）
      // 下一帧 等到拿到数据 数据渲染完之后调用
      // 在这个场景中跟update生命周期函数有异曲同工之妙
      this.$nextTick(() => {
        // 每次更新先清空数组
        // this.themeTopsY = [];
        // this.themeTopsY.push(0);
        // this.themeTopsY.push(this.$refs.params.$el.offsetTop);
        // this.themeTopsY.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopsY.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopsY);
      });
    });

    // 3.请求热门推荐的数据
    getRecommend()
      .then((res) => {
        this.recommendList = res.data.list;
      })
      .catch((err) => {
        console.log(err);
      });

    // 4.给 getThemeTopsY函数赋值
    this.getThemeTopsY = debounce(() => {
      this.themeTopsY = [];
      this.themeTopsY.push(0);
      this.themeTopsY.push(this.$refs.params.$el.offsetTop - 50);
      this.themeTopsY.push(this.$refs.comment.$el.offsetTop - 50);
      this.themeTopsY.push(this.$refs.recommend.$el.offsetTop - 50);
      this.themeTopsY.push(Number.MAX_VALUE); //数字中的最大值
    }, 100);
  },
  methods: {
    ...mapActions(["addCart"]),

    goodsImageLoad() {
      // console.log("图片加载");
      // 因为我这里使用了混入（现在使用的是混入中的防抖函数）
      this.refresh();

      // 对于offsetTop值的计算我也使用了防抖函数
      this.getThemeTopsY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopsY[index], 200);
    },
    // 监听页面滚动
    scrollListen(position) {
      // 1.获取y值
      const positionY = -position.y;

      //  2.positionY 的值和主题中的值进行对比
      // [0, 3215, 4060, 4412] <-参考用值 每个页面不一样的
      // positionY 在 0 和 3215之 间 index =0
      // positionY 在 3215 和 4060 之间 index =1
      // positionY 在 4060 和 4412 之间 index =2
      // positionY 超过 4412 index =3

      // let length = this.themeTopsY.length;

      // for (let i = 0; i < length; i++) {
      //   // 为了防止越界问题
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopsY[i] &&
      //       positionY < this.themeTopsY[i + 1]) ||
      //       (i == length - 1 && positionY >= this.themeTopsY[i]))
      //   ) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.navbar.currentIndex = this.currentIndex;
      //   }
      // }

      let length = this.themeTopsY.length;
      // 这里的length-1 减掉的就是添加进来的 数字最大值,这样在下面的循环过程中就不会出现越界问题了,
      // 因为这时候 themeTopsY[4]是存在的 而如果没有加入这个判断元素 那在最后的判断中有个undefined的 就无法判断了
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopsY[i] &&
          positionY < this.themeTopsY[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }

      // 判断backtop按钮是否显示
      this.showBackTop(position);
    },
    // 监听加入购物车事件
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.commit("addCart", product);
      // 想要监听 actions的执行状态 可以在它里边加一个 promise 通过返回值进行监听
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });

      // 特别的，actions映射到这里
      this.addCart(product).then((res) => {
        this.$toast.show(res);
      });

      // 3.添加到购物车成功
    },
  },
};
</script>

<style scoped>
/* 为了让详情页把下边的tabbar覆盖掉 可以 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 100px);
  /* position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px; */
  overflow: hidden;
}
.so-hot {
  padding: 15px 0 15px 5px;
  color: var(--color-high-text);
}
</style>