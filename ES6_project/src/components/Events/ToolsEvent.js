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
    console.log('delete',$('select#unit_id').val(), $(this))
}