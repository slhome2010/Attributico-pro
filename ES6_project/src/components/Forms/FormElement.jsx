import React from 'react';

// Reusable Form Component
function FormInput({ register, element, errors }) {

    let { label, type, name, value, options, src, thumb, rows, validationProps, tooltip, placeholder } = element;

    switch (type) {
        case 'email':
            return (
                <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input type="email" name={name} id={name} ref={register(validationProps)} />
                    {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                </div>
            )
        case 'checkbox':
            return (
                <div key={name}>
                    <label>
                        <input type="checkbox" name={name} id={name} ref={register(validationProps)} />
                        <span>{label}</span>
                        {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                    </label>
                </div>
            )
        case 'url':
            return (
                <div key={name}>
                    <label htmlFor={name}>
                        {label}
                        {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                    </label>
                    <input type="url" name={name} id={name} ref={register(validationProps)} />
                    {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                </div>
            );
        case 'space':
            return (
                <div > </div>
            );
        case 'input-group':
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? ' has-error' : '')}>
                        <label className="control-label" htmlFor={name}>
                            {label}
                            {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                        </label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <img src={src} title={tooltip}></img>
                            </span>
                            <input type="text" className="form-control" name={name} id={name} defaultValue={value} placeholder={placeholder ? placeholder : label} ref={register(validationProps)} />
                        </div>
                        {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                    </div>
                </div>
            );
        case 'flag':
            return (
                <div key={name}>
                    <div>
                        <img src={src} alt="" title={tooltip} data-placeholder={placeholder ? placeholder : label} />
                        <input type="hidden" name={name} defaultValue={value} id={'flag-' + name} ref={register(validationProps)} />
                    </div>
                </div>
            );
        case 'textarea':
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? ' has-error' : '')}>
                        <label className="control-label" htmlFor={name}>
                            {label}
                            {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                        </label>
                        <textarea className="form-control" rows={rows} name={name} id={name} defaultValue={value} placeholder={placeholder ? placeholder : label} ref={register(validationProps)} />
                        {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                    </div>
                </div>
            );
        case 'image':
            return (
                <div key={name}>
                    <div className={'form-group text-center' + (errors[name] ? ' has-error' : '')}>
                        <label className="control-label" htmlFor={'attribute-image-' + name}>
                            {label}
                            {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                        </label>
                        <div>
                            <a href="" id={'thumb-image-' + name} data-toggle="image" className="img-thumbnail">
                                <img src={thumb} alt="" title="" data-placeholder={placeholder ? placeholder : label} />
                            </a>
                            <input type="hidden" name={name} defaultValue={value} id={'attribute-image-' + name} ref={register(validationProps)} />
                            {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                        </div>
                    </div>
                </div>
            );
        case 'class':
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? ' has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>
                            {label}
                            {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                        </label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <span class="input-group-addon"><i className={value}></i></span>
                                <input type="text" className="form-control" name={name} id={name} defaultValue={value} placeholder={placeholder ? placeholder : label} ref={register(validationProps)} />
                                {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "select":
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? ' has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>
                            {label}
                            {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                        </label>
                        <div className="col-sm-10">
                            <select className="form-control" name={name} defaultValue={value} ref={register(validationProps)}>
                                {options.map((opt) => {
                                    return <option key={opt.key} value={opt.value}>{opt.title}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            );
        case 'text':
        default:
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? ' has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>
                            {label}
                            {tooltip ? <span data-toggle="tooltip" title={tooltip}></span> : ''}
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name={name} id={name} defaultValue={value} placeholder={placeholder ? placeholder : label} ref={register(validationProps)} />
                            {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                        </div>
                    </div>
                </div>
            );
    }
}

export default FormInput