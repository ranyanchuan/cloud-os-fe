
var lanbuild  = require("lanbuild");
var path = require('path');
var fs = require("fs");

//以下的文件不可以缺少
var type = process.argv[2]*1;
//根据具体的项目可以修改
var basepath = path.join(__dirname,'../src');//根目录,也是en，tw资源生成的目录
var enDir = path.join(__dirname,'../os_fe.xlsx'); //翻译人员翻译完成
var twDir = path.join(__dirname,'../os_fe_tw.xlsx'); //翻译人员翻译完成


//不需要修改
var i18n_addTags = path.join(__dirname,'../i18n_addTags');//生成的1，不需要修改
var i18n_ = path.join(__dirname,'../i18n');//生成2，不需要修改
var defaultDir = path.join(__dirname,'../default.xlsx'); //生成3，不需要修改
var enDirNew = path.join(__dirname,'../osfe_new_en.xlsx'); //生成4，不需要修改
var twDirNew = path.join(__dirname,'../osfe_new_tw.xlsx'); //生成5，不需要修改

var codePath = path.join(i18n_,'/');//src下代码具体存放的目录

var outPutObj = {
    en:{
        dir:enDir,
        dirNew:enDirNew,
    },
    tw:{
        dir:twDir,
        dirNew:twDirNew,
    }
}

//下面是三个工程特别的地方就在于addTags的区别

var managerAddTagsReg = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[0-9]|[\?\,\。\.\、\/])*/g;
var appStoreAddTagsReg = /[\u4E00-\u9FA5]+([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[0-9]|[\?\,\。\.\、])*/g;
var osfeAddTagsReg =  /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[0-9]|[\?\,\。\.\、\|\/])*/g; 

// 新增删除en和tw文件夹功能
function deleteFolderRecursive(url) {
    var files = [];
    if (fs.existsSync(url)) {
      files = fs.readdirSync(url);
      files.forEach(function (file, index) {
  
        var curPath = path.join(url, file);
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
  
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(url);
    } else {
      console.log("给定的路径不存在，请给出正确的路径");
    }
  }
  
  if(type == 2){
      var enPath = path.join(__dirname, '../en');
      var twPath = path.join(__dirname, '../tw');
      deleteFolderRecursive(enPath);
      deleteFolderRecursive(twPath);
  }

lanbuild({type,
    basepath,
    i18n_addTags,
    i18n_,
    // enDir,
    // twDir,
    defaultDir,
    // enDirNew,
    // twDirNew,
    outPutObj,
    codePath,
    addTagsReg:osfeAddTagsReg
});
