import React, { useState } from 'react';
import Icon from './../Icon';

// Components
import FormButton from './../Form/FormButton';
import FormInput from './../Form/FormInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="form-login">
            <FormInput
                    type = 'eamil'
                    placeholder = 'Email'
                    value = {email}
                    name= 'email'
                    label = 'Adress email'
                    onChange = {e => setEmail(e.target.value)}
            >
                <Icon name="user"/>
            </FormInput>
            <FormInput
                    type = 'password'
                    placeholder = 'password'
                    value = {password}
                    name= 'password'
                    label = 'Password'
                    onChange = {e => setPassword(e.target.value)}
            >
                <Icon name="password"/>
            </FormInput>
            <div className="form-group">
                <FormButton>Sign in</FormButton>
            </div>
            <div className="form-group">
                <a href="" className="form-link-forgot">Forgot password ?</a>
            </div>
        </form>
    )
}

export default Login
