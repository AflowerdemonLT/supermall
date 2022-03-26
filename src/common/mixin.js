import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
            refresh: null
        }
    },
    mounted() {
        // 不要在created中使用 $refs

        // 3.监听item中图片加载完成
        // 通过debounce函数可以让refresh不被频繁调用这么多次了
        // 也就是不一一计算 积累在那里 等到我设置的delay结束后 总的计算一次
        // 这样
        this.refresh = debounce(this.$refs.scroll.refresh, 200);

        // // 对监听事件进行保存
        this.itemImageListener = () => {
            this.refresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImageListener);
        // console.log("我是混入");
    }
}

export const showBackTop = {
    data() {
        return {
            isShowBackTop: false,

        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        showBackTop(position) {
            this.isShowBackTop = -position.y > 1000;
        },
    }
}