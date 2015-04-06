/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        
        id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        //帳號
        account: {
          	type: 'string',
          	minLength: 6,
          	maxLength: 20,
          	required: true,
          	unique: true
        },
        //密碼
        pwd: {
          	type: 'string',
          	minLength: 24,
          	maxLength: 40,
          	required: true
        },
        //名字
        name: {
          type: 'string',
          maxLength: 20,
          required: true
        },
        //E-mail
        email: {
          type: 'email',
          maxLength: 50,
          required: true,
          unique: true
        },
        //家裡電話
        phone: {
          type: 'string',
          maxLength: 10
        },
        //手機號碼
        cellphone: {
          type: 'string',
          maxLength: 10
        },
        // 性別 男:M, 女:F
        gender: {
          	type: 'string',
          	minLength: 1,
          	maxLength: 1,
          	required: true
        },
        //就讀學校
        school : {
          type: 'string',
          maxLength: 20,
          required: true
        },
        //就讀科系/年級
        grade : {
          type: 'string',
          maxLength: 20,
          required: true
        },
        //大頭貼路徑
        photo: {
            type: 'string',
            maxLength: 25,
            defaultsTo: '/images/default.png'
        },
        //會員種類 U:一般會員, A:後臺管理者
        type: {
          	type: 'string',
          	minLength: 1,
          	maxLength: 1,
          	required: true
        },
        //推薦人
        reference : {
          type: 'string',
          maxLength: 20                   
        },
        //報名屆數
        th : {
          type: 'integer',
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