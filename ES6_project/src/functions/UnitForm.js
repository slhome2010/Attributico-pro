import { useState, useEffect } from 'react';

export function saveForm(data, values) {
    const unit_id = data.unit_id
    
    $.ajax({
        data: {            
            'unit_id': unit_id,            
            'values': values
        },
        url: `index.php?route=localisation/unit/saveForm&user_token=${user_token}&token=${token}`,
        type: 'POST',        
    }).done(function (result) {
        if (unit_id != '0') {
            $('select#unit_id option:selected').html(result.html);
        } else {
            $('select#unit_id').append('<option value=' + result.unit_id + '>' + result.html + '</option>');
            $('select#unit_id option[value=' + result.unit_id + ']').prop('selected', true);                     
        }        
    }).fail(function (result) {
        // Ajax error: reset title (and maybe issue a warning)
        
    }).always(function () {
        
    });
    // Optimistically assume that save will succeed. Accept the user input
    return true;
}

export function loadForm(data) {    
    const [config, setConfig] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log('unit loadForm useEffect', data)
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'unit_id': data.unit_id                
            },
            url: 'index.php?route=localisation/unit/' + 'getForm',
            beforeSend: () => {
                setLoading(true)
            }
        }).done( config => { 
            setConfig(config) 
        }).fail(function (error) {
            // Ajax error: reset title (and maybe issue a warning)
            setConfig(error) // TODO как обработать если не json a HTML
            console.log('loadForm error:', error)
        }).always(function () {
            setLoading(false)
        })
    }, [data]);
   
    return [config, isLoading];
} 