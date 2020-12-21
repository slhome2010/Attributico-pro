import React from 'react';
import ReactDOM from "react-dom";
import { dutyAutoComplete } from '../../functions/AutoComplete';
import AttributeForm from '../Forms/AttributeForm';

export function editNode(event, data, store) {
    const dutyHandler = (e) => {
        if (e.altKey && e.shiftKey) {
            dutyAutoComplete(data)
        }
    }

    if (data.node.isDuty()) {
        data.input.on("click", dutyHandler);
    } else if (data.node.isAttribute() || data.node.isGroup()) { //TODO  async await loadForm
       // if (!window.modalAttached) {
            ReactDOM.render(<AttributeForm nodeData={data} store={store} />, document.querySelector('#root'));
       // }
        window.toggleModal();
    }
}