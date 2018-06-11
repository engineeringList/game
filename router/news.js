'use strict';

const { NewsCtrl } = require('../app/controller');

module.exports = (router) => {
    router.get('/news', NewsCtrl.list);
    router.get('/news/:id', NewsCtrl.detail);
    router.put('/api/news/:id', NewsCtrl.update);
    router.post('/api/news', NewsCtrl.create);
    router.get('/api/news', NewsCtrl.apiList);
};