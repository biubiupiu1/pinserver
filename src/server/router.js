import express from 'express'

const controllers = require('./controllers');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
});

/**
 * /api/login wechat登录
 * @param {string} code wechat code.
 * @param {object} userInfo 用户信息.
 */
router.post('/api/login', controllers.wechat.login);

/**
 * /api/admin/login 后台登录
 * @param {string} username 用户名.
 * @param {string} password 密码.
 */
router.post('/api/admin/login', controllers.admin.login);

/**
 * /api/getgoods 获取商品数目
 * @param {Number} limit 获取的数目.
 */
router.post('/api/getgoods', controllers.public.getGoods);

/**
 * /api/addgoods 添加商品
 * @param {string} title 商品标题.
 * @param {string} content 商品介绍.
 * @param {number} price 商品价格.
 * @param {string} imaPath 图片路径.
 * @param {object} user 用户信息.
 */
router.post('/api/addgoods', controllers.admin.addGoods);

/**
 * /api/upload 上传图片
 * @param {stream}  图片数据流.
 */
router.post('/api/upload', controllers.public.upload);


export default router
