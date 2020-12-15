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
    padding: '0px'
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(102, 102, 102, 0.75)'
  }
};

Modal.setAppElement(document.querySelector('#root'))
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
    //subtitle.style.color = '#f00';
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

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><i className="fa fa-pencil"></i> Title </h3>
            <button type="button" className="close" onClick={toggle}><span>&times;</span></button>
          </div>
          <div className="panel-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente corporis voluptas quod, aliquid minima quibusdam maxime amet nisi.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={toggle}>Close</button>
            <button type="submit" className="btn btn-primary">Save changes</button>
          </div>
        </div>


      </Modal>
    </div>
  );
}

export default AttributeForm;