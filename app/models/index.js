'use strict';

const { Model } = require('dxl-mysql');
const gameDb = require('./db');

module.exports = {
    SmsCode: new Model(gameDb, 'sms_code'),
    Subscribe: new Model(gameDb, 'sms_subscribe'),
    Member: new Model(gameDb, 'member'),
    Wx: new Model(gameDb, 'wx'),    
    User: new Model(gameDb, 'user'),    
    News: new Model(gameDb, 'news'),    
}