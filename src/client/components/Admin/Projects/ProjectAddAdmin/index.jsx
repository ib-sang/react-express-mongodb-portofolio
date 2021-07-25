import React, { useState } from 'react';


// Components
import FormButton from './../../../Form/FormButton';
import FormInput from './../../../Form/FormInput';

const ProjectAddAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <form className="form-login" >
            <FormInput
                    type = 'eamil'
                    value = {email}
                    name= 'email'
                    onChange = {e => setEmail(e.target.value)}
            />
            <FormInput
                    type = 'password'
                    value = {password}
                    name= 'password'
                    onChange = {e => setPassword(e.target.value)}
            />
            <div className="form-group">
                <FormButton>Sign in</FormButton>
            </div>
            <div className="form-group">
                <a href="" className="form-link-forgot">Forgot password ?</a>
            </div>
        </form>
    )
}

export default ProjectAddAdmin
