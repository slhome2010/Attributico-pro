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
    width: '60%',    
    height: '60%'
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(102, 102, 102, 0.75)'
  }
};

//Modal.setAppElement(document.querySelector('#root'))

function UnitForm(props) {  
  const [modalIsOpen, setIsOpen] = useState(false);  
  const { data } = useData()
  const [config, isLoading] = loadForm(data)

  function openModal() {
    setIsOpen(true);
  }
  
  function toggle() {
    setIsOpen(!modalIsOpen);
  }

  useLayoutEffect(() => {
    window.toggleModal = toggle;
  }, []);

  function onSubmit(values) { 
    toggle();
    saveForm(data, values)   
  }
  
  return (
    <div className="container-fluid">
      <Modal
        isOpen={modalIsOpen}        
        onRequestClose={toggle}
        style={customStyles}        
        shouldCloseOnOverlayClick={false}
        appElement={document.getElementById('root')}
      >
        {modalIsOpen && (
          isLoading ? (
            <Loader/>
          ) : (
              <Form
                template={config}                
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
  
}

export default UnitForm;