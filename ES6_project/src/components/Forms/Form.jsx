import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

// Reusable Form Component
function Form({ template, onSubmit, onCancel, watchFields, validate }) {

    let { register, handleSubmit, errors, watch, setError, clearErrors } = useForm();
    let { title, fields } = template;

    //let watchValues = watch(watchFields);
    //validate(watchValues, { errors, setError, clearErrors });
    console.log('render Form', fields);
    const renderFields = (fields) => {
        return fields.map(field => {
            return (
                <FormInput register={register} field={field} errors={errors}></FormInput>
            )
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
                    <div style={{overflowY: 'auto'}}>
                        {renderFields(fields)}
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