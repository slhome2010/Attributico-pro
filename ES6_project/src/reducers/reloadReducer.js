import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE, DND_ADD_NODE, UPDATE_NODE, COPY_NODE, DELETE_NODE, PASTE_NODE, CHECK_OPTIONS, DND_REPLACE_CATEGORY } from '../constants/actions'
import { GROUP_SYNCRO_TREES, ATTRIBUTE_SYNCRO_TREES } from "../constants/global";

export default function reload(state = {}, action) {
    //console.log('Reduced action', action.type)

    switch (action.type) {
        case DND_MERGE_NODE:
            return {
                ...state,
                boundTrees: action.sourceNode.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode,
                altActiveNode: action.targetNode,
                selfReload: true
            }
        case DND_REPLACE_PARENT:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: true //TODO may be false?
            }
        case DND_REPLACE_CATEGORY:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.targetNode !== null ? action.targetNode.tree : action.sourceNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: true
            }
        case DND_SORT_NODE:
            return {
                ...state,
                boundTrees: action.sourceNode.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: action.affectedNodes ? true : false // for correctly sorting if multiselect Group
            }
        case DND_ADD_NODE:
            return {
                ...state,
                boundTrees: action.sourceNode.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.sourceNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode.getParent(),
                selfReload: true
            }        
        case UPDATE_NODE:
            return {
                ...state,
                boundTrees: action.node.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.node.tree,
                sourceNode: action.node,
                targetNode: action.node,
                activeNode: action.node,
                altActiveNode: action.node.getParent(),
                selfReload: action.node.getParent().isLazy() // TODO почему то срабатывает на добавлении атрибута
            }
        case COPY_NODE:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: [action.targetNode],
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode.getLastChild(),
                altActiveNode: action.targetNode,
                selfReload: true
            }
        case DELETE_NODE:
            return {
                ...state,
                boundTrees: action.node.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: action.affectedNodes,
                tree: action.node.tree,
                sourceNode: action.node,
                targetNode: action.node,
                activeNode: action.node.isDuty() ? action.node : action.node.findUnselectedSibling(),
                altActiveNode: action.node.getParent(),
                selfReload: action.node.isDuty() || action.node.isTemplate() || action.node.isValue() ? true : false
            }
        case PASTE_NODE:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
                affectedNodes: null,
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode.getFirstChild(),
                altActiveNode: action.targetNode,
                selfReload: true
            }
        case CHECK_OPTIONS:
            return {
                ...state,
                boundTrees: GROUP_SYNCRO_TREES,
                affectedNodes: null,
                tree: null,
                sourceNode: null,
                targetNode: null,
                activeNode: null,
                altActiveNode: null,
                selfReload: true
            }
        default:
            return state;
    }
}