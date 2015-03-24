/**
* News.js
*
* @描述 : 最新消息
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
          maxLength: 30,
          notNull: true
        },
        //內容
        content: {
          type: 'text',
          notNull: true
        },
        //顯示
        visible: {
          type: 'boolean',
          defaultsTo: true
        },
        //發佈時間
        launchAt: {
          type: 'datetime'
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