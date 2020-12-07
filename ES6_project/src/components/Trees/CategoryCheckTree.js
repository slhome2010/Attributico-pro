import { ContextmenuCommand } from '../ContextMenuCommand';
import { smartScroll } from '../../constants/global';
import { KeydownCommand } from '../KeyDownCommand';
export default class CategoryCheckTree {
    constructor(element,store) {
        this.tree = $(element);
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.sortOrder = $('input[name = "attributico_sortorder"]:checkbox').is(":checked");
        this.store = store;

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            checkbox: true,
            selectMode: $('input[id = "input-attributico_multiselect"]:checkbox').is(":checked") ? 3 : 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'sortOrder': this.sortOrder
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryTree'
            },
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
            init: (event, data) => {                
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