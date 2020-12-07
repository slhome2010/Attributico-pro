import { updateNode } from '../../actions';

export function saveAfterEdit(event, data, store) {
    let lng_id = data.node.getLanguageId()
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': data.node.key,
            'name': data.input.val(),
            'language_id': lng_id,
            'oldname': data.orgTitle
        },
        url: 'index.php?route=' + extension + 'module/attributico/editAttribute'
    }).done(function (result) {
        // Server might return an error or a modified title
        // Maybe also check for non-ajax errors, e.g. 'title invalid', ... in case server modified it         
        data.node.setTitle(result.acceptedTitle);

        let affectedNodes
        if (data.node.isTemplate() || data.node.isValue()) {
            affectedNodes = [data.node.getParentAttribute()]
        } else if (data.node.isAttribute() || data.node.isDuty()) {
            affectedNodes = [data.node.getParentGroup()]
        } else {
            affectedNodes = null
        }

        store.dispatch(updateNode(data.node, affectedNodes));

    }).fail(function (result) {
        // Ajax error: reset title (and maybe issue a warning)
        data.node.setTitle(data.orgTitle);
    }).always(function () {
        $(data.node.span).removeClass("pending");
    });
    // Optimistically assume that save will succeed. Accept the user input
    return true;
}