'use strict';

const Router = require('koa-router');

const router = new Router();

router.get('/', async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index', {
      title,
    })
});

require('./sms')(router);

module.exports = router;