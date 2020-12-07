import { deSelectNodes, getSelectedKeys, selectControl } from '../../functions/Select';
import { addAttributeToCategory } from '../../functions/Crud';
import { KeydownCommandCategory } from '../KeyDownCommand';
import { ContextmenuCommandCategory } from '../ContextMenuCommand';
import { loadError } from '../Events/LoadError';
import { smartScroll } from '../../constants/global';
import { dndAddNode } from '../../actions';

// --------------------------------------- category attribute tree -------------------------------------
export default class CategoryAttributeTree {
    constructor(element, store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.tree = $("#category_attribute_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_category_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            selectMode: 2,
            extensions: ["edit", "dnd"],
            source: {
                data: {                    
                    'language_id': this.lng_id,
                    'category_id': currentCategory,
                    'sortOrder': this.sortOrder,
                    'tree': "4"
                },                
                url: `index.php?route=${extension}module/attributico/getCategoryAttributeTree&user_token=${user_token}&token=${token}`,
            },
            loadError: (e, data) => loadError(e, data),
            lazyLoad: (event, data) => {
                data.result = {
                    data: {                        
                        'key': data.node.key,
                        'language_id': this.lng_id,
                        'sortOrder': this.sortOrder,
                        'tree': "4"
                    }, // cache:true,                   
                    url: `index.php?route=${extension}module/attributico/getLazyAttributeValues&user_token=${user_token}&token=${token}`,
                };
            },
            edit: {
                triggerStart: [],
                inputCss: {
                    minWidth: "18em"
                },
                beforeEdit: function (event, data) {
                    if (!data.isNew) {
                        return false;
                    }
                },
                edit: (event, data) => {
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
                                url: 'index.php?route=' + extension + 'module/attributico/autocomplete',
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
                },
                beforeClose: function (event, data) {
                    // Return false to prevent cancel/save (data.input is available)
                },
                save: (event, data) => {
                    $.ajax({
                        data: {
                            'attributes': [data.node.key],
                            'category_id': data.node.getParent().key,
                            'categories': selCategories ? getSelectedKeys(selCategories) : [data.node.getParent().key]
                        },                        
                        url: `index.php?route=${extension}module/attributico/addCategoryAttributes&user_token=${user_token}&token=${token}`,
                        type: 'POST'
                    }).done(function () {
                        $(data.node.span).removeClass("pending");
                        data.node.setTitle(data.node.title);                       
                        store.dispatch(dndAddNode(data.node, data.node.getParent(), [data.node]));
                    });
                    return true;
                },
                close: function (event, data) {
                    if (data.save) {
                        $(data.node.span).addClass("pending");
                    }
                }
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: false,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function (node, data) {
                    return true;
                },
                dragEnter: function (node, data) {
                    if (node.tree === data.otherNode.tree) {
                        return false;
                    }
                    if (node.getLevel() > 2) {
                        return false;
                    }
                    return true;
                },
                dragDrop: (node, data) => {
                    let targetNode = node.isTopLevel() ? node : node.getParent(); // add to rootNode = category_id
                    addAttributeToCategory(data.otherNode, targetNode, selNodes, false, this.store);
                }
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
                selNodes = data.tree.getSelectedNodes();
            },
            click: function (event, data) {
                if (event.ctrlKey) {
                    data.node.toggleSelected();
                } else {
                    deSelectNodes(data.node);
                }
            },
            keydown: (e, data) => {
                let command = new KeydownCommandCategory(e, data, this.store);
                command.permissions = {
                    remove: data.node?.isAttribute(),
                    addChild: true,
                    addSibling: false,
                    copy: data.node?.isAttribute(),
                    cut: data.node?.isAttribute(),
                    paste: true,
                    refresh: false
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
                        data.tree.$div.contextmenu("enableEntry", "remove", node.isAttribute());
                        data.tree.$div.contextmenu("enableEntry", "rename", false);
                        data.tree.$div.contextmenu("enableEntry", "addSibling", false);
                        data.tree.$div.contextmenu("enableEntry", "copy", node.isAttribute());
                        data.tree.$div.contextmenu("enableEntry", "cut", node.isAttribute());
                        data.tree.$div.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0));
                        data.tree.$div.contextmenu("enableEntry", "refresh", false);
                        node.setActive();
                    },
                    select: (event, ui) => {
                        let command = new ContextmenuCommandCategory(ui, this.store);
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