export default function CollapseExpande(contextTree) {

    let savedState = contextTree.options.autoCollapse;

    contextTree.options.autoCollapse = false;
     
    contextTree.visit(function (node) {
        node.toggleExpanded();
    });

    contextTree.options.autoCollapse = savedState;
}
