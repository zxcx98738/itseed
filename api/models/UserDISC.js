/**
* UserDISC.js
*
* @描述 : DISC
* @文件 : http://sailsjs.org/#!documentation/models
* 
*/

module.exports = {

    attributes: {
        a1: {
          type:'string'
        },
        a2: {
          type:'string'
        },
        a3: {
          type:'string'
        },
        a4: {
          type:'string'
        },
        finished: {
          // model:'User'
          type:'integer'
        },
        id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        q1 : {
          type: 'integer'
        },
        q2 : {
          type: 'integer'
        },
        q3 : {
          type: 'integer'
        },
        q4 : {
          type: 'integer'
        },
        q5 : {
          type: 'integer'
        },
        q6 : {
          type: 'integer'
        },
        q7 : {
          type: 'integer'
        },
        q8 : {
          type: 'integer'
        },
        q9 : {
          type: 'integer'
        },
        q10 : {
          type: 'integer'
        },
        //使用者
        user: {
          model:'User'
        },
        animal: {
          // model:'User'
          type:'string'
        },
        //建立時間
        createdAt: {
          type: 'datetime'
        },
        //修改時間
        updatedAt: {
          type: 'datetime'
        }
    }
};