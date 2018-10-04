const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/pinduoduo', {
    useNewUrlParser: true
});

/**
 * 映射 d 文件夹下的文件为模块
 */
const mapDir = d => {
    const tree = {mongoose}

    // 获得当前文件夹下的所有的文件夹和文件
    const [dirs, files] = _(fs.readdirSync(d)).partition(p => fs.statSync(path.join(d, p)).isDirectory())
    // 映射文件夹
    dirs.forEach(dir => {
        tree[dir] = mapDir(path.join(d, dir))
    })

    // 映射文件
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            let name = path.basename(file, '.js');
            const fun = require(path.join(d, file));
            if (name !== 'index')
                tree[name.substring(0, 1).toUpperCase() + name.substring(1)] = fun(mongoose);
        }
    })

    return tree
}

// 默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname))
