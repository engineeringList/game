'use strict';

const Router = require('koa-router');

const router = new Router();

router.get('/', async ( ctx ) => {
    await ctx.render('index', {});
});

require('./sms')(router);

module.exports = router;