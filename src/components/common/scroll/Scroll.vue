<template>
  <!-- ref -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // 为了保险起见 用逻辑与 先判断 有无scroll对象 再进行对象方法的调用
      // 因为scroll对象是在 mounted 组件挂载阶段调用的 有可能你在使用它的
      // 时候，组件尚未挂载 那么scroll 就尚未创建 这样将因为无法调用它内部法方法
      // 而报错
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("------");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    // 切记：
    /* 
    <!-- 1.无论是否设置 click：true ，button都可以点击 -->
      <button @click="btnClick">按钮</button>
      <!-- 2.必须设置 click：true 那么div才能监听点击 -->
      <div @click="divClick">哈哈哈</div>
     */
    // 1.创建scroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 是否实时监听滚动
      probeType: this.probeType, //由于不是所有用到我的组件都需要实时监听 所以 这个是否进行实时监听的决定权 就交给使用者
      click: true,
      pullUpLoad: this.pullUpLoad, //是否上拉加载，决定权交给使用者
    });

    // 2.监听滚动位置(前面的这个if纯属为了严谨)
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        // 发送自定义事件
        this.$emit("scrollListen", position);
      });
    }

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style scoped>
</style>
