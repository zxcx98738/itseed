/**
* BusinessVisit.js
*
* @描述 : 企業參訪
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
          notNull: true,
          maxLength: 10
        },
        //屆數
        th: {
          type: 'integer',
          notNull: true
        },
        //參訪企業
        business: {
          type: 'string',
          notNull: true,
          maxLength: 20
        },
        //參訪日期
        date: {
          type: 'datetime'
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
        //排序
        order: {
          type: 'integer',
          autoIncrement: true
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