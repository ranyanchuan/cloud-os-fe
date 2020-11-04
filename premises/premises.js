const fs = require('fs')
const path = require('path')
const cpr = require('cpr').cpr
const rm = require('rimraf')
rm(path.resolve(__dirname, '../en/pages/loginPage/bg_new.svg'),function(){
  cpr(path.resolve(__dirname, '../premises/en/bg_new.svg'), path.resolve(__dirname, '../en/pages/loginPage/bg_new.svg'), {}, err => {
    //if (err) throw err
  });
})

rm(path.resolve(__dirname, '../tw/pages/loginPage/bg_new.svg'),function(){
  cpr(path.resolve(__dirname, '../premises/tw/bg_new.svg'), path.resolve(__dirname, '../tw/pages/loginPage/bg_new.svg'), {}, err => {
    //if (err) throw err
  });
})
