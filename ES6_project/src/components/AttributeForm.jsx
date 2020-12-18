import React, { useState, useLayoutEffect } from 'react';
import Modal from 'react-modal';
import Form from './Form';

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
  let template = {
    title: 'Job Application Form',
    fields: [
        {
            title: 'Attribute',
            type: 'text',
            name: 'attribute',
            value: props.node.title,
            validationProps: {
                required: 'Attribute is mandatory'
            }
        },
        {
            title: 'Second Name',
            type: 'text',
            name: 'secondname',
            validationProps: {
                required: 'Second Name is mandatory'
            }
        },
        {
            title: 'Email',
            type: 'email',
            name: 'email'
        },
        {
            title: 'Include Portfolio',
            type: 'checkbox',
            name: 'include_portfolio'
        },
        {
            title: 'Portfolio Link',
            type: 'url',
            name: 'portfolio_link',
            dynamic: {
                field: 'include_portfolio',
                value: true
            }
        }
    ]
  }
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

  function onSubmit(values) {
    console.log(values);
    window.toggleModal();
    props.node.setTitle(values.attribute);
    props.input.trigger('keyup', 'enter')
          // Important: exit sucessfull editing
          //props.node.editEnd(false);
  }

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
        <Form
          template={template}
          //watchFields={['firstname', 'include_portfolio']}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={toggle}
        />
      </Modal>
    </div>
  );


}



function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;

  // Firstname validation
  if(watchValues['firstname'] === 'Admin'){
      if(!errors['firstname']){
          setError('firstname', {
              type: 'manual',
              message: 'You cannot use this first name'
          })
      }
  }else{
      if(errors['firstname'] && errors['firstname']['type'] === 'manual'){
          clearErrors('firstname');
      }
  }
}



export default AttributeForm;