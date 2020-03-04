const app = require('../app');
const user = require('./user');
const packet = require('./packet');
const io = app.io;

var socket = {
    run: () => {
        io.on('connection', socket => {
            user.init(socket.id);
            user.getName(socket.id)
                .then(name => {
                    io.emit('system', '('+name+') 님이 입장했습니다.');
                    console.log('connected => '+socket.id);
                })
                .catch(err => {
                    console.error(err);
                    socket.disconnect();
                });

            socket.on('chatMessage', msg => {
                user.getPublicInfo(socket.id)
                    .then(publicInfo => {
                        socket.emit(
                            'chatMessage',
                            packet.makePacket(publicInfo, msg)
                        );
                    })
                    .catch(err => {
                        socket.emit('system', '오류가 발생하여 연결이 끊어집니다.');
                        user.remove(socket.id);
                        socket.disconnect();
                        console.error(err);
                    });
            });

            socket.on('rename', data => {
                user.getName(socket.id)
                    .then(oldName => {
                        let parsedPacket = packet.parsePacket(data);
                        user.rename(socket.id, parsedPacket.newName)
                            .then(res => {
                                io.emit('system', '('+oldName+' => '+parsedPacket.newName+')');
                            })
                            .catch(console.error);
                    })
                    .catch(err => {
                        socket.emit('system', '사용자 정보가 없습니다.');
                        socket.disconnect();
                        console.error(err);
                    });
            });

            socket.on('forceDisconnect', () => {
                socket.disconnect();
            });
            socket.on('disconnect', () => {
                user.getName(socket.id)
                    .then(name => {
                        user.remove(socket.id)
                            .catch(console.error);
                        io.emit('system', '('+name+') 님이 퇴장했습니다.');
                        console.log("disconnected => "+socket.id);
                    })
                    .catch(console.error);
            });
        });
    }
};

module.exports = socket;
