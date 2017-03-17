# crawler

网络爬虫
日期：2016/7/2

`crawler.js`  为爬虫慕课网课程。
此抓取为纯静态页面，不包括iframe、ajax加载的数据。

`crawler-ajax.js`  为抓取QQ音乐巅峰榜新歌前30名歌单列表，包含排名，歌名，歌手，曲长等字段。

歌曲列表为ajax加载，使用http抓取并不能获取歌曲列表的数据，使用phantom，在此引用包
[phantom]: https://github.com/amir20/phantomjs-node
,很好用。

