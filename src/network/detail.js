import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// es6定义class
// 下边将使用构造函数
// constructor -> 构造器

export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.discountColor = itemInfo.discountBgColor
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

// export class Goods {
//     constructor(itemInfo,columns,services){
//         this.title = itemInfo.title;
//         this.desc = itemInfo.desc;
//         this.newPrice = itemInfo.price;
//         this.oldPrice = itemInfo.oldPrice;
//         this.discount = itemInfo.discountDesc;
//         this.columns = columns;
//         this.services = services;
//         this.realPrice = itemInfo.lowNowPrice

//     }
// }
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

// 获取热门数据
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}
