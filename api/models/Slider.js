/**
* Slider.js
*
* @描述 : 幻燈片
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
        //圖片名稱
        pic_name: {
          type: 'string',
          maxLength: 30,
          notNull: true
        },
        //圖片位置
        source: {
          type: 'string',
          maxLength: 30,
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