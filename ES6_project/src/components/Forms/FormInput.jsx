import React from 'react';

// Reusable Form Component
function FormInput({ register, field, errors }) {

    let { title, type, name, value, validationProps, dynamic } = field;

   // let showField = dynamic ? watchValues[dynamic['field']] === dynamic['value'] : true;

   // if (!showField) return null;
   console.log('render FormInput',type);

    switch (type) {
        case 'text':
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? 'has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>{title}</label>
                        <div className="col-sm-10">
                            <input type="text" name={name} id={name} defaultValue={value} placeholder={name} className="form-control" ref={register(validationProps)} />
                            {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                        </div>
                    </div>
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
}

export default FormInput