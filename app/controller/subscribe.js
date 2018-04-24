'use strict';

const { Subscribe } = require('../models');

const SubscribeCtrl = {};

SubscribeCtrl.wave = async (ctx) => {
    let abscissa = [];
    let values = [];
    const data = await Subscribe.query('select date, count(date) as count from `sms_subscribe` group by date');
    for (let obj of data) {
        abscissa.push(obj.date);
        values.push(obj.count);
    }
    ctx.body.data = {
        abscissa: abscissa,
        values: values
    };
    ctx.body.code = 1;
}

module.exports = SubscribeCtrl;