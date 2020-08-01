var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var config = {
  mode:"development",
  devtool: "cheap-module-source-map",
  entry: './src/main.js',
  output: {
    'path':path.join(__dirname,'dist'),
    'publicPath':'',
    'filename':'./script/index.js'
  },
  resolve: {  
    extensions: ['.js','.ts','.vue'],
  },
  module: {
    rules: [
     {test: /\.(ts|js)$/, use: [{loader:'babel-loader'}], exclude:'/node_modules/'},
     {test: /\.vue$/, use: [{loader:'vue-loader'}], exclude:'/node_modules/'},
     {test: /\.(css|less)$/, use: ['style-loader','css-loader','less-loader']},
     {test: /\.html$/, use: 'html-loader'}
    ]
  },
  devServer:{
    inline: true,
    hot: true,
    contentBase: false,
    host: 'localhost',
    port:'3000',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
var htmlfile = glob.sync('src/**/*.html'),conf={};
htmlfile.forEach(function(item,index,arr){
  var extname = path.extname(item);
  var basename = path.basename(item,extname);
  var conf = {
    filename:'../dist/'+item.replace(/^src\//,''),
    template:'./'+item,
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})


module.exports = config;

function getEntry(globPath,common=[]){
  var files = glob.sync(globPath),entries={};
  files.forEach(function(item,index,arr){
    const c = [...common]
    var extname = path.extname(item);
    var basename = path.basename(item,extname);
    c.push('./'+item);
    entries[basename] = c;
  })
  console.log(entries)
  return entries;
}