import React, { useState, useLayoutEffect } from 'react';
import Modal from 'react-modal';
import { loadForm, saveForm } from '../../functions/Form';
import Form from './Form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    minWidth: '500px'
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [config, isLoading] = loadForm(props.nodeData)
  
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
    console.log('useLayautEffect');
    window.modalAttached = true;
    window.toggleModal = toggle;
  }, []);

  function onSubmit(values) {
    console.log(values);
    window.toggleModal();
    props.nodeData.node.setTitle(values.attribute);
    saveForm(props.nodeData, props.store)
  }
  console.log('render Attribute Form', modalIsOpen);
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
            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" /></div>
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



export default AttributeForm;