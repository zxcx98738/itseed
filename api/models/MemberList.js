/**
* MemberList.js
*
* @描述 : 歷屆名單
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
        author: {
          model:'User'
        },
        name: {
          type: 'string',
          notNull: true
        },
        class:{
          type: 'integer',
          notNull: true
        },
        //標題
        school: {
          type: 'string',
          notNull: true
        },
        //內容
        dep: {
          type: 'string',
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