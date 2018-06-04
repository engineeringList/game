'use strict';

const gameDb = require('./db');
const { Model } = require('dxl-mysql');
const User = new Model(Db, 'user');

module.exports = User;