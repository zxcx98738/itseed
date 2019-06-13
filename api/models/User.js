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
        gIdToken:{
          type: 'string',
          defaultsTo: null
        },
        finished : {
          type: 'integer'
        },
        //信箱
        email: {
          type: 'email',
          required: true,
          unique: true
        },
        isEmailAuth : {
          type: 'integer',
          defaultsTo: 0
        },
        //密碼
        pwd: {
          type: 'string',
          defaultsTo: null
        },
        //連絡電話
        phone: {
          type: 'string',
          maxLength: 20
        },
        //真實姓名
        name: {
          type: 'string',
          maxLength: 40,
        },  
        //性別 男:M, 女:F
        gender: {
          type: 'string',
          minLength: 1,
          maxLength: 1,
        },
        // 是否驗證
        isEmailAuth : {
          type: 'integer',
          defaultsTo: 0
        },
        //就讀學校
        school : {
          type: 'string',
          maxLength: 40,
        },
        //系所
        dept : {
          type: 'string',
          maxLength: 40,
        },        
        //年級
        grade : {
          type: 'string',
          maxLength: 20,
        },
        //推薦人
        reference : {
          type: 'string',
          maxLength: 20
        },
        //管道
        survey : {
          type: 'string',
          maxLength: 40
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
          // defaultsTo: 'A',
          defaultsTo: 'U',
        },
        //報名屆數
        th: {
          type: 'integer'
        },
        //DISC
        disc: {
          model: 'UserDISC'
        },
        form: {
          model: 'User_Form'
        },
        //報名資料
        files: {
          model: 'UserFiles'
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


