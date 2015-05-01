/**
* Faq.js
*
* @描述 : 常見問題
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
        //分類
        type: {
          type: 'string',
          maxLength: 20,
          notNull: true
        },
        //問題
        question: {
          type: 'string',
          maxLength: 50,
          notNull: true
        },
        //回答
        answer: {
          type: 'text',
          notNull: true
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