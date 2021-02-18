export function unitEvents() {

    $('button#unit-edit').on('click', editUnit);
    $('button#unit-add').on('click', addUnit);
    $('button#unit-delete').on('click', deleteUnit);
}

export function editUnit(event){
    console.log('edit', $('select#unit_id').val(), $(this))
}
export function addUnit(event){
    console.log('add',$('select#unit_id').val(), $(this))
}
export function deleteUnit(event){
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'unit_id': $('select#unit_id').val()            
        },
        url: 'index.php?route=localisation/unit/' + 'delete',
        success: function () {
            // Надо удалить из select options
            console.log('delete',$('select#unit_id').val(), $(this))
        }
    });    
}