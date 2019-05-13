/**
* User.js
*
* @描述 : 使用者
* @文件 : http://sailsjs.org/#!documentation/models
* 
*/ 

module.exports = {

    attributes: {
        id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        Q1: {
          type: 'text',
        },
        Q2: {
          type: 'text',
        },
        Q3: {
          type: 'text',
        },
        Q4: {
          type: 'text',
        },
        Q5_1: {
          type: 'text',
        },
        Q5_2: {
          type: 'text',
        },
        Q6: {
          type: 'text',
        },
        user: {
          model:'User'
        },
        finished: {
          type: 'integer'
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


