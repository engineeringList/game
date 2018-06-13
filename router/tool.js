'use strict';

const { ToolCtrl } = require('../app/controller');

module.exports = (router) => {
    router.get('/api/tool/qiniu', ToolCtrl.qnToken);
};