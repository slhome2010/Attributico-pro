import React, { useState, useLayoutEffect } from 'react';
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
}

export default AttributeForm;