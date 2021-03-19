import React, { useState, useLayoutEffect } from 'react';
import Modal from 'react-modal';
import { loadForm, saveForm } from '../../functions/AttributeForm';
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

function AttributeForm(props) {
  //var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
 // const [modalAttached, setModalAttached] = useState(true)
  const { data, store } = useData()
  const [config, isLoading] = loadForm(data)
  const [loadDuty, setLoadDuty] = useState(false);

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
    //console.log('useLayoutEffect node', data.node.title);
    //setModalAttached(true)    
   // window.modalAttached = modalAttached;
    window.toggleModal = toggle;
  }, []);

  function onSubmit(values) {
    console.log('submit', values);
    toggle();
    saveForm(data, store, values)
  }

  function dutyHandler(e) {    
    
    if (e.altKey && e.shiftKey) {
        console.log(e.target, e.currentTarget)
        console.log($(e.target))
       let input = $(e.target)
       e.target.classList.add("loading");
       input.dropmenu({
        'source': function (request, response) {
            $.ajax({
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': parseInt(data.tree.$div[0].id.replace(/\D+/ig, '')),
                    'attribute_id': parseInt(data.node.key.replace(/\D+/ig, ''))
                },
                url: route + 'getValuesList',
                dataType: 'json',
                success: function (json) {
                    response($.map(json, function (item) {
                        return {
                            label: item.text,
                            value: item.text
                        };
                    }));
                }
            });
        },
        'select':  item => {
          input.val(item.value);
          e.target.classList.remove("loading");
         // setLoadDuty(true)
            // data.node.key = 'duty_' + item.value;
        }
    });
        
    }
}
  console.log('render Attribute Form');
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
                onClick={dutyHandler}
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