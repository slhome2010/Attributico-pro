import React from 'react';

// Reusable Form Component
function FormInput({ register, field, errors }) {

    let { title, type, name, value, options, thumb, validationProps, dynamic } = field;

    const resize = (event) => {
        let target = event.target
                   
            console.log('formInput', target)
            $.ajax({
                data: {
                    'user_token': user_token,
                    'token': token,
                    'image': $(target).parent().find('input').val()
                },
                url: route + 'imageResize',
                success:  (resized) => { 				
                    $(target).prev().find('img').attr('src', resized);				
                }
            });      
       
    }

    switch (type) {
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
            );
        case 'image':
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? 'has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>{title}</label>
                        <div className="col-sm-10 text-left">
                            <a href="" id={'thumb-image-' + name} data-toggle="image" className="img-thumbnail">
                                <img src={thumb} alt="" title="" data-placeholder={name} />
                            </a>
                            <input type="hidden" name={name} defaultValue={value} id={'attribute-image-' + name} ref={register(validationProps)} onChange={resize}/>
                            {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                        </div>
                    </div>
                </div>
            );
        case 'class':
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? 'has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>{title}</label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <span class="input-group-addon"><i className={value}></i></span>
                                <input type="text" className="form-control" name={name} id={name} defaultValue={value} placeholder={name} ref={register(validationProps)} />
                                {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "select":
            return (
                <div key={name}>
                    <div className={'form-group' + (errors[name] ? 'has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>{title}</label>
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
                    <div className={'form-group' + (errors[name] ? 'has-error' : '')}>
                        <label className="col-sm-2 control-label" htmlFor={name}>{title}</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name={name} id={name} defaultValue={value} placeholder={name} ref={register(validationProps)} />
                            {errors[name] && <div className="text-danger">{errors[name]['message']}</div>}
                        </div>
                    </div>
                </div>
            );
    }
}

export default FormInput