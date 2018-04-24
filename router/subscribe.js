'use strict';

const { SubscribeCtrl } = require('../app/controller');

module.exports = (router) => {
    router.get('/admin/subscribe', SubscribeCtrl.wave);
};