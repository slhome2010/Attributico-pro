import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class AttributeForm extends React.Component {

  // Lifecycle methods

  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    }

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    window.modalAttached = true;

    window.toggleModal = this.toggle;
  }

  componentWillUnmount() {
    // Есть смысл убрать отвязать обработчики обычных DOM элементов, 
    // связанных с этим компонентом, если их много, или вы собираетесь постоянно
    // создавать и удалять элемент
  }


  // Utility methods

  toggle() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    //var modalSate = this.state.modalIsOpen ? 'fade-in' : 'fade-out';
    var subtitle;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={this.toggle}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2>Hello</h2>
        <button onClick={this.toggle}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    );
  }
}


/* function AttributeForm(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(props.modalIsOpen);
  // const { modalIsOpen, closeModal } = props;
  function openModal() {
    setIsOpen(true);
  }
  console.log(modalIsOpen)
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  } */
  /* if (props.modalIsOpen) {
    openModal()
  } */
 /*  return (
    <div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}
 */
export default AttributeForm;
//const domContainer = document.querySelector('#like_button_container');
//ReactDOM.render(e(LikeButton), domContainer);
//ReactDOM.render( <AttributeForm />, document.querySelector( '#attribute-form' ) );