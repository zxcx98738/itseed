/**
* Sharing.js
*
* @描述 : 心得分享
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
        //名字
        name: {
          type: 'string',
          notNull: true,
          maxLength: 10
        },
        //相片
        photo: {
          type: 'string',
          notNull: true,
          maxLength: 30.
          //defaultsTo: 
        },
        //屆數
        overseaName: {
          type: 'string',
          notNull: true,
          maxLength: 30
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
        //標籤
        tags: {
          type: 'string'
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