const fs = require('fs')
const path = require('path')
const cpr = require('cpr').cpr

let iconFontPath = path.resolve(__dirname, '../zh_CN/css/iconfont');
if(!iconFontPath){
    fs.mkdirSync(iconFontPath);
}
cpr(path.resolve(__dirname, '../premises/iconfont'), iconFontPath, {}, err => {
  //if (err) throw err
});

let assetsPath = path.resolve(__dirname, '../zh_CN/assets2');
if(!assetsPath){
    fs.mkdirSync(assetsPath);
}
cpr(path.resolve(__dirname, '../premises/assets2'), assetsPath, {}, err => {
  //if (err) throw err
});


// let staticPath = path.resolve(__dirname, '../zh_CN/static');
// if(!staticPath){
//     fs.mkdirSync(staticPath);
// }
// cpr(path.resolve(__dirname, '../premises/static'), staticPath, {}, err => {
//   //if (err) throw err
// });

let mainZhPath = path.resolve(__dirname , '../zh_CN/css/main.css'); 
let mainZhStr = fs.readFileSync(mainZhPath);
mainZhStr = mainZhStr.toString().replace(/\/\/design.yonyoucloud.com\/static\//g,'./')
fs.writeFileSync(mainZhPath, mainZhStr);

console.log(iconFontPath + 'cdn change success');