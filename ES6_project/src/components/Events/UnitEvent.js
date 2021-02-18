import { DataProvider } from '../Forms/DataContext';
import UnitForm from  '../Forms/UnitForm'

export function unitEvents() {

    $('button#unit-edit').on('click', editUnit);
    $('button#unit-add').on('click', addUnit);
    $('button#unit-delete').on('click', deleteUnit);
}

export function editUnit(event){
    console.log('edit', $('select#unit_id').val(), $(this))
}
export function addUnit(event){
    unit_id = $('select#unit_id').val()
    ReactDOM.render(
        <DataProvider data={unit_id} >
            <UnitForm/>
        </DataProvider>, document.querySelector('#root'));   
    window.toggleModal();
}

export function deleteUnit(event){
    const unit_id = $('select#unit_id').val()
    if (unit_id !== '0') {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'unit_id': unit_id            
            },
            url: 'index.php?route=localisation/unit/' + 'delete',
            success: function () {
                // Надо удалить из select options
                $('select#unit_id option:selected').remove();  
                $('select#unit_id option[value=0]').prop('selected', true);          
            }
        });    
    }
}