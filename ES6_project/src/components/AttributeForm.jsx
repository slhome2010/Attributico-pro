import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
export class AttributeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false,name: '',team :'' ,country: ''};
    
        this.toggle = this.toggle.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTeam = this.handleChangeTeam.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      handleChangeName(event) {
        this.setState({name: event.target.value});
      }
      handleChangeTeam(event) {
        this.setState({team: event.target.value});
      }

      handleChangeCountry(event) {
        this.setState({country: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }

      render() {
        return (
    
            <div>
              <h1>React Bootstrap Modal Example</h1>
            <button color="success" onClick={this.toggle}>React Modal</button>
            <div isOpen={this.state.modal}>
            <form onSubmit={this.handleSubmit}>
              <div>IPL 2018</div>
              <div>
              <div className="row">
                <div className="form-group col-md-4">
                <label>Name:</label>
                <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                  </div>
                  </div>
                <div className="row">
                 <div className="form-group col-md-4">
                <label>Team:</label>
                    <input type="text" value={this.state.team} onChange={this.handleChangeTeam} className="form-control" />
                   </div>
                  </div>
                <div className="row">
                 <div className="form-group col-md-4">
                  <label>Country:</label>
                    <input type="text" value={this.country} onChange={this.handleChangeCountry} className="form-control" />
                   </div>
                  </div>
              </div>
              <div>
                <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
                <button color="danger" onClick={this.toggle}>Cancel</button>
              </div>
              </form>
        </div>
        </div>
      
    );
  }
}
 
//const domContainer = document.querySelector('#like_button_container');
//ReactDOM.render(e(LikeButton), domContainer);
//ReactDOM.render( <AttributeForm />, document.querySelector( '#attribute-form' ) );