'use strict';

const loki = require('lokijs');

global.dbl = new loki('./loki.json', {
    autoload: true,
    autosave: true,
    autosaveInterval: 5000,
    autoloadCallback() {
        global.authl = global.dbl.getCollection('tokens');
        if (global.authl === null) {
            global.authl = global.dbl.addCollection('tokens');
        }
    }
});

module.exports.find = (key, done) => {
    const ltoken = global.authl.findOne({'token': key});
    if (ltoken){
        const {userId, clientId} = ltoken;
        return done(null, {userId, clientId})
    } else {
        global.logger.log('error', {message: `${new Error('Token Not Found')}`});
        return done();
    }  
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
    const ltoken = global.authl.findOne({'userId': userId});
    if (ltoken){
        global.logger.log('info', {message: `Load token by userId (${userId}): User found`});
        const {token, userId: uid, clientId: cid} = ltoken;
        if (uid === userId && cid === clientId) return done(null, token);
        else return done(new Error('Token Not Found'));
    } else {
        console.log('User not found');
        return done(new Error('User Not Found'));
    }  
};

module.exports.save = (token, userId, clientId, done) => {
    global.logger.log('info', {message: `Start saving token`});
    const ltoken = global.authl.findOne({'userId': userId});
    if (ltoken){
        global.logger.log('info', {message: `User Updated`});
        global.authl.update(Object.assign({}, ltoken, {token, userId, clientId}));
    } else {
        global.logger.log('info', {message: `User not Found. Create new...`});
        global.authl.insert({'type': 'token', token, userId, clientId});
    }
    done();
};

/* works */
