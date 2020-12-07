/**
 * Filter create and event services
 * @type {function}
 *
 **/
export default function dialogOptionEvents() {
    // attach dialog event hundlers 
    $('input[id ^= "lazyLoad"]:checkbox').on('change', changeSettings);
    $('input[id ^= "sortOrder"]:checkbox').on('change', changeSettings);
    $('input[id ^= "autoCollapse"]:checkbox').on('change', changeSettings);
    $('input[id ^= "multiSelect"]:checkbox').on('change', changeSettings);
    $('input[id ^= "diver"]:checkbox').on('change', changeSettings);
    //FIXME change is deprecated handler


    function changeSettings(e) {
        let id = $(this).attr("id");
        let lng_id = parseInt(id.replace(/\D+/ig, ''));
        let selector = $(this).attr("class");
        let flag = $(this).is(":checked");
        let tree = $.ui.fancytree.getTree("#" + id.replace(selector + "_", "")); 
        tree.options.source.data.category_id = currentCategory;
        tree.options.source.data.attribute_id = currentAttribute; 
        let diver =  $('input[id = "diver_product_tree' + lng_id + '"]:checkbox').is(":checked");
        tree.options.source.data.invert = diver;     

        switch (selector) {
            case 'sortOrder':
                tree.options.source.data.sortOrder = flag;                
                tree.reload();
                break;
            case 'lazyLoad':
                tree.options.source.data.lazyLoad = flag;
                tree.reload();
                break;
            case 'autoCollapse':
                tree.options.autoCollapse = flag;
                break;
            case 'multiSelect':
                tree.options.selectMode = flag ? 3 : 2;
                break;
            case 'diver':                
                let activetree = $.ui.fancytree.getTree("#attribute_product_tree" + lng_id);
                activetree.reactivate();
                break;
            default:
                break;
        }
    }

}