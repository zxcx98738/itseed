/**
 * SystemController
 *
 * @描述 : 系統設定
 * @文件 : Se http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    //報名系統
    systemSetting: function (req, res) {
        if (typeof req.session.authorized !== "undefined" && req.session.authorized.systemSetting === true) {
            var th, startDate, endDate;

            SystemSetting.findOne({
                name: "th"
            })
            .exec(function (err, parameter) {
                if(err){
                    return res.end(JSON.stringify(err));
                }
                else{
                    if(parameter == undefined)
                        th = "";
                    else
                        th = parameter.value;
                }

                SystemSetting.findOne({
                    name: "startDate"
                })
                .exec(function (err, parameter) {
                    if(err){
                        return res.end(JSON.stringify(err));
                    }
                    else{
                        if(parameter == undefined)
                            startDate = "";
                        else
                            startDate = parameter.value;
                    }

                    SystemSetting.findOne({
                        name: "endDate"
                    })
                    .exec(function (err, parameter) {
                        if(err){
                            return res.end(JSON.stringify(err));
                        }
                        else{
                            if(parameter == undefined)
                                endDate = "";
                            else
                                endDate = parameter.value;
                        }
                        return res.view("backend/pages/systemSetting", {
                            th: th,
                            startDate: startDate,
                            endDate: endDate,
                        });
                    });
                });
            });
        }
        else {
            return res.forbidden();
        }
    },
    //更新報名屆數
    updateTh: function (req, res) {
        if (typeof req.session.authorized !== "undefined" && req.session.authorized.systemSetting === true) {

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
        }
        else {
            return res.forbidden();
        }
    },
    //更新報名開始時間
    updateStartDate: function (req, res) {
        if (typeof req.session.authorized !== "undefined" && req.session.authorized.systemSetting === true) {

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
        }
        else {
            return res.forbidden();
        }
    },
    //更新報名結束時間
    updateEndDate: function (req, res) {
        if (typeof req.session.authorized !== "undefined" && req.session.authorized.systemSetting === true) {

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
        else {
            return res.forbidden();
        }
    },
};
