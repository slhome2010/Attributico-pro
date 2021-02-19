import { useState, useEffect } from 'react';
import { updateNode } from '../actions';

export function saveForm(data, values) {
    const unit_id = data
    //TODO POST in saveform
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token, 
            'unit_id': unit_id,            
            'values': values
        },
        url: 'index.php?route=localisation/unit/' + 'saveForm',
    }).done(function (result) {
        

    }).fail(function (result) {
        // Ajax error: reset title (and maybe issue a warning)
        
    }).always(function () {
        
    });
    // Optimistically assume that save will succeed. Accept the user input
    return true;
}

export function loadForm(data) {
    let unit_id = data
    const [config, setConfig] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log('unit loadForm useEffect')
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'unit_id': unit_id                
            },
            url: 'index.php?route=localisation/unit/' + 'getForm',
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