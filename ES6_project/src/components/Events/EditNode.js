import React from 'react';
import ReactDOM from 'react-dom';
import { dutyAutoComplete } from '../../functions/AutoComplete';
import AttributeForm from '../Forms/AttributeForm';
import { DataProvider } from '../Forms/DataContext';

export function editNode(event, data, store) {
    const dutyHandler = (e) => {
        if (e.altKey && e.shiftKey) {
            dutyAutoComplete(data)
        }
    }

    if (data.node.isDuty()) {
        data.input.on('click', dutyHandler);
    } else if (data.node.isAttribute()) { //TODO  async await loadForm
        // if (!window.modalAttached) {
        ReactDOM.render(
            <DataProvider data={data} store={store}>
                <AttributeForm/>
            </DataProvider>, document.querySelector('#root'));
        // }
        window.toggleModal();
    }
}