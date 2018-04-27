'use strict';

const { Model, createPool} = require('dxl-mysql');
const { mysql } = require('../../config');
const gameDb = createPool(mysql);

module.exports = {
    SmsCode: new Model(gameDb, 'sms_code'),
    Subscribe: new Model(gameDb, 'sms_subscribe'),
    Member: new Model(gameDb, 'member'),
    Wx: new Model(gameDb, 'wx'),
}