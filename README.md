# cloud os fe project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## TODO
- [ ] .babelrc add component plugin.

# 多语

1.i18n_addTags: 加上标记的源码文件，执行i18n_tool_2删除
2.i18n: 里面是需要翻译的json文件以及手动添加其他语言翻译json文件
3.en: 生成的en源码，除了语言不同，其他与src一样
4.en_US,cn_ZH: 与之前的dist目录性质相同，打包后的文件

5.export: 导出所有的.cn.i18n 或者 .en.i18n文件
6.import: 将翻译的文件对应生成.en.i18n
7.os_fe1.xlsx: 翻译人员给的翻译后的文件

# 全局变量


2. _LIMITTIP_		ftl字段， 此字段有值的话， 会跳转limit路由
3. _IUAPPREMISESFLAG	专属华标示， true为专属云
4. window.name  此window窗户定义的name值
5. _initCb_  mdf初始化完成标示
6. _MDFLOADING_		mdf等待loading标示
7. cbReady   mdf加载完成后的全局函数
8. diworkTools		工作台提供的一个简单的tool工具
9. cb			mdf的全局变量
10. os_fe_isLogin		ftl上登录状态
11. getCurrentLangCode		ftl上 当前语种
12. getUserInfo   ftl上获取用户信息
13.	HelpcentSdk		专属云帮助中心的全局sdk变量
14. isHubbleRecordStarted		集成技术中台录制能力的方法
15. stopRecordHubble		集成技术中台录制能力的方法
16. startRecordHubble		集成技术中台录制能力的方法
17. onGroupUpdatedType	集成IM的window变量存储
18. onUnReadedNumChangedType	集成IM的window变量存储
19. licenseErrorMsg  专属云的错误提示语
20. getSystemConfigs	ftl 获取是否第一次打开
21. AnalysysAgent			易观sdk



# 前端缓存变量
1. _LOSEPAYLOAD_ 防止多页打开多次请求心跳接口
2. TABS_DATA		缓存的打开过的页签， 为了做浏览器刷新操作
3. openServiceData
4. openServiceType
5. _PERSISTSERVICEDATA
6. defaultDesktop
