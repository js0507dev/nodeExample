const db = require('redis');
const client = db.createClient();

var redis = {
    getElementById: id => {
        return new Promise((resolve, reject) => {
            client.hgetall(id, (err, obj) => {
                if(err) {
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    setElementById: (id, obj) => {
        return new Promise((resolve, reject) => {
            client.set(id, obj, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    removeElementById: id => {
        return new Promise((resolve, reject) => {
            client.del(id, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    exists: id => {
        return new Promise((resolve) => {
            client.exists(id, resolve);
        });
    }
};

module.exports = redis;