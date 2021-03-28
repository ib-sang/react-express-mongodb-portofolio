import React from 'react'

const FormInput = ({onChange, label, children, ...otherProps}) => {
    return (
        <div className='form-group'>
            {label && (
                <label htmlFor={label} className='form-controle'> {label} </label>
            )}

            <div className='form-field-style'>
                {children && (children)}
                <input id= { label } onChange= { onChange } {...otherProps} className='form-field'/>
            </div>
        </div>
    )
}

export default FormInput
