/**
* Project.js
*
* @描述 : 專案實作
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
        //屆數
        th: {
          type: 'integer',
          notNull: true
        },
        //專案名稱
        projectName: {
          type: 'string',
          notNull: true,
          maxLength: 20
        },
        //圖片名稱
        picName: {
          type: 'string',
          notNull: true,
          maxLength: 30
        },
        //圖片位置
        source: {
          type: 'string',
          notNull: true,
          maxLength: 30
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