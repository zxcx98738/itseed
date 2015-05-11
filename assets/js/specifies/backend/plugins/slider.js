'use strict';

var slider = (function() {
    var s_method,
        s_options,
        s_imageArr,
        s_settings_template_selector,
        s_slider_template_selector;

    var getSettings = function() {
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
            if (type == 'settings')
                s_settings_template_selector = selector;
            else
                s_slider_template_selector = selector;
        },
        play: function(selector) {
            $(selector)[s_method](s_options);
        },
        getMethod: function() {
            return s_method;
        },
        getSettings: getSettings,
        getOptions: function() {
            return s_options;
        },
        getSlider: getSlider,
        getImages: function() {
            return s_imageArr;
        },
    }
})();

$(function(){
    /* 圖片排序初始化 */
    $('.sortable').sortable({
        placeholder: 'highlight',
        opacity: '0.8',
        axis: 'x',
        containment: '.sortable',
        helper: 'clone',
        revert: 100,
        tolerance: 'pointer',
        update: function(event, ui){
            changeImages();
        },
    });
    //handlebar helper: 列表勾選
    Handlebars.registerHelper('select', function (value, options) {
        var select = document.createElement('select');
        select.innerHTML = options.fn(this);
        select.value = value;
        if (select.children[select.selectedIndex])
            select.children[select.selectedIndex].setAttribute('selected', 'selected');
        return select.innerHTML;
    });
    
    //handlebar helper: 判斷相等
    Handlebars.registerHelper('ifEqual', function (v1, v2, options) {
        if (v1 === v2)
            return options.fn(this);
        else
            return options.inverse(this);
    });

    /* 編輯器開關 */
    $('#setting .modal')
        .on('shown.bs.modal', function () {
            // 開啟modal時拿掉dragenter事件，避免拖曳圖片時觸發
            $(document).off('dragenter');
            /* 編輯器初始化 */
            init();
        })
        .on('hidden.bs.modal', function () {
            // 關閉modal後重啟summernote來復原事件(暴力解)
            $('.summernote').destroy();
            editorUI();
        });

    /* 切換plugin */
    $('#slider-settings .plugin select').on('change', function() {
        var plugin = $(this).val();
        resetSettings(plugin);
        loadSettings('#slider-settings .plugin-options');
        refreshSlider('#slider-settings', '#slider .preview', 'slider-preview');
    });

    /* 修改設定 */
    $('#slider-settings .plugin-options').on('change', function() {
        changeSettings('#slider-settings');
        refreshSlider('#slider-settings', '#slider .preview', 'slider-preview');
    });

    /* 拖拉圖片 */
    $('.drop-zone')
    .on('dragover', function () {
        $(this).addClass('drop-over');
        return false;
    })
    .on('dragleave', function () {
        $(this).removeClass('drop-over');
        return false;
    })
    .on('drop', function (e) {
        $(this).removeClass('drop-over');
        loadFromDesktop(e.originalEvent.dataTransfer.files[0]);
        e.preventDefault();
        return false;
    });

    /* 拖拉防呆 */
    $(window).on('dragover', function(e) {
        e.preventDefault();
    });
    $(window).on('drop', function(e) {
        e.preventDefault();
    });

    // 完成
    $('#slider .modal-footer>button').click(function () {
        var slider_id = getUniqueId('.note-editable');
        refreshSlider('#slider-settings', '#slider .preview', slider_id);
        var script = '<script>$(function(){$("#'+slider_id+'").'+slider.getMethod()+'('+JSON.stringify(slider.getOptions())+')});</scr'+'ipt>';
        var div = '<p><br></p>'+script+$("#slider .preview").html()+'<p><br></p>';
        $('.note-editable').append(div);
        $('#slider').modal('hide');
    });   
});

function init () {
    //預設圖片
    var default_img = [
        "<img data-src='holder.js/900x500/auto/#777:#555/text:First slide' alt='First slide [900x500]' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzc3NyIvPjxnPjx0ZXh0IHg9IjMxNy43MzQzNzUiIHk9IjI1MCIgc3R5bGU9ImZpbGw6IzU1NTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZTo0MnB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPkZpcnN0IHNsaWRlPC90ZXh0PjwvZz48L3N2Zz4=' data-holder-rendered='true'>",
        "<img data-src='holder.js/900x500/auto/#666:#444/text:Second slide' alt='Second slide [900x500]' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzY2NiIvPjxnPjx0ZXh0IHg9IjI3Ny4yODEyNSIgeT0iMjUwIiBzdHlsZT0iZmlsbDojNDQ0O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjQycHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+U2Vjb25kIHNsaWRlPC90ZXh0PjwvZz48L3N2Zz4=' data-holder-rendered='true'>",
        "<img data-src='holder.js/900x500/auto/#555:#333/text:Third slide' alt='Third slide [900x500]' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzU1NSIvPjxnPjx0ZXh0IHg9IjMwOC40MjE4NzUiIHk9IjI1MCIgc3R5bGU9ImZpbGw6IzMzMztmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZTo0MnB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPlRoaXJkIHNsaWRlPC90ZXh0PjwvZz48L3N2Zz4=' data-holder-rendered='true'>"
    ];
    //預設套件
    var default_method = 'carousel'; //Bootstrap
    //預設設定
    var default_options = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    };
    //預設設定模版
    var default_settings_template = '#Bootstrap-options-template';
    //預設slider模版
    var default_slider_template = '#Bootstrap-slider-template';

    //清除殘留內容
    $('.drop-zone').html('將圖片拖<br>曳至此處');
    $('.drop-zone').removeClass('drop-error');
    $('.miniature').html('');

    //載入預設設定
    slider.setImages(default_img);
    resetSettings('Bootstrap');
    loadSettings('#slider-settings .plugin-options');
    refreshSlider('#slider-settings', '#slider .preview', 'slider-preview');
}

/* 載入設定表單 */
function loadSettings (options_selector) {
    var html = slider.getSettings();
    $(options_selector).html(html);
}

/* 重設設定表單 */
function resetSettings (plugin) {
    var defaultMethod,
        defaultOptions,
        default_settings_template,
        default_slider_template;

    switch(plugin)
    {
        case 'Bootstrap':
            defaultMethod = 'carousel'
            defaultOptions = {
                interval: 5000,
                pause: 'hover',
                wrap: true,
                keyboard: true
            };
            default_settings_template = '#Bootstrap-options-template';
            default_slider_template = '#Bootstrap-slider-template';
            break;
        case 'Owl Carousel':
            defaultMethod = 'carousel'
            defaultOptions = {
                interval: 1000,
                pause: 'hover',
                wrap: false,
                keyboard: false
            };
            default_settings_template = '#Bootstrap-options-template';
            default_slider_template = '#Bootstrap-slider-template';
            break;
    }
    slider.setMethod(defaultMethod);
    slider.setOptions(defaultOptions);
    slider.setTemplate('settings', default_settings_template);
    slider.setTemplate('slider', default_slider_template);
}

/* 修改設定 */
function changeSettings (form_selector) {
    var formdata = $(form_selector).serializeArray(),
        plugin,
        method,
        options = {};

    //從表單擷取slider參數
    $(formdata).each(function(index, obj){
        if (obj.name == 'plugin')
            plugin = obj.value;
        else{
            if (obj.value == 'true')
                obj.value = true;
            if (obj.value == 'false')
                obj.value = false;
            options[obj.name] = obj.value;
        }
    });
    switch(plugin)
    {
        case 'Bootstrap':
            method = 'carousel'
            break;
        case 'Owl Carousel':
            method = 'carousel'
            break;
    }
    slider.setMethod(method);
    slider.setOptions(options);
}

/* 更新預覽畫面 */
function refreshSlider (form_selector, preview_selector, slider_id) {  
    //插入回傳的slider到預覽畫面
    $(preview_selector).html(slider.getSlider(slider_id));
    //啟動slider
    slider.play('#'+slider_id);
}

/* 添加圖片 */
function loadFromDesktop(file) {
    if (!file || file.type.indexOf('image/') !== 0) {
        $('.drop-zone').addClass('drop-error');
        $('.drop-zone').html('檔案格式<br>錯誤');
    }
    else if (file.size/1024/1024 > 1) {
        $('.drop-zone').addClass('drop-error');
        $('.drop-zone').html('檔案限制<br> < 1MB');
    }
    else {
        var reader = new FileReader();
        reader.onload = function(e) {
            // 添加到縮圖區
            $('.miniature').append('<div><i class="fa fa-times-circle remove"></i><img class="full-width" src="'+e.target.result+'"></div>');
            // 綁定移除按鈕
            $('.miniature i').on('click', function (e) {
                $(this).parent().remove();
                changeImages();
                refreshSlider('#slider-settings', '#slider .preview', 'slider-preview');
            });
            changeImages();
        };
        reader.readAsDataURL(file);
    }
}

/* 變動slider圖片 */
function changeImages() {
    var imageArr = [];
    $('.miniature').find('img').each(function() {
        var copy = $(this).clone();
        var image = $('<div>').append(copy).html();
        imageArr.push(image);
    });
    slider.setImages(imageArr);
    refreshSlider('#slider-settings', '#slider .preview', 'slider-preview');
}

/* 避免同文章內出現重複id */
function getUniqueId(article) {
    var id = 'slider';
    var i = 1;
    while(1){
        if($(article).find('#'+id+i).length == 0)
            return id+i;
        else
            i++;
    }
}