<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control-top"
      v-show="isTabFixed"
    ></tab-control>

    <!-- 这里还是得设置高度的 因为你在用我的时候我并不知道 可滚动区域是多少 -->
    <!-- 这里相当于给 scroll组件 warpper类 高度 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scrollListen="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 当我们要监听一个组件的原生事件时 需要加上native修饰符 才能监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入分类
// 公共组件的导入放一块 子组件的导入放一块 还有其他的一些导入放一块
import HomeSwiper from "views/home/childrenComponents/HomeSwiper.vue";
import RecommendView from "./childrenComponents/RecommendView.vue";
import FeatureView from "./childrenComponents/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils";
import { itemListenerMixin, showBackTop } from "common/mixin";

export default {
  name: "Home",
  mixins: [itemListenerMixin, showBackTop],
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // 这里原本有个itemImageListener: null,的 现在它
      // 被我放到混入 mixin里面了
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    //活跃(进来)

    this.$refs.scroll.refresh(); //最好是回来的时候重新计算一次可滚动区域
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //1.离开(离开的时候记录当前滚动到的y值)
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局事件事件监听
    // --->这一切都是为了只在 hom 或 detail 是当前页面时 才监听图片加载
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  created() {
    // 一般情况下载create中只写主要逻辑
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 不要在created中使用 $refs
    // 3.监听item中图片加载完成
    // 通过debounce函数可以让refresh不被频繁调用这么多次了
    // 也就是不一一计算 积累在那里 等到我设置的delay结束后 总的计算一次
    // 这样
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // // 对监听事件进行保存
    // this.itemImageListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
  methods: {
    /* 
    事件监听相关的方法
    */
    // 防抖函数（后来它被我抽离封装到 utils.js中了
    // debounce(函数本身,单位等待时间)
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     //这个args以备函数有参数
    //     if (timer) clearTimeout(timer);

    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 通过refs拿到两个tabControl组件对象
      // 让它们两个都和最新点击的这个index保持一致就可以解决两个tabcontrol不一致的问题了
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 被我抽离到mixin中了
    // backClick() {
    //   //拿到Scroll的组件对象 this.$refs.scroll
    //   // 访问这个组件中的 scoll对象 this.$refs.scroll.scroll
    //   // 然后调用scrollTo(0,0)方法
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    //   // 后来我直接在Scroll组件中封装了一个scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    //监听滚动
    contentScroll(position) {
      // 1.判断backTop是否显示(这个函数也被我抽离到mixin中了)
      this.showBackTop(position);

      // 2.决定tabControl 是否吸顶（position : fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType); //当前记录的是谁 我就加载谁
      // finishPullUp 在下面 getHomeGoods 请求数据完成后调用
    },
    // 上拉加载更多
    // loadMore() {
    //   this.getHomeGoods(this.currentType);
    //   this.$refs.scroll.finishPullUp();
    // },

    // 监听swiper轮播图中的图片加载
    swiperImageLoad() {
      // 获取tabControl的offsetTop值(用于组件是没有offsetTop值 所以我们要获取的其实是它其中的元素的offsetTop值)
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
    网络请求相关的方法 
     */
    // 把create中的代码抽离到methods中
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      // 这里根据type 获取到对应的type的对象的page
      // 这样，在每一次调用这个方法之后，对应type的page都会+1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list); // 将请求到的数组线结构然后一个个push
        this.goods[type].page += 1; //push之后相当于有一页数据被请求下来 假设我原来是0 那现在请求下来数据了 那我的page就得+1 因为下一次请求时 得用到这个page值 不然请求到的永远还是第一页的数据

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp(); //上拉加载完成后 我要告诉它 我完成了 即可进行下一次的上拉加载
        // 个人感觉 如果这个finishPullUp方法写在 loadMore中并无不妥
      });
    },
  },
};
</script>


<style scoped>
/* 切记 这个scoped（作用域） 一定得加 不然的话当类名相同时 不同组件间的样式就会乱窜 */
#home {
  position: relative;
  /* padding-top: 44px; */
  /* vh-> viewport height(视口高度) */
  /* 100%的视口  */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  /* 因为现在我使用的是better-scroll 可以实现局部
  滚动，对我的头部毫影响 所我没有必要在进行fixed定位了
  */
  /* 下边的fixed定位是 在使用浏览器原生滚动时，
  为了让导航不跟随一起滚动
  */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
/* 用定位达到同样效果 */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-control-top {
  position: relative;
  /* z-index只对定位的元素有效果 */
  z-index: 9;
}
</style>