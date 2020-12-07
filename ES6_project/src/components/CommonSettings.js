import { CATEGORY_SYNCRO_TREES } from '../constants/global'
import { checkOptions } from "../actions";

/**
* Common settings change event hundlers
*
**/
export default function commonSettings(store) {

    // access to autoadd radio
    $('[name = "attributico_product_text"]').each(function (indx, element) {
        if (!$('[name = "attributico_autoadd"]').is(":checked")) {
            $(element).prop({
                "disabled": true,
                "checked": false
            });
        }
    });
    // autoadd attribute values to product
    $('input[name = "attributico_autoadd"]:checkbox').on('change', function (e) {
       let flag = $(this).is(":checked");
        $('[name = "attributico_product_text"]').each(function (indx, element) {
            $(element).prop({
                "disabled": !flag
            });
        });
    });
    // event handler for smartscroll
    $('input[name = "attributico_smart_scroll"]:checkbox').on('change', function (e) {
        if ($(this).is(":checked")) {
            $('[id *= "tree"]:not(.settings) > ul.fancytree-container').addClass("smart-scroll");
        } else {
            $("ul.fancytree-container").removeClass("smart-scroll");
        }
    });
    // event handler for cache on/off
    $('input[name = "attributico_cache"]:checkbox').on('change', function (e) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token
            },
            url: 'index.php?route=' + extension + 'module/attributico/cacheDelete',
            success: function (json) { 
                $(CATEGORY_SYNCRO_TREES).each(function (indx, element) {
                    let tree = $.ui.fancytree.getTree("#" + element.id);
                    tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
                    tree.reload()
                });
                store.dispatch(checkOptions());
            }
        });
    });
    // event handler for multistore categories output
    $('input[name = "attributico_multistore"]:checkbox').on('change', function (e) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token
            },
            url: 'index.php?route=' + extension + 'module/attributico/cacheDelete',
            success: function (json) {                
                $(CATEGORY_SYNCRO_TREES).each(function (indx, element) {
                    let tree = $.ui.fancytree.getTree("#" + element.id);
                    tree.options.source.data.multistore = $('input[name = "attributico_multistore"]:checkbox').is(":checked");
                    tree.reload()
                });
                store.dispatch(checkOptions());
            }
        });
    });

}