import Filter from '../FancyFilter';
import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import { deSelectNodes, selectControl } from '../../functions/Select';
import { loadError } from '../Events/LoadError';
import { editDuty } from '../Events/EditDuty';
import { saveAfterEdit } from '../Events/SaveAfterEdit';
import { smartScroll } from '../../constants/global';

// ------------------- attribute tree (Attribute group in tab-category) ----------------------------------------
export default class AttributeTree {
    constructor(element, store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-category';
        this.tree = $("#attribute_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");
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
                    'tree': "3"
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
                        'tree': "3"
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
                    if (!data.node.isOneOf(['duty'])) {
                        return false;
                    }
                    // Reset filter setting _highlight to false for exclude tag <mark> from title
                    this.tree.options.filter['highlight'] = false;
                    this.tree.clearFilter();
                },
                // Editor was opened (available as data.input)
                // Alt+Shift+click on input call autocomplete function
                edit: (event, data) => editDuty(event, data),
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
                autoExpandMS: 800,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function (node, data) {
                    if (data.node.getLevel() !== 3) {
                        return false;
                    }
                    return true;
                },
                draggable: { // modify default jQuery draggable options
                    revert: true,
                    cursorAt: {
                        top: -5,
                        left: -5
                    },
                    connectToFancytree: true, // let Fancytree accept drag events
                    appendTo: "body",
                    scroll: true // disable auto-scrolling
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
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: false,
                    rename: data.node?.isDuty(),
                    addChild: false,
                    addSibling: false,
                    copy: data.node?.isAttribute(),
                    paste: false,
                    clone: data.node?.isDuty() && data.node?.title !== ''
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
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        ["remove", "addSibling", "addChild"].forEach(function (item, index, array) {
                            data.tree.$div.contextmenu("enableEntry", item, false);
                        });
                        data.tree.$div.contextmenu("enableEntry", "copy", node.isAttribute());
                        data.tree.$div.contextmenu("enableEntry", "rename", node.isDuty());
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

    render() {
        this.tree.fancytree(this.config);
    }
}