export default function RefreshTree(contextTree) {

    let currentActiveNode = contextTree.getActiveNode();
    let activeParent = currentActiveNode.getParent();
    let newActiveNode, newParent;

    contextTree.reload().done(async () => {
        if (currentActiveNode !== null && !currentActiveNode.isTopLevel()) {
            newParent = contextTree.getNodeByKey(activeParent.key);
            // if parent node is lazy we need to expand it previously
            if (newParent !== null && newParent.isLazy()) {
                await newParent.setExpanded(true)
                newActiveNode = contextTree.getNodeByKey(currentActiveNode.key);
                newActiveNode.setActive(true);
            } else {
                // set new node active
                newActiveNode = contextTree.getNodeByKey(currentActiveNode.key);
                await expandeAllParents(newActiveNode)
                newActiveNode.setActive(true)
            }
        } else {
            // set active visible top level node
            contextTree.getRootNode().getFirstChild().setActive(true);
        }
    });
}

async function expandeAllParents(node) {
    let parentList = node.getParentList()
    for (let parent of parentList) {
        await parent.setExpanded(true)
    }
}