'use strict';

const { News } = require('../models');

const NewsCtrl = module.exports = {};

NewsCtrl.create = async (ctx) => {
    try {
        const { title, author, type, content } = ctx.request.body;
        await News.save({
            title: title || '',
            author: author || '',
            type: type || 1,
            content: content || '',
            status: 1,
            createTime: Math.round(new Date().getTime() / 1000)
        });
        ctx.body.code = 1;
    } catch (err) {
        console.error(err);
        return ctx.body.msg = '服务器异常';
    };
}

NewsCtrl.apiList = async (ctx) => {
    try {
        const options = {
            limit: 10,
            offset: 0,
            sort: {
                createTime: 'desc'
            }
        };
        const { type, pageSize, pageNo } = ctx.query;
        if (type) {
            options.where.type = type;
        }
        if (pageSize) {
            options.limit = pageSize;
        }
        if (pageNo) {
            options.offset = pageSize * pageNo;
        }
        const news = await News.findAndCountAll(options);
        ctx.body.code = 1;
        ctx.body.data = {
            news: news
        }
    } catch (err) {
        console.error(err);
        return ctx.body.msg = '服务器异常';
    };
}

NewsCtrl.list = async (ctx) => {
    return ctx.render('list', {});
}

NewsCtrl.detail = async (ctx) => {
    try {
        const { id } = ctx.params;
        const news = await News.findOne({
            where: { id: id }
        });
        return ctx.render('detail', news);
    } catch (err) {
        console.error(err);
        return ctx.body.msg = '服务器异常';
    };
}

NewsCtrl.update = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { title, author, type, content, status } = ctx.request.body;
        await News.update({
            where: { id: id },
            set: {
                title: title || '',
                author: author || '',
                type: type || 1,
                content: content || '',
                status: status || 2,
            }
        });
        ctx.body.code = 1;
    } catch (err) {
        console.error(err);
        return ctx.body.msg = '服务器异常';
    };
}