import React from 'react'

const FormButton = ({children, ...otherProps}) => {
    return (
        <button className='form-btn' {...otherProps}>
            {children}
        </button>
    )
}

export default FormButton
