import React, { Fragment, useState } from 'react'

// Components
import FormInput from './../Form/FormInput';
import FormButton from './../Form/FormButton';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [saltPassword, setSaltPassword] = useState('')

    return (
        <Fragment>
            <form action="" method="post" className=''>
                <h1 className=''>Sign up for your account!</h1>
                <p className=''>Join us today! Create your account easily with less information.</p>
                <FormInput
                    type = 'eamil'
                    placeholder = 'Email'
                    value = {email}
                    name= 'email'
                    label = 'Adress email'
                    onChange = {e => setEmail(e.target.value)}
                />
                <FormInput
                    type = 'password'
                    placeholder = '******'
                    value = {password}
                    label = 'Password'
                    name = 'password'
                    onChange = {e => setPassword(e.target.value)}
                />
                <FormInput
                    type = 'password'
                    placeholder = '******'
                    name ='confirmPassword'
                    label = 'Confirm password'
                    value = {saltPassword}
                    onChange = {e => setSaltPassword(e.target.value) }
                />
                <FormButton>Sign me</FormButton>
            </form>
        </Fragment>
    )
}

export default SignUp
