/**
* CourseInfo.js
*
* @描述 : 講座課程
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
        //作者ID
        /*author: {
          model:'User'
        },*/
        //屆數
        th: {
          type: 'integer',
          required: true,
        },
        //講者
        speaker: {
          type: 'string',
          required: true,
          maxLength: 10
        },
        //講者頭銜
        speakerTitle: {
          type: 'string',
          required: true,
          maxLength: 10
        },
        //照片
        photo: {
          type: 'string',
          defaultsTo: '/images/courseInfo/default.png'
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
        //排序
        order: {
          type: 'integer',
          autoIncrement: true
        },
        //狀態  D:草稿, P:已發佈
        status: {
          type: 'string',
          minLength: 1,
          maxLength: 1,
          required: true
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