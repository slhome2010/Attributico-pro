/* window.jQuery = require("jquery"); */

// Autocomplete for fancytree*/
(function ($) {
    $.fn.dropmenu = function (option) {
        return this.each(function () {
            this.timer = null;
            this.items = new Array();

            $div = $("<div />");
            $ul = $("<ul class='drop-menu' />");
            $menu = $ul;

            $.extend(this, option);

            $(this).attr('autocomplete', 'off');

            // Focus
            $(this).on('focus', function (event) {
                event.preventDefault();
                this.request();
            });

            // Blur
            $(this).on('blur', function () {
                setTimeout(function (object) {
                    object.hide();
                }, 200, this);
            });

            // Keydown
            $(this).on('keydown', function (event) {
                event.preventDefault();

                switch (event.keyCode) {
                    case 27: // escape
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });

            // Mousedown perehvat
            $(this).on("mousedown", function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).focus();
            });

            // Click
            this.click = function (event) {
                event.preventDefault();
                //    event.stopPropagation();  // нельзя будет вылетать
                value = $(event.target).parent().attr('data-value');

                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            }

            // Show
            this.show = function () {
                var pos = $(this).position();

                $(this).siblings('div').children($menu).css({ //============
                    top: pos.top + $(this).outerHeight(),
                    left: pos.left
                });

                $(this).siblings('div').children($menu).show(); //========
            }

            // Hide
            this.hide = function () {
                $(this).siblings('div').children($menu).hide(); // ===========
            }

            // Request
            this.request = function () {
                clearTimeout(this.timer);

                this.timer = setTimeout(function (object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            }

            // Response
            this.response = function (json) {
                html = '';

                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        this.items[json[i]['value']] = json[i];
                    }

                    for (i = 0; i < json.length; i++) {
                        if (!json[i]['category']) {
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        }
                    }

                    // Get all the ones with a categories
                    var category = new Array();

                    for (i = 0; i < json.length; i++) {
                        if (json[i]['category']) {
                            if (!category[json[i]['category']]) {
                                category[json[i]['category']] = new Array();
                                category[json[i]['category']]['name'] = json[i]['category'];
                                category[json[i]['category']]['item'] = new Array();
                            }

                            category[json[i]['category']]['item'].push(json[i]);
                        }
                    }

                    for (i in category) {
                        //  html += '<li>' + category[i]['name'] + '</li>';
                        html += '<li class="drop-header">' + category[i]['name'] + '</li>';
                        for (j = 0; j < category[i]['item'].length; j++) {
                            html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
                        }
                    }
                }

                if (html) {
                    this.show();
                } else {
                    this.hide();
                }

                $(this).siblings('div').children($menu).html(html);

            }

            $(this).after($div);
            $menu.appendTo($div);
            $(this).siblings('div').children($menu).delegate('a', 'mousedown', $.proxy(this.click, this));

        });
    }
})(window.jQuery);