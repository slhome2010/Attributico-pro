import React, { useState, useLayoutEffect } from 'react';
import Modal from 'react-modal';
import { loadForm, saveForm } from '../../functions/UnitForm';
import { useData } from './DataContext';
import Form from './Form';
import Loader from './Loader';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    width: '70%',    
    height: '80%'
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

function UnitForm(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAttached, setModalAttached] = useState(true)
  const { data, store } = useData()
  const [config, isLoading] = loadForm(data)

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
    console.log('useLayoutEffect node', data.node.title);
    //setModalAttached(true)
    window.modalAttached = modalAttached;
    window.toggleModal = toggle;
  }, [modalAttached]);

  function onSubmit(values) {
    console.log('submit', values);
    toggle();
    //saveForm(data, store, values)
  }
  console.log('render Attribute Form', modalAttached, modalIsOpen, isLoading, data.node.title, config);
  return (
    <div className="container-fluid">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={toggle}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
      >
        {modalIsOpen && (
          isLoading ? (
            <Loader/>
          ) : (
              <Form
                template={config}
                //watchFields={['firstname', 'include_portfolio']}
                validate={validate}
                onSubmit={onSubmit}
                onCancel={toggle}
              />
            )
        )
        }
      </Modal>
    </div>
  );


}



function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;

  // Firstname validation
  if (watchValues['firstname'] === 'Admin') {
    if (!errors['firstname']) {
      setError('firstname', {
        type: 'manual',
        message: 'You cannot use this first name'
      })
    }
  } else {
    if (errors['firstname'] && errors['firstname']['type'] === 'manual') {
      clearErrors('firstname');
    }
  }
}



export default UnitForm;