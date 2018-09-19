import express from 'express'
const controllers = require('./controllers');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

/**
 * /api/login 后台登录
 * @param {string} username 用户名.
 * @param {string} password 密码.
 */
router.post('/api/login', controllers.login);

export default router
