import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignInStart } from './../../redux/User/user.actions';


import Icon from './../Icon';

// Components
import FormButton from './../Form/FormButton';
import FormInput from './../Form/FormInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(emailSignInStart({email, password}))
        
    }

    return (
        <form className="form-login" onSubmit={ handleSubmit }>
            <FormInput
                    type = 'eamil'
                    value = {email}
                    name= 'email'
                    onChange = {e => setEmail(e.target.value)}
            >
                <Icon name="user"/>
            </FormInput>
            <FormInput
                    type = 'password'
                    value = {password}
                    name= 'password'
                    onChange = {e => setPassword(e.target.value)}
            >
                <Icon name="lock"/>
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
