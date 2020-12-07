//import { isDuty } from '../../functions/Plugin/NodeMethod';

export function editDuty(event, data) {
    const handler = (e) => {                        
        if (e.altKey && e.shiftKey) {
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
                        url: 'index.php?route=' + extension + 'module/attributico/getValuesList',
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
    }

    if (data.node.isDuty()){
        data.input.on("click", handler);
    }                    
}