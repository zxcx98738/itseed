'use strict';

var slider = (function() {
    var s_method,
        s_options,
        s_imageArr,
        s_settings_template_selector,
        s_slider_template_selector;

    var getOptions = function() {
        var source  = $(s_settings_template_selector).html();
        var template = Handlebars.compile(source);

        return template(s_options);
    }
    var getSlider = function(slider_id) {
        var source  = $(s_slider_template_selector).html();
        var template = Handlebars.compile(source);
        var options = {
            id: slider_id,
            imgArr: s_imageArr,
        }

        return template(options);
    }
    return {
        setMethod: function(method) {
            s_method = method;
        },
        setOptions: function(options) {
            s_options = options;
        },
        setImages: function(imageArr) {
            s_imageArr = imageArr;
        },
        setTemplate: function(type ,selector) {
            if (type == "settings")
                s_settings_template_selector = selector;
            else
                s_slider_template_selector = selector;
        },
        play: function(selector) {
            $(selector)[s_method](s_options);
        },
        getOptions: getOptions,
        getSlider: getSlider,
        getImages: function() {
            return s_imageArr;
        }
    }
})();
