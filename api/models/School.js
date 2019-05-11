/**
* Faq.js
*
* @描述 : 常見問題
* @文件 : http://sailsjs.org/#!documentation/models
* 
*/ 

module.exports = {

    tableName: 'school',
    attributes: {
        id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        //排序
        school: {
          type: 'string',
        },
        //狀態  D:草稿, P:已發佈
        dept: {
          type: 'string',
        }
    }
};