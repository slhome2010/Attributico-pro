import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import Filter from '../FancyFilter';
import { loadError } from '../Events/LoadError';
//import { isOneOf, isDuty, isAttribute, isTemplate, isValue } from '../../functions/Plugin/NodeMethod';
import { saveAfterEdit } from '../Events/SaveAfterEdit';
import { editDuty } from '../Events/EditDuty';
import { smartScroll } from '../../constants/global';

// --------------------------------------- duty attribute tree ----------------------------------------------
export default class DutyTree {
    constructor(element, store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-duty';
        this.tree = $("#duty_attribute_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_duty_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_duty_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["edit", "filter"],
            checkbox: false,
            quicksearch: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder,
                    'lazyLoad': this.lazyLoad,
                    'tree': "2"
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
                        'tree': "2"
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
                    if (!data.node.isOneOf(['group', 'attribute', 'duty'])) {
                        return false;
                    }
                    // Reset filter setting _highlight to false for exclude tag <mark> from title
                    this.tree.options.filter['highlight'] = false;
                    this.tree.clearFilter();
                },
                edit: (event, data) => editDuty(event, data),
                save: (event, data) => saveAfterEdit(event, data, this.store),
                close: function (event, data) {
                    if (data.save) {
                        $(data.node.span).addClass("pending");
                    }
                }
            },
            beforeSelect: function (event, data) {
                return false;
            },
            keydown: (e, data) => {
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: data.node?.isOneOf(['duty']),
                    addChild: false,
                    addSibling: false,
                    copy: false,
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
                //console.log(data.tree.$div.context.id, ' has loaded');
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        data.tree.$div.contextmenu("enableEntry", "remove", node.isOneOf(['duty']));
                        data.tree.$div.contextmenu("enableEntry", "rename", node.isOneOf(['group', 'attribute', 'duty']));
                        data.tree.$div.contextmenu("enableEntry", "addSibling", false);
                        data.tree.$div.contextmenu("enableEntry", "addChild", false);
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