import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from '../Forms/DataContext';
import UnitForm from '../Forms/UnitForm'

export function unitEvents() {

    $('button#unit-edit').on('click', editUnit);
    $('button#unit-add').on('click', addUnit);
    $('button#unit-delete').on('click', deleteUnit);
}

export function editUnit(event) {
    // Надо делать объектом, тогда будет каждый раз срабатывать useEffect (data={{'unit_id': unit_id}})
    const unit_id = $('select#unit_id').val()
    if (unit_id !== '0') {
        ReactDOM.render(
            <DataProvider data={{'unit_id': unit_id}} >
                <UnitForm />
            </DataProvider>, document.querySelector('#root'));
        window.toggleModal();
    }
}

export function addUnit(event) {
    const unit_id = '0'    
    ReactDOM.render(
        <DataProvider data={{'unit_id': unit_id}} >
            <UnitForm />
        </DataProvider>, document.querySelector('#root'));
    window.toggleModal();
}

export function deleteUnit(event) {
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