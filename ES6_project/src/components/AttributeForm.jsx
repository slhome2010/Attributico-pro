import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
class AttributeForm extends Component {
    render() {
        return (
            <div>
                <h2>Hello World!</h2>
            </div>
        )
    }
}
 
ReactDOM.render( <AttributeForm />, document.querySelector( '#attribute-form' ) );