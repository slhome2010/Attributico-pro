import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import { addAttributeToCategory } from '../../functions/Crud';
import { smartScroll } from '../../constants/global';

// --------------------------------------- category tree ------------------------------------------------
export default class CategoryTree {
    constructor(element, store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-category';
        this.tree = $("#category_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_category_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["dnd"],
            checkbox: true,
            selectMode: $('input[id = "multiSelect_category_tree' + this.lng_id + '"]:checkbox').is(":checked") ? 3 : 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryTree'
            },
            activate: (event, data) => {
                let tree = $.ui.fancytree.getTree("#category_attribute_tree" + this.lng_id);
                currentCategory = data.node.key;
                tree.reload({
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'language_id': this.lng_id,
                        'category_id': currentCategory,
                        'sortOrder': $('input[id = "sortOrder_category_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked"),
                        'tree': "4"
                    },
                    url: 'index.php?route=' + extension + 'module/attributico/getCategoryAttributeTree'
                });
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: false,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function (node, data) {
                    return false;
                },
                dragEnter: function (node, data) {
                    if (data.otherNode.getParent().key === node.key || node.isTopLevel()) { // category_id is itself
                        return false;
                    }
                    return true;
                },
                dragDrop: (node, data) => {
                    // Если источником является дерево атрибутов, то удалять не надо т.к. это ADD. 
                    // Если дерево атрибутов категории, то удаляем, т.к. это REPLACE.
                    let noRemove = data.otherNode.tree.$div[0].id.indexOf('attribute_tree');
                    addAttributeToCategory(data.otherNode, node, selNodes, noRemove, this.store);
                }
            },
            select: function (event, data) {
                selCategories = data.tree.getSelectedNodes();
                data.tree.options.autoCollapse = false;
                data.node.setExpanded(!(data.node.expanded && !selCategories.length));
            },
            keydown: (e, data) => {
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: true
                };
                command.execute();
            },
            focusTree: function (e, data) {
                data.tree.$container.focus();
            },
            init: (event, data) => {
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        ["remove", "rename", "addSibling", "addChild"].forEach(function (item, index, array) {
                            data.tree.$div.contextmenu("enableEntry", item, false);
                        });
                        data.tree.$div.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0) && !node.isTopLevel());
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