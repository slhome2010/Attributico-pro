/* Add methods to _FancytreeNodeClass */
/**
 * Return first parent node with key_prefix by key or null if not found
 * @returns {FancytreeNode}
 *
 **/
/* $.ui.fancytree._FancytreeNodeClass.prototype.getParentByKey = function (key) {
    key = (key == null) ? null : "" + key;

    var node = this;

    if (key != null && key !== this.key) {
        while (node.key.indexOf(key) && !node.isRootNode()) {
            node = node.getParent();
        }
    }
    return !node.isRootNode() ? node : null;
}; */
/**
 * Return first sibling or parent not selected node
 * @returns {FancytreeNode}
 *
 **/
$.ui.fancytree._FancytreeNodeClass.prototype.findUnselectedSibling = function () {
    let siblingNode = this.getNextSibling() || this.getPrevSibling() || this.getParent();

    while (siblingNode !== null && siblingNode.isSelected() && !siblingNode.isTopLevel()) {
        siblingNode = siblingNode.getPrevSibling() || siblingNode.getParent();
    }
    return siblingNode;
};
/**
 * Return language_id from node.tree.selector
 * @returns (int){id}
 *
 **/
$.ui.fancytree._FancytreeNodeClass.prototype.getLanguageId = function () {
    var selector = this.tree.$div[0].id;
    var lng_id = parseInt(selector.replace(/\D+/ig, ''));
    return lng_id;
};
/**
 * Return permission for node action
 * @returns boolean
 *
 **/
$.ui.fancytree._FancytreeNodeClass.prototype.isOneOf = function (actions) {
    let permission = false;
    for (let i = 0; i < actions.length; i++) {
        permission = permission || (this.key.indexOf(actions[i]) > -1) && !this.unselectable;
    }
    return permission;
};

$.ui.fancytree._FancytreeNodeClass.prototype.isDuty = function () {
    if (this.key.indexOf('duty') > -1) {
        return true;
    } else {
        return false;
    }
};
$.ui.fancytree._FancytreeNodeClass.prototype.isTemplate = function () {
    if (this.key.indexOf('template') > -1) {
        return true;
    } else {
        return false;
    }
};
$.ui.fancytree._FancytreeNodeClass.prototype.isValue = function () {
    if (this.key.indexOf('value') > -1) {
        return true;
    } else {
        return false;
    }
};
$.ui.fancytree._FancytreeNodeClass.prototype.isAttribute = function () {
    if (this.key.indexOf('attribute') > -1) {
        return true;
    } else {
        return false;
    }
};
$.ui.fancytree._FancytreeNodeClass.prototype.isGroup = function () {
    if (this.key.indexOf('group') > -1) {
        return true;
    } else {
        return false;
    }
};
$.ui.fancytree._FancytreeNodeClass.prototype.isCategory = function () {
    if (this.key.indexOf('category') > -1) {
        return true;
    } else {
        return false;
    }
};
// Get nodes by condition
$.ui.fancytree._FancytreeNodeClass.prototype.getParentAttribute = function () {
    let node = this;
    while (node.key.indexOf('attribute') < 0 && !node.isTopLevel()) {
        node = node.getParent()
    }
    return !node.isTopLevel() ? node : null;
};

$.ui.fancytree._FancytreeNodeClass.prototype.getParentGroup = function () {
    let node = this;
    while (node.key.indexOf('group') < 0 && !node.isTopLevel()) {
        node = node.getParent()
    }
    return !node.isTopLevel() ? node : null;
};

$.ui.fancytree._FancytreeNodeClass.prototype.getParentCategory = function () {
    let node = this;
    while (node.key.indexOf('category') < 0) {
        node = node.getParent()
    }
    return node;
};