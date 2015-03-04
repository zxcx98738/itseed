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
        //課程名稱
        courseTitle: {
          type: 'string',
          notNull: true,
          maxLength: 30
        },
        //講者
        speaker: {
          type: 'string',
          notNull: true,
          maxLength: 10
        },
        //講者頭銜
        speakerTitle: {
          type: 'string',
          notNull: true,
          maxLength: 10
        },
        //課程日期
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