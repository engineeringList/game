'use strict';

const { NewsCtrl } = require('../app/controller');

module.exports = (router) => {
    router.get('/news', NewsCtrl.list); // 列表页
    router.get('/news/:id', NewsCtrl.detail);   // 详情页
    router.put('/api/news/:id', NewsCtrl.update);   // 修改文章接口
    router.post('/api/news', NewsCtrl.create);  // 新增文章接口
    router.get('/api/news', NewsCtrl.apiList);  // 获取文章列表接口
};