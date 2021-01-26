export function dutyAutoComplete(data) {
    $(data.node.span).addClass("fancytree-loading");
    data.input.dropmenu({
        'source': function (request, response) {
            $.ajax({
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': parseInt(data.tree.$div[0].id.replace(/\D+/ig, '')),
                    'attribute_id': parseInt(data.node.key.replace(/\D+/ig, ''))
                },
                url: route + 'getValuesList',
                dataType: 'json',
                success: function (json) {
                    response($.map(json, function (item) {
                        return {
                            label: item.text,
                            value: item.text
                        };
                    }));
                }
            });
        },
        'select': function (item) {
            data.input.val(item.value);
            // data.node.key = 'duty_' + item.value;
        }
    });
}

export function attributeAutoComplete(data) {
    $(data.node.span).addClass("fancytree-loading");
    data.input.dropmenu({
        'source': function (request, response) {
            $.ajax({
                data: {
                    'user_token': user_token,
                    'token': token,
                    'filter_name': encodeURIComponent(request),
                    'language_id': this.lng_id
                },
                url: route + 'autocomplete',
                dataType: 'json',
                success: function (json) {
                    response($.map(json, function (item) {
                        return {
                            category: item.attribute_group,
                            label: item.name,
                            value: item.attribute_id
                        };
                    }));
                }
            });
        },
        'select': function (item) {
            data.input.val(item.label);
            data.node.key = 'attribute_' + item.value;
        }
    });
}