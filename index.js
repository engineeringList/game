'use strict';

const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const cors = require('koa2-cors');
const views = require('koa-views');
const morgan = require('koa-morgan');
const _static = require('koa-static');
const compress = require('koa-compress');

const app = new Koa();

// 跨域
app.use(cors());

// 静态文件
app.use(_static(
    path.join( __dirname,  './static')
));

// log
app.use(morgan('combined'));

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

// 适配移动端
app.use(async (ctx, next) => {
    const _ctx = Object.assign({}, ctx);
    const deviceAgent = ctx.request.header['user-agent'].toLowerCase();
    const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    ctx.render = async (view, options) => {
      if (agentID) {
          view = view + '-m';
      } else {
          view = view + '-p';
      }
      return _ctx.render(view, options)
    }
    await next();
})

const router = require('./router');
app.use(router.routes());

app.listen(3000, () => {
  console.log('starting at port 3000');
});