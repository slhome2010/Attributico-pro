/** 
 * Backend functions for moveNode works with list of nodes for one of language
 * no matter from language_id.
 * There are using only node_id (attribute_id or gruop_id) in Sql query   
**/
/**
 * @function moveNode
 * 
 * @param {sourceNode} FancytreeNode /  the node which is moving 
 * @param {targetNode} FancytreeNode /  the node where the sourceNode is moving
 * @param {clipboard} Array.FancytreeNode /  the an array of nodes that need to move
 * @param {ctrlKey} Boolean /  True if the nodes are moved while the ctrlKey or altKey button is pressed
 * @param {direct} String /  Node accept mode ('before','after','over')
 * @param {store} Redux.Store /  State transfer to reducer 
 * 
**/
import { dndMergeNode, dndSortNode, dndReplaceParent } from '../actions'
import { deSelectNodes, getSelectedKeys } from './Select';

export async function moveNode(sourceNode, targetNode, clipboard, ctrlKey, direct, store) {

    let targetLevel = targetNode.getLevel();
    let sourceLevel = sourceNode.getLevel();
    let replace = targetNode.getParent() !== sourceNode.getParent();
    let merge = ctrlKey && (targetLevel === sourceLevel);
    let url = '';
    let dispatchAction = null;
    let sourceGroup = sourceNode.getParentGroup();
    let affectedNodes;

    if (merge && !confirm(textConfirm)) {
        return;
    }

    if (clipboard) { //TODO maid it async and self false in reducer
        clipboard.forEach(async clipNode => {
            if (merge) {
                await moveChidren(clipNode, targetNode, direct)
                clipNode.remove();
            } else {
                clipNode.moveTo(targetNode, direct);
            }
        });
    } else {
        if (merge) {
            await moveChidren(sourceNode, targetNode, direct)
            sourceNode.remove();
        } else {
            sourceNode.moveTo(targetNode, direct);
        }
    }

    if (merge) {
        // Merge group === replace group for child attributes and remove group (see in backend controller)
        url = 'index.php?route=' + extension + 'module/attributico/mergeAttributeGroup';
        // Reload full group because duty may be changed.   [...new Set(... is arrayunique function  
        affectedNodes = sourceNode.isGroup() ? null : [...new Set([sourceGroup, targetNode.getParentGroup()])]
        dispatchAction = dndMergeNode;
    } else if (replace) {
        url = 'index.php?route=' + extension + 'module/attributico/replaceAttributeGroup';
        affectedNodes = [sourceGroup, targetNode.getParentGroup()]
        dispatchAction = dndReplaceParent;
    } else {
        url = 'index.php?route=' + extension + 'module/attributico/sortAttributeGroup';
        if (sourceNode.isGroup()) {
            affectedNodes = null
        } else {
            affectedNodes = [targetNode.getParentGroup()]
        }
        dispatchAction = dndSortNode;
    }
    $.ajax({
        data: {
            'subjects': clipboard ? getSelectedKeys(clipboard) : [sourceNode.key],
            'group': targetNode.getParent().key,
            'target': targetNode.key,
            'direct': direct
        },
        url: url + '&user_token=' + user_token + '&token=' + token,
        type: 'POST',
        success: () => {
            store.dispatch(dispatchAction(sourceNode, targetNode, affectedNodes));            
            deSelectNodes();
        }
    });
}

async function moveChidren(sourceNode, targetNode, direct) {
    if (sourceNode.isGroup()) {
        let attributes = sourceNode.getChildren()
        let l = attributes.length
        while (l > 0) {
            await attributes[0].moveTo(targetNode, direct);
            l--
        }
    }
}