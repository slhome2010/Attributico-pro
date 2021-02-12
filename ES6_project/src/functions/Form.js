import { useState, useEffect } from 'react';
import { updateNode } from '../actions';

export function saveForm(data, store, values) {
    let lng_id = data.node.getLanguageId()
    data.node.setTitle(values.attribute); // TODO убрать в saveForm
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': data.node.key,
            'name': data.node.title,
            'language_id': lng_id,
            'oldname': data.orgTitle,
            'values': values
        },
        url: route + 'editInfo' // TODO editInfo
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

export function loadForm(data) {
    let lng_id = data.node.getLanguageId()
    const [config, setConfig] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log('loadForm useEffect')
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'attribute_id': data.node.key.split('_')[1],
                'language_id': lng_id,
                'form' : true
            },
            url: route + 'getAttributeInfo',
            beforeSend: () => {
                setLoading(true)
            }
        }).done( config => { 
            setConfig(config)
           // console.log('loadForm done:', config.name)
        }).fail(function (error) {
            // Ajax error: reset title (and maybe issue a warning)
            setConfig(error) // TODO как обработать если не json a HTML
            console.log('loadForm error:', error)
        }).always(function () {
            setLoading(false)
        })
    }, [data]); // TODO зависимость от полей формы а не узда дерева или и то и то
    console.log('loadForm return:', config)
    return [config, isLoading];
} 