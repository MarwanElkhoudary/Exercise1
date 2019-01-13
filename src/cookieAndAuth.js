const { parse } = require ('cookie');
const {sign, verify } = require ('jsonwebtoken');
require('env2')('./config.env');

const createCookie = (userId, cb) => {

    const data = {
        id : userId
    }

    sign(data, process.env.SECRET, (err, result) => {

        if (err) {

            cb(err);

        }else {

            cb(null, result);

        }
    })
}

const authCheck = (request, cb) => {

    if (!request.headers.cookie) return cb(new TypeError());

    const { sign } = parse(request.headers.cookie);

    if (!data) return cb(new TypeError());

    verify(data, process.env.SECRET, (err, data)=>{

        if (err) return cb(new TypeError());

        console.log(date);

        cb(null, data);

    })
}

module.exports = { createCookie, authCheck }