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
        userName: {
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
          maxLength: 10,
          unique: true
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
            maxLength: 50,
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
    },

    //驗證使用者輸入的值
    validationMessages: {
    account: {
      required: '帳號為必要欄位',
      minLength: '帳號的長度限制為:6~20個字元',
      maxLength: '帳號的長度限制為:6~20個字元',
      unique: '帳號已存在'
    },
    pwd: {
      required: '密碼為必要欄位'      
    },
    userName: {
      required : '姓名為必要欄位',
      maxLength: '姓名的最大長度限制為20個字元'
    },
    email: {
      required : 'e-mail為必要欄位',
      maxLength: 'e-mail的最大長度限制為50個字元',
      unique: '信箱已存在'
    },
    phone: {      
      maxLength: '電話格式錯誤'
    },
    cellphone: {
      required : '手機號碼為必要欄位',
      maxLength: '手機號碼格式錯誤'
    },
    school: {
      required : '就讀學校為必要欄位',
      maxLength: '就讀學校資料錯誤'
    },
    grade: {
      required : '就讀科系/年級為必要欄位',
      maxLength: '就讀科系/年級資料錯誤'
    },
    reference: {      
      maxLength: '推薦人資料錯誤'
    }
  }
};


