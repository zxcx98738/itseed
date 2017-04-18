/**
* SystemSetting.js
*
* @描述 : 系統設定
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
        //參數名
        name: {
          type: 'string'
        },
        //參數值
        value: {
          type: 'string'
        },
        //敘述
        description: {
          type: 'string'
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


