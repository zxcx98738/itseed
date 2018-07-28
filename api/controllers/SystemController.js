/**
 * SystemController
 *
 * @描述 : 系統設定
 * @文件 : Se http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //移除blueprint內建的actions
    _config: {
        actions: false,
        rest: false,
        shortcuts: false
    },
    //報名系統
    systemSetting: function (req, res) {
        var p_th = SystemSetting.findOne({ name: "th" })
        var p_startDate = SystemSetting.findOne({ name: "startDate" })
        var p_endDate = SystemSetting.findOne({ name: "endDate" })
        Promise.all([p_th,p_startDate, p_endDate])
        .then(function (values) {
            var th = (values[0] == undefined) ? "" : values[0].value;
            var startDate = (values[1] == undefined) ? "" : values[1].value;
            var endDate = (values[2] == undefined) ? "" : values[2].value;
            return res.view("backend/pages/systemSetting", {
                layout: 'layoutadmin',
                th: th,
                startDate: startDate,
                endDate: endDate,
            });
        }).catch(function(err){
            return res.serverError(err);
        })
    },
    //更新系統資料
    updateSystemSetting: function (req, res) {
        var p_update_th = SystemSetting.updateOrCreate({ name: "th" }, {
            name: "th" ,
            value: req.body.th 
        });
        var p_update_startDate = SystemSetting.updateOrCreate({name: "startDate" }, {
            name: "startDate",
            value: req.body.startDate 
        });
        var p_update_endDate = SystemSetting.updateOrCreate({ name: "endDate" }, {
            name: "endDate",
            value: req.body.endDate 
        });
        Promise.all([p_update_th, p_update_startDate, p_update_endDate])
        .then(function (values) {
            res.redirect("/systemSetting");
        }).catch(function (err) {
            return res.end(JSON.stringify(err));
        });
    }
};

