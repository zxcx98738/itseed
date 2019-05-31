/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    let nowTime = new Date();
    let openTime = new Date('2019/5/31');
    if (nowTime > openTime){
        return next();
    }else{
        return res.redirect(`/regInfo?hint=true`);
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
};