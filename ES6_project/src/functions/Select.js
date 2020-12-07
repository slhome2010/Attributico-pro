
export function getSelectedKeys(selNodes) {
    var selKeys = [];
    if (selNodes) {
        selNodes.forEach(function (node) {
            selKeys.push(node.key);
        });
    }
    return selKeys;
}

export function getSelectedTitles(selNodes) {
    var selTitles = [];
    if (selNodes) {
        selNodes.forEach(function (node) {
            selTitles.push(node.title);
        });
    }
    return selTitles;
}

export function deSelectNodes() {
    if (selNodes) {
        selNodes.forEach(function (node) {
            node.setSelected(false);
        });       
    }
    selNodes = null;
}

export function deSelectCategories() {
    if (selCategories) {
        selCategories.forEach(function (category) {
            category.setSelected(false);
        });       
    }
    selCategories = null;
}

export function selectControl(data) {
    if (data.node.isTopLevel()) { // not select root or 1-st level node
        data.node.setSelected(false);
        return false;
    }
    data.node.tree.visit(function (node) {
        if (data.node.getLevel() !== node.getLevel())
            node.setSelected(false);
    });
    return true;
}