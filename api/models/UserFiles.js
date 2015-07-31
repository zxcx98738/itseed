/**
* UserFiles.js
*
* @描述 : 報名資料
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
        //報名表
        registration : {
          type: 'string'
        },
        //報名表上傳時間
        registrationUT : {
          type: 'datetime'
        },
        //自傳
        autobiography : {
          type: 'string'
        },
        //自傳上傳時間
        autobiographyUT : {
          type: 'datetime'
        },
        //匯款證明
        receipt : {
          type: 'string'
        },
        //匯款證明上傳時間
        receiptUT : {
          type: 'datetime'
        },
        //使用者
        user: {
          model:'User'
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