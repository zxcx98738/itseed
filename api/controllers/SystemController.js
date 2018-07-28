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
            var th = values[0].value;
            var startDate = values[1].value;
            var endDate = values[2].value;
            if (th == undefined) th = "";
            if (startDate == undefined) startDate = "";
            if (endDate == undefined) endDate = "";
            return res.view("backend/pages/systemSetting", {
                layout: 'layoutadmin',
                th: th,
                startDate: startDate,
                endDate: endDate,
            });
        }).catch(function(err){
            return res.end(JSON.stringify(err));
        })
    },
    //更新報名屆數
    updateTh: function (req, res) {
        SystemSetting.update({name: "th"}, {value: req.body.th})
        .exec(function (err, datas) {
            if (err) {
                res.end(JSON.stringify(err));
            }
            else {
                if(datas.length == 0){
                    SystemSetting.create({
                        name: "th",
                        value: req.body.th,
                        description: "報名屆數"
                    })
                    .exec(function (err, user) {
                        if (err) {
                            res.end(JSON.stringify(err));
                        }
                        else {
                            res.redirect("/systemSetting");
                        }
                    });
                }
                else
                    res.redirect("/systemSetting");
            }
        });
    },
    //更新報名開始時間
    updateStartDate: function (req, res) {
        SystemSetting.update({name: "startDate"}, {value: req.body.startDate})
        .exec(function (err, datas) {
            if (err) {
                res.end(JSON.stringify(err));
            }
            else {
                if(datas.length == 0){
                    SystemSetting.create({
                        name: "startDate",
                        value: req.body.startDate,
                        description: "報名開始時間"
                    })
                    .exec(function (err, user) {
                        if (err) {
                            res.end(JSON.stringify(err));
                        }
                        else {
                            res.redirect("/systemSetting");
                        }
                    });
                }
                else
                    res.redirect("/systemSetting");
            }
        });
    },
    //更新報名結束時間
    updateEndDate: function (req, res) {
        SystemSetting.update({name: "endDate"}, {value: req.body.endDate})
        .exec(function (err, datas) {
            if (err) {
                res.end(JSON.stringify(err));
            }
            else {
                if(datas.length == 0){
                    SystemSetting.create({
                        name: "endDate",
                        value: req.body.endDate,
                        description: "報名結束時間"
                    })
                    .exec(function (err, user) {
                        if (err) {
                            res.end(JSON.stringify(err));
                        }
                        else {
                            res.redirect("/systemSetting");
                        }
                    });
                }
                else
                    res.redirect("/systemSetting");
            }
        });
    }
};

