import React, { useState, useLayoutEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px'
  },
  overlay: { 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    backgroundColor: 'rgba(102, 102, 102, 0.75)'
  }
};

Modal.setAppElement(document.querySelector( '#root' ))
//Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.3)'
//Modal.defaultStyles.content.padding = '15px'

function AttributeForm(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false); // TODO false
  // const { modalIsOpen, closeModal } = props;
  function openModal() {
    setIsOpen(true);
  }  

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
}

export default AttributeForm;