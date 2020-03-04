const redis = require('./redis');

var user = {
    getAll: id => {
        return new Promise((resolve, reject) => {
            redis.getElementById(id)
                .then(resolve)
                .catch(reject);
        });
    },
    getName: id => {
        return new Promise((resolve, reject) => {
            redis.getElementById(id)
                .then(obj => resolve(obj.name))
                .catch(reject);
        });

    },
    getPublicInfo: id => {
        return new Promise((resolve, reject) => {
            redis.getElementById(id)
                .then(obj => {
                    let publicInfo = {
                        name: obj.name,
                    };
                    resolve(publicInfo);
                })
                .catch(reject);
        });
    },
    rename: (id, name) => {
        return new Promise((resolve, reject) => {
            redis.getElementById(id)
                .then(obj => {
                    obj.name = name;
                    redis.setElementById(id, obj)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    init: id => {
        let obj = {};
        obj.name = '게스트' + Math.floor(Math.random() * 100);
        return new Promise((resolve, reject) => {
            redis.setElementById(id, obj)
                .then(resolve)
                .catch(reject);
        });
    },
    remove: id => {
        return new Promise(resolve => {
            redis.removeElementById(id)
                .then(res => resolve(true))
                .catch(err => resolve(false));
        });
    },
    exists: id => {
        return new Promise((resolve) => {
            redis.exists(id)
                .then(flag => resolve(flag));
        });
    }
};

module.exports = user;