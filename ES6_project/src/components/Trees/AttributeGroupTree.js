import Filter from '../FancyFilter';
import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import { deSelectNodes, getSelectedKeys, selectControl } from '../../functions/Select';
import { loadError } from '../Events/LoadError';
import { saveAfterEdit } from '../Events/SaveAfterEdit'
import { editDuty } from '../Events/EditDuty';
import { smartScroll } from '../../constants/global';
import { moveNode } from '../../functions/Move';

export default class AttributeGroupTree {
    constructor(element, store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-attribute';
        this.tree = $("#attribute_group_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_attribute_group_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_attribute_group_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["edit", "dnd", "filter"],
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
                    'tree': "1"
                },
                url: 'index.php?route=' + extension + 'module/attributico/getAttributeGroupTree'
            },
            loadError: (e, data) => loadError(e, data),
            lazyLoad: (event, data) => {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': this.lng_id,
                        'sortOrder': this.sortOrder,
                        'lazyLoad': this.lazyLoad,
                        'tree': "1",
                    }, // cache:true,
                    url: data.node.isGroup() ? 'index.php?route=' + extension + 'module/attributico/getLazyGroup' : 'index.php?route=' + extension + 'module/attributico/getLazyAttributeValues'
                };
            },
            edit: {
                triggerStart: ["f2", "shift+click", "mac+enter"],
                inputCss: {
                    minWidth: "18em"
                },
                beforeEdit: function (event, data) {
                    if (!data.node.isOneOf(['group', 'attribute', 'template', 'value', 'duty'])) {
                        return false;
                    }
                    // Reset filter setting _highlight to false for exclude tag <mark> from title
                    this.tree.options.filter['highlight'] = false;
                    this.tree.clearFilter();
                },
                edit: (event, data) => editDuty(event, data), // Editor was opened (available as data.input)                
                beforeClose: function (event, data) {
                    // Return false to prevent cancel/save (data.input is available)
                },
                save: (event, data) => saveAfterEdit(event, data, this.store),
                close: function (event, data) {
                    if (data.save) {
                        $(data.node.span).addClass("pending");
                    }
                }
            },
            dnd: {
                autoExpandMS: 600,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: false, // Prevent dropping nodes on own descendants
                dragStart: (node, data) => {
                    if (data.node.isTopLevel() || data.node.getLevel() > 3) {
                        return false;
                    }
                    return true;
                },
                dragEnter: (targetNode, data) => {
                    let targetLevel = targetNode.getLevel();
                    let sourceLevel = data.otherNode.getLevel();
                    let sourceNode = data.otherNode;
                    // embargo on levels mixing
                    if (targetNode.isTopLevel() || targetLevel > sourceLevel) {
                        return false;
                    }
                    // embargo on moving into oneself
                    if (targetNode === sourceNode.parent) {
                        return false;
                    }
                    // embargo to sort nodes if tree option "sortOrder" turned off
                    if (targetNode.parent === sourceNode.parent && !data.tree.options.source.data.sortOrder && !data.originalEvent.ctrlKey) {
                        return false;
                    }

                    if (targetLevel === sourceLevel && !data.originalEvent.ctrlKey) {
                        return ["before", "after"];
                    }
                    return ["over"];
                },
                dragDrop: (targetNode, data) => {

                    moveNode(data.otherNode, targetNode, selNodes, data.originalEvent.ctrlKey, data.hitMode, this.store);

                },
                draggable: { // modify default jQuery draggable options
                    scroll: true // disable auto-scrolling
                }
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
                // Display list of selected nodes
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
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: data.node?.isOneOf(['group', 'attribute', 'template', 'value']),
                    addChild: !data.node?.isTopLevel() ? true : false,
                    addSibling: true,
                    copy: data.node?.isAttribute(),
                    cut: data.node?.isOneOf(['group', 'attribute']),
                    paste: !data.node?.isTopLevel() ? true : false,
                    merge: this.mergePermission(data.node),
                    clone: data.node?.isDuty() && data.node?.title !== ''
                };
                command.execute();
            },
            filter: {
                autoApply: $("#fs_" + this.currentTab + "_autoApply" + this.lng_id).is(":checked"), // Re-apply last filter if lazy data is loaded
                counter: $("#fs_" + this.currentTab + "_counter" + this.lng_id).is(":checked"), // Show a badge with number of matching child nodes near parent icons
                fuzzy: $("#fs_" + this.currentTab + "_fuzzy" + this.lng_id).is(":checked"), // Match single characters in order, e.g. 'fb' will match 'FooBar'
                hideExpandedCounter: $("#fs_" + this.currentTab + "_hideExpandedCounter" + this.lng_id).is(":checked"), // Hide counter badge, when parent is expanded
                highlight: $("#fs_" + this.currentTab + "_highlight" + this.lng_id).is(":checked"), // Highlight matches by wrapping inside <mark> tags
                mode: $("#fs_" + this.currentTab + "_hideMode" + this.lng_id).is(":checked") ? "hide" : "dimm" // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
            },
            init: (event, data) => {
                let filter = new Filter(this.currentTab, data.tree, this.lng_id);
                filter.attachEvents();
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: (event, ui) => {
                        let node = $.ui.fancytree.getNode(ui.target);
                        data.tree.$div.contextmenu("enableEntry", "remove", node.isOneOf(['group', 'attribute', 'template', 'value', 'duty']));
                        data.tree.$div.contextmenu("enableEntry", "rename", node.isOneOf(['group', 'attribute', 'template', 'value', 'duty']));
                        data.tree.$div.contextmenu("enableEntry", "copy", node.isAttribute());
                        data.tree.$div.contextmenu("enableEntry", "cut", node.isOneOf(['group', 'attribute']));
                        data.tree.$div.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0) && !node.isTopLevel());
                        data.tree.$div.contextmenu("enableEntry", "merge", this.mergePermission(node));
                        data.tree.$div.contextmenu("enableEntry", "addChild", !node.isTopLevel());
                        data.tree.$div.contextmenu("enableEntry", "clone", node.isDuty() && node.title !== '');
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

    mergePermission(node){
        if (clipboardNodes.length === 0) return false

        let clipboardFirstNode = clipboardNodes.find(item => typeof item === 'object').find(item => 'key' in item)
                    
        return (node?.isOneOf(['group', 'attribute']) && pasteMode == "cut" && (clipboardFirstNode.getLevel() === node?.getLevel()))
    }

    render() {
        this.tree.fancytree(this.config);
    }
}