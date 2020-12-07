import { ContextmenuCommand } from "../ContextMenuCommand";
import { KeydownCommand } from "../KeyDownCommand";
import { loadError } from "../Events/LoadError";
import { smartScroll } from "../../constants/global";

export default class ProductTree {
    constructor(element,store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));        
        this.tree = $("#product_tree" + this.lng_id);
        this.diver = $('input[id = "diver_product_tree' + this.lng_id + '"]:checkbox').is(":checked");      
        this.sortOrder = $('input[id = "sortOrder_product_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;

        this.config = {     
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder,
                    'invert': this.diver
                },
                url: 'index.php?route=' + extension + 'module/attributico/getProductTree'
            },
            loadError: (e, data) => loadError(e, data),
            dblclick: (event, data) => {
                if (data.node.getLevel() <= 2) {
                    data.node.setExpanded(!data.node.isExpanded());
                    return false;
                }
                var about_blank = $('input[id = "input-attributico_about_blank"]:checkbox').is(":checked");
                var attribute_product_tree = $.ui.fancytree.getTree("#attribute_product_tree" + this.lng_id);
                var attribute_node = attribute_product_tree.getActiveNode();
                if (about_blank) {
                    $("#reload.alert-danger").show();
                    window.open("index.php?route=catalog/product/" + edit + '&user_token=' + user_token + '&token=' + token + "&product_id=" + data.node.key.split('_')[1] + "&attribute_id=" + attribute_node.key.split('_')[1], '_blank');
                } else {
                    window.location.href = "index.php?route=catalog/product/" + edit + '&user_token=' + user_token + '&token=' + token + "&product_id=" + data.node.key.split('_')[1] + "&attribute_id=" + attribute_node.key.split('_')[1];
                }
                // index.php?route=catalog/product/update for 1.5.5
            },
            click: function (event, data) { },
            keydown: (e, data) => {
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: false,
                    refresh: false
                };
                command.execute();
            },
            focusTree: function (e, data) {
                data.tree.$container.focus();
            },
            init: (event, data) => {
                //console.log(data.tree.$div.context.id, ' has loaded');
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        ["remove", "rename", "addSibling", "addChild", "copy", "paste", "refresh"].forEach(function (item, index, array) {
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