'use strict';

const { SubscribeCtrl } = require('../app/controller');

module.exports = (router) => {
    router.get('/admin/subscribe', SubscribeCtrl.wave);
    router.get('/admin/subscribe/list', SubscribeCtrl.list);
    router.get('/api/subscribe/count', SubscribeCtrl.count);
};