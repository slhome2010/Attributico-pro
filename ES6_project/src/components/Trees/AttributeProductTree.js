import Filter from '../FancyFilter';
import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import { loadError } from '../Events/LoadError';
import { smartScroll } from '../../constants/global';

export default class AttributeProductTree {
    constructor(element,store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-products';
        this.tree = $("#attribute_product_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_attribute_product_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_attribute_product_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["filter"],
            selectMode: 2,
            checkbox: false,
            quicksearch: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder,
                    'lazyLoad': this.lazyLoad,                    
                    'tree': "5"
                },
                url: 'index.php?route=' + extension + 'module/attributico/getAttributeGroupTree'
            },
            loadError: (e, data) => loadError(e, data),
            beforeActivate: function (event, data) {
                if (data.node.getLevel() === 4) {
                    return false;
                }
            },
            activate: (event, data) => {
                var tree = $.ui.fancytree.getTree("#product_tree" + this.lng_id);
                currentAttribute = data.node.key;
                tree.reload({
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'language_id': this.lng_id,
                        'attribute_id': data.node.key,
                        'title': data.node.title,
                        'sortOrder': $('input[id = "sortOrder_attribute_product_tree' + this.lng_id + '"]:checkbox').is(":checked"),
                        'invert': $('input[id = "diver_product_tree' + this.lng_id + '"]:checkbox').is(":checked")
                    },
                    url: 'index.php?route=' + extension + 'module/attributico/getProductTree'
                });
            },
            lazyLoad: (event, data) => {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': this.lng_id,
                        'sortOrder': this.sortOrder,
                        'lazyLoad': this.lazyLoad,                        
                        'tree': "5"
                    }, // cache:true,
                    url: data.node.isGroup() ? 'index.php?route=' + extension + 'module/attributico/getLazyGroup' : 'index.php?route=' + extension + 'module/attributico/getLazyAttributeValues'
                };
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
                selNodes = data.tree.getSelectedNodes();
            },
            click: function (event, data) { },
            keydown: (e, data) => {
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: false
                };
                command.execute();
            },
            filter: {
                autoApply: $("#fs_" + this.currentTab + "_autoApply" + this.lng_id).is(":checked"),
                counter: $("#fs_" + this.currentTab + "_counter" + this.lng_id).is(":checked"), 
                fuzzy: $("#fs_" + this.currentTab + "_fuzzy" + this.lng_id).is(":checked"), 
                hideExpandedCounter: $("#fs_" + this.currentTab + "_hideExpandedCounter" + this.lng_id).is(":checked"), 
                highlight: $("#fs_" + this.currentTab + "_highlight" + this.lng_id).is(":checked"), 
                mode: $("#fs_" + this.currentTab + "_hideMode" + this.lng_id).is(":checked") ? "hide" : "dimm" 
            },
            init: (event, data) => {
                let filter = new Filter(this.currentTab, data.tree, this.lng_id);
                filter.attachEvents();
                //console.log(data.tree.$div.context.id, ' has loaded');
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        ["remove", "rename", "addSibling", "addChild", "copy", "paste"].forEach(function (item, index, array) {
                            data.tree.$div.contextmenu("enableEntry", item, false);
                        });                        
                        node.setActive();
                    },
                    select: (event, ui) => {
                        let command = new ContextmenuCommand(ui, this.store);
                        command.execute();
                    }
                });
            }
        }
    }

    render() {
        this.tree.fancytree(this.config);
    }
}