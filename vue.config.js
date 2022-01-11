module.exports={
    publicPath:"./",
    outputDir:"dist",
    runtimeCompiler:true,//允许使用模板语法
    assetsDir:"static",
    devServer:{
        host:'localhost',
        port:8089,
        open:true,
        // proxy:{
        //     "/":{
        //         target:" http://47.115.51.185:8081/playlist/detail",
        //         changeOrigin:true
        //     }
        // }
    }
}