'use strict';

const { Subscribe } = require('../models');

const LoginCtrl = {};

LoginCtrl.index = async (ctx) => {
    try {
        console.log(ctx.request.body)
        const { userName, password } = ctx.request.body;
        ctx.body.code = 1;
    } catch (err) {
        console.log(err);
        return ctx.body.msg = '服务器异常';
    };
}

module.exports = LoginCtrl;