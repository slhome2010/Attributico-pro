import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormElement';

const Styles = {
    formBody: {
        /*  overflowY: 'auto', 
         maxHeight: '500px' */
    },
    rowInline: {
        marginLeft: '15px', 
        marginRight: '15px'
    }
};

// Reusable Form Component
function Form({ template, onSubmit, onCancel, watchFields, validate, onClick }) {

    let { register, handleSubmit, errors, watch, setError, clearErrors } = useForm();
    let { title, elements } = template;

    //let watchValues = watch(watchFields);
    //validate(watchValues, { errors, setError, clearErrors });
    console.log('render Form', elements);
    const renderElements = (elements) => {
        return elements.map(element => {
            if ('cols' in element) {
                return (
                    <div key={element.rowname} className="row" style={Styles.rowInline}>
                        {element.cols.map(col => {
                            return (
                                <div key={col.name} className={"col-sm-" + col.width + " col-md-" + col.width + " col-xs-12"}>
                                    <FormInput register={register} element={col} errors={errors} onClick={onClick} ></FormInput>
                                </div>
                            )
                        })}
                    </div>
                )
            } else {
                return (
                    <FormInput register={register} element={element} errors={errors} onClick={onClick} ></FormInput>
                )
            }
        })
    }

    const renderTitle = () => {
        if (onCancel) {
            return (
                <>
                    <h3 className="panel-title"><i className="fa fa-pencil"></i>{title}</h3>
                    <button type="button" className="close" onClick={onCancel}><span>&times;</span></button>
                </>
            )
        } else {
            return (
                <>
                    <h3 className="panel-title"><i className="fa fa-pencil"></i>{title}</h3>
                </>
            )
        }
    }

    const renderFooter = () => {
        if (onCancel) {
            return (
                <>
                    <button type="button" className="btn btn-default" onClick={onCancel}>Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </>
            )
        } else {
            return (
                <>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </>
            )
        }
    }

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                {renderTitle()}
            </div>
            <div className="panel-body">
                <form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                    <div style={Styles.formBody}>
                        {renderElements(elements)}
                    </div>
                    <div className="modal-footer">
                        {renderFooter()}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;