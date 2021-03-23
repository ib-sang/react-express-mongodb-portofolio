import React from 'react'

const FormButton = ({children, ...otherProps}) => {
    return (
        <button className='' {...otherProps}>
            {children}
        </button>
    )
}

export default FormButton
