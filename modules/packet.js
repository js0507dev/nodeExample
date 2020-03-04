var packet = {
    makePacket: (user, msg) => {
        let packet = user;
        packet.msg = msg;
        return new Promise(resolve => {
            resolve(JSON.stringify(packet));
        })
    },
    parsePacket: packet => {
        return new Promise(resolve => {
            resolve(packet);
        })
    },
};

module.exports = packet;