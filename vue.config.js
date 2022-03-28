module.exports = {
    configureWebpack: {
        resolve: {
            // extensions:[],//这里可以通过配置省略后缀名 比如说 .js .vue .json等
            alias: {
                // '@':'src',//其实内部已经配置过这个别名了
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'store': '@/store'
            }
        }
    }
}