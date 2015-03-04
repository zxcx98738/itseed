/**
* RegInfo.js
*
* @描述 : 報名資訊
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
        //標題
        title: {
          type: 'string',
          maxLength: 10,
          notNull: true
        },
        //內容
        content: {
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