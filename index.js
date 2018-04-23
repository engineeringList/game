'use strict';

const Koa = require('koa');
const views = require('koa-views');
const compress = require('koa-compress');
const path = require('path');
const app = new Koa();

// gzip
const options = { threshold: 2048 };
app.use(compress(options));

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  ctx.body = {
    code: -1,
    msg: '',
    data: '',
  };
  await next();
});

const router = require('./router');
app.use(router.routes());


app.listen(3000, () => {
  console.log('starting at port 3000');
});