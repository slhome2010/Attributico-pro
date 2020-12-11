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

Modal.setAppElement(document.querySelector( '#root' ))
class AttributeForm extends React.Component {

  // Lifecycle methods
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.subtitle;
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

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log(this.subtitle);
   // this.subtitle.style.color = '#f00';
  }

  render() {
    //var modalSate = this.state.modalIsOpen ? 'fade-in' : 'fade-out';    
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.toggle}
        style={customStyles}
        contentLabel="Example Modal" 
        shouldCloseOnOverlayClick={false}
      >

        <div className="modal-header">
          <button type="button" className="close" onClick={this.toggle}><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title">Modal title</h4>
        </div>
        <button type="button"  className="btn btn-primary" onClick={this.toggle}>close</button>
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


/* Modal.setAppElement(document.querySelector( '#root' ))

function AttributeForm(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false); // TODO false
  // const { modalIsOpen, closeModal } = props;
  function openModal() {
    setIsOpen(true);
  }
  console.log('modalIsOpen',modalIsOpen)

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen(!modalIsOpen);
  }

  useLayoutEffect(() => {
    window.modalAttached = true;
    window.toggleModal = toggle;
    console.log('useEffect');
  });
  

  return (
    <div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={toggle}
        style={customStyles}
        contentLabel="Example Modal" 
        shouldCloseOnOverlayClick={false}
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={toggle}>close</button>
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
} */
export default AttributeForm;
//const domContainer = document.querySelector('#like_button_container');
//ReactDOM.render(e(LikeButton), domContainer);
//ReactDOM.render( <AttributeForm />, document.querySelector( '#attribute-form' ) );