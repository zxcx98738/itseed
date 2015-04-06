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
        //報名表
        registration : {
          type: 'string',
          maxLength: 50,
        },
        //報名表建立時間
        registrationCT : {
          type: 'datetime'
        },
        //報名表修改時間
        registrationUT : {
          type: 'datetime'
        },
        //自傳
        autobiography : {
          type: 'string',
          maxLength: 50,
        },
        //自傳建立時間
        autobiographyCT : {
          type: 'datetime'
        },
        //自傳修改時間
        autobiographyUT : {
          type: 'datetime'
        },
        //繳費收據
        receipt : {
          type: 'string',
          maxLength: 50,
        },
        //繳費收據建立時間
        receiptCT : {
          type: 'datetime'
        },
        //繳費收據上傳時間
        receiptUT : {
          type: 'datetime'
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