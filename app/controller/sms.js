'use strict';

const util = require('util');
const { SmsCode, Subscribe } = require('../models');
const sms = require('../lib/sms');

const SmsCtrl = {};

SmsCtrl.send = async (ctx) => {
    const { mobile, type } = ctx.query;
    if (!isMobile(mobile)) {
        ctx.body.code = -2;
        ctx.body.msg = '手机号不正确';
        return 
    }
    const code = util.format('%d0000', Math.floor(Math.random() * 9999)).substr(0, 4);
    console.log(code)
    try {
        const options = {
            where: {
                mobile: mobile
            }
        };
        const subUser = await Subscribe.findOne(options);
        if (Object.keys(subUser).length) {
            ctx.body.code = -3;
            ctx.body.msg = '该手机号已经预约';
            return 
        }
        const user = await SmsCode.findOne(options);
        if (!Object.keys(user).length) {
            await SmsCode.save({
                mobile: mobile,
                code: code,
                time: Math.round(new Date().getTime() / 1000)
            });
        } else {
            // 已存在
            await SmsCode.update({
                where: {
                    mobile: mobile
                },
                set: {
                    code: code,
                    time: Math.round(new Date().getTime() / 1000)
                }
            })
        }
        await sms.send(mobile, 'SMS_133001437', `{code: '${code}'}`);
        ctx.body.code = 1;
        ctx.body.msg = '发送成功';
    } catch (err) {
        console.log(err)
        ctx.body.msg = '服务器异常';
    };
}

SmsCtrl.subscribe = async (ctx) => {
    const { mobile, code, type } = ctx.query;
    if (!isMobile(mobile)) {
        ctx.body.code = -2;
        ctx.body.msg = '手机号不正确';
        return 
    }
    if (type != 1 && type != 2) {
        ctx.body.code = -3;
        ctx.body.msg = '类型有误';
        return 
    }
    try {
        const user = await SmsCode.findOne({
            where: {
                mobile: mobile
            }
        });
        if (!Object.keys(user).length) {
            ctx.body.code = -4;
            ctx.body.msg = '请先获取验证码';
            return 
        } 
        const time = Math.round(new Date().getTime() / 1000) - user.time;
        if (time > 60) {
            ctx.body.code = -5;
            ctx.body.msg = '超过有效时间';
            return 
        }
        if (code != user.code) {
            ctx.body.code = -6;
            ctx.body.msg = '验证码无效';
            return 
        }
        await Subscribe.save({
            mobile: mobile,
            type: type,
            time: Math.round(new Date().getTime() / 1000)
        });
        await sms.send(mobile, 'SMS_133150100', `{code: '${code}'}`);
        ctx.body.code = 1;
        ctx.body.msg = '预约成功';
    } catch (err) {
        console.log(err)
        ctx.body.msg = '服务器异常';
    };
}

module.exports = SmsCtrl;

const isMobile = (mobile) => {
    let reg = /^1[1-9]\d{9}$/;
    return mobile ? !!(mobile.toString().match(reg)) : false;
};