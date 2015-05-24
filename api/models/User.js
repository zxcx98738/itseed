/**
* User.js
*
* @描述 : 使用者
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
        //信箱
        email: {
          type: 'email',
          required: true,
          unique: true
        },
        //密碼
        pwd: {
          type: 'string'
        },
        //連絡電話
        phone: {
          type: 'string',
          maxLength: 20
        },
        //真實姓名
        name: {
          type: 'string',
          maxLength: 10,
        },  
        //性別 男:M, 女:F
        gender: {
          type: 'string',
          minLength: 1,
          maxLength: 1,
        },
        //就讀學校
        school : {
          type: 'string',
          maxLength: 20,
        },
        //系所/年級
        grade : {
          type: 'string',
          maxLength: 20,
        },
        //推薦人
        reference : {
          type: 'string',
          maxLength: 20                   
        },
        //大頭貼
        photo: {
          type: 'string',
          defaultsTo: '/images/layout/logo.png'
        },
        //會員種類 U:一般會員, A:後臺管理者
        type: {
          type: 'string',
          minLength: 1,
          maxLength: 1,
          defaultsTo: 'U'
        },
        //報名屆數
        th: {
          type: 'integer'
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
    /*validationMessages: {
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
        required : 'email為必要欄位',
        email: '請填寫有效的email',
        maxLength: 'email的最大長度限制為50個字元',
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
    }*/
};


