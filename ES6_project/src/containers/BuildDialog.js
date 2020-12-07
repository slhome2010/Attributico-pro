export default function buildDialog() {
    let id = $(this).attr('id');
    let lng_id = parseInt(id.replace(/\D+/ig, ''));
    let tree = id.replace(/(options_)/i, ''); // TODO select tree

    createCheckbox(dialogItems[lng_id].autocollapse, tree, lng_id).appendTo(this);
    $('<br>').appendTo(this);
    createCheckbox(dialogItems[lng_id].sortorder, tree, lng_id).appendTo(this);
    $('<br>').appendTo(this);

    switch (tree.replace(/[0-9]/g, '')) {
        case 'category_tree':
        case 'deduplicate_tree':  
        case 'detach_tree':      
        case 'category_check_tree':
            createCheckbox(dialogItems[lng_id].hierarchy, tree, lng_id).appendTo(this);
            break;
        case 'product_tree':
            createCheckbox(dialogItems[lng_id].divergency, tree, lng_id).appendTo(this);
            break;
        default:
            createCheckbox(dialogItems[lng_id].lazyload, tree, lng_id).appendTo(this);
            break;
    };
}

function createCheckbox(template, tree) {
    let label = $('<label>', {
        class: 'checkbox-inline',
        for: template.selector + '_' + tree,
    });

    $('<input>', {
        type: "checkbox",
        class: template.selector,
        id: template.selector + '_' + tree,
        checked: template.state == '1' ? true : false
    }).appendTo(label);

    label.append(' ' + template.label);

    return label;
}