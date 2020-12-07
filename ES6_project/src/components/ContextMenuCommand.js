/**
 * Handling contextmenu commands
 * @returns {none}
 *
 **/

/* import  'jquery.fancytree'; */
import { copyPaste, deleteDuty, deleteAttributesFromCategory, deleteAttribute, addNewAttribute, cloneDuty } from '../functions/Crud'
import { deSelectNodes } from '../functions/Select';
import CollapseExpande from './Events/CollapseExpande';
//import { isCategory } from '../functions/Plugin/NodeMethod';
import RefreshTree from './Events/RefreshTree';

export class ContextmenuCommand {
    constructor(ui, store) {
        this.ui = ui;
        this.node = $.ui.fancytree.getNode(ui.target);
        this.tree = $.ui.fancytree.getTree(ui.target);
        this.selector = this.tree?.$div[0].id;
        this.lng_id = parseInt(this.selector.replace(/\D+/ig, ''));
        this.store = store;
    }

    execute() {
        switch (this.ui.cmd) {
            case "expande":
            case "collapse":
                CollapseExpande(this.tree);
                break;
            case "refresh":
                RefreshTree(this.tree);
                break;
            case "options":
                $("#options_" + this.selector).dialog("open");
                break;
            case "rename":
                this.node.editStart();
                break;
            case "remove":
                if (!confirm(textConfirm)) {
                    break;
                }
                this.remove();
                break;
            case "addChild":
                if (this.node.isCategory() || this.node.getLevel() !== 1) {
                    this.addChild();
                }
                break;
            case "addSibling":
                this.addSibling();
                break;
            case "cut":
            case "copy":
                copyPaste(this.ui.cmd, this.node, this.store);
                break;
            case "paste":
                copyPaste(this.ui.cmd, this.node, this.store);
                deSelectNodes(this.node);
                break;
            case 'merge':
                copyPaste(this.ui.cmd, this.node, this.store);
                deSelectNodes(this.node);
                break;
            case 'clone':
                $(this.node.span).addClass("pending");
                cloneDuty(this.node, this.store)
                deSelectNodes(this.node)
                break
            default:
                alert("Todo: appply action '" + this.ui.cmd + "' to node " + this.node);
        }
    }

    remove() {
        if (this.node.isDuty()) {
            deleteDuty(this.node, this.store);
        } else {
            deleteAttribute(this.node, this.store);
        }        
    }

    addChild() {
        // Store не надо, т.к. будет saveAfterEdit
        addNewAttribute(this.node, 'attribute', this.lng_id);
    }

    addSibling() {
        addNewAttribute(this.node, 'group', this.lng_id);
    }
}

/* Override methods for CategoryattributeTree and DutyTree*/
export class ContextmenuCommandCategory extends ContextmenuCommand {

    remove() {
        deleteAttributesFromCategory(this.node, null, selNodes, this.store);
    }

    addChild() {
        // getRootNode().getFirstChild() даст узел с level=1 category_25, например.
        this.tree.getRootNode().getFirstChild().editCreateNode("child"); // add child attribute to root category
    }
}

/* export class ContextmenuCommandDuty extends ContextmenuCommand {

    remove() {
        deleteDuty(this.node, this.store);
    }
} */