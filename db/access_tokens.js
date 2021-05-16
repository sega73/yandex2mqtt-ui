'use strict';

const {logger, authl} = global;
const loki = require('lokijs');

global.dbl = new loki('./loki.json', {
    autoload: true,
    autosave: true,
    autosaveInterval: 5000,
    autoloadCallback() {
        authl = global.dbl.getCollection('tokens');
        if (authl === null) {
            authl = global.dbl.addCollection('tokens');
        }
    }
});

module.exports.find = (key, done) => {
    const ltoken = authl.findOne({'token': key});
    if (ltoken){
        const {userId, clientId} = ltoken;
        return done(null, {userId, clientId})
    } else {
        logger.log('error', new Error('Token Not Found'));
        return done();
    }  
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
    const ltoken = authl.findOne({'userId': userId});
    if (ltoken){
        logger.log('info', {message: `Load token by userId (${userId}): User found`});
        const {token, userId: uid, clientId: cid} = ltoken;
        if (uid === userId && cid === clientId) {
            return done(null, token);
        } else {
            logger.log('error', new Error('Token Not Found'));
            return done();
        }
    } else {
        logger.log('error', new Error('User Not Found'));
        return done();
    }  
};

module.exports.save = (token, userId, clientId, done) => {
    logger.log('info', {message: `Start saving token`});
    const ltoken = authl.findOne({'userId': userId});
    if (ltoken){
        logger.log('info', {message: `User Updated`});
        authl.update(Object.assign({}, ltoken, {token, userId, clientId}));
    } else {
        logger.log('info', {message: `User not Found. Create new...`});
        authl.insert({'type': 'token', token, userId, clientId});
    }
    done();
};

/* works */
