import { useState } from 'react';
import CircleLoader from '../Loaders/CircleLoader';
import { loginFormErrorMessage } from '../constants';
import '../styles/login.css';

const Login = () => {

    // state
    const [loginInput, setLoginInput] = useState({ email: '', password: '' });
    const [errorInput, setErrorInput] = useState({});

    const isValidForm = () => {
        let isValid = true;
        let errorInput = {};
        Object.keys(loginInput).forEach((key) => {
            if (!loginInput[key]) {
                isValid = false;
                errorInput[key] = loginFormErrorMessage[key];
            }
        });
        setErrorInput(errorInput);
        return isValid;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInput((prevState) => (
            {
                ...prevState,
                [name]: value
            }
        ));
    }

    const handleBlurInput = (event) => {
        const { name } = event.target;
        if (!errorInput[name]) return;
        setErrorInput((prevState) => {
            let clone = { ...prevState };
            if (loginInput[name]) {
                delete clone[name];
            }
            return clone;
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!isValidForm()) {
            return;
        }
    }

    return (
        <div className='login-container'>
            <form
                className='login-form-wrapper'
                onSubmit={handleFormSubmit}
            >
                <h2 className='login-form-title'>Login</h2>
                <div className='login-form-input-wrapper'>
                    <label htmlFor='email' className='login-form-label'>Email</label>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        placeholder='Enter Email Address'
                        className={`login-form-input ${errorInput?.email && 'error'}`}
                        value={loginInput.email}
                        onChange={handleInputChange}
                        onBlur={handleBlurInput}
                    />
                    <p className='login-form-input-error'>{errorInput?.email}</p>
                </div>

                <label htmlFor='password' className='login-form-label'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter Password'
                    className={`login-form-input ${errorInput?.password && 'error'}`}
                    value={loginInput.password}
                    onChange={handleInputChange}
                    onBlur={handleBlurInput}
                />
                <p className='login-form-input-error'>{errorInput?.password}</p>
                <button
                    type='submit'
                    className='login-submit-btn'
                    disabled={false}
                >
                    Login
                    {/* <CircleLoader className='login-form-loader' /> */}
                </button>
            </form>
        </div>
    )
}

export default Login;
