import React from 'react';
import { useForm } from 'react-hook-form';

// Reusable Form Component
function Form({ template, onSubmit, onCancel, watchFields, validate }) {

    let { register, handleSubmit, errors, watch, setError, clearErrors } = useForm();
    let { title, fields } = template;

    let watchValues = watch(watchFields);
    validate(watchValues, { errors, setError, clearErrors });

    const renderFields = (fields) => {
        return fields.map(field => {
            let { title, type, name, value, validationProps, dynamic } = field;

            let showField = dynamic ? watchValues[dynamic['field']] === dynamic['value'] : true;

            if (!showField) return null;

            switch (type) {
                case 'text':
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <input type="text" name={name} id={name} defaultValue={value} ref={register(validationProps)} />
                            {errors[name] && <span className="text-warning">{errors[name]['message']}</span>}
                        </div>
                    )
                case 'email':
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <input type="email" name={name} id={name} ref={register(validationProps)} />
                            {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={name}>
                            <label>
                                <input type="checkbox" name={name} id={name} ref={register(validationProps)} />
                                <span>{title}</span>
                                {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                            </label>
                        </div>
                    )
                case 'url':
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <input type="url" name={name} id={name} ref={register(validationProps)} />
                            {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                        </div>
                    )
                default:
                    return (
                        <div key={name}>
                            <span className="red-text">Invalid Field</span>
                        </div>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    {renderFields(fields)}
                    <div className="modal-footer">
                        {renderFooter()}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;