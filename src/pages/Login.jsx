import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo, setIsUserLoggedIn } from '../store/slice/userSlice';
import { loginFormErrorMessage, defaultErrorMessage } from '../constants';
import InlineMessage from '../components/InlineMessage';
import CircleLoader from '../Loaders/CircleLoader';

const Login = () => {

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginInput, setLoginInput] = useState({ username: '', password: '' });
    const [errorInput, setErrorInput] = useState({});

    // dispatch
    const dispatch = useDispatch();

    // navigate
    const navigate = useNavigate();

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

    const loginUser = async () => {
        try {
            setIsLoading(true);
            const requestPayload = {
                ...loginInput,
                expiresInMins: 30,
            }
            const response = await axios.post('https://dummyjson.com/user/login',
                JSON.stringify(requestPayload),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data) {
                sessionStorage.setItem('accessToken', response.data.token);
                dispatch(setIsUserLoggedIn(true));
                dispatch(setUserInfo(response.data));
                navigate('/');
            }

        } catch (error) {
            console.log('login api error', error);
            const message = error?.response?.data?.message ?? defaultErrorMessage;
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!isValidForm()) {
            return;
        }
        loginUser()
    }

    return (
        <div className='login-container'>
            <form
                className='login-form-wrapper'
                onSubmit={handleFormSubmit}
            >
                <h2 className='login-form-title'>Welcome Back</h2>
                <p className='login-form-sub-title'>Please login to your account</p>
                {
                    errorMessage &&
                    <InlineMessage
                        type='error'
                        message={errorMessage}
                    />
                }
                <div className='login-form-input-wrapper'>
                    <label htmlFor='username' className='login-form-label'>UserName</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Enter userName'
                        className={`login-form-input ${errorInput?.username && 'error'}`}
                        value={loginInput.userName}
                        onChange={handleInputChange}
                        onBlur={handleBlurInput}
                    />
                    <p className='login-form-input-error'>{errorInput?.username}</p>
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
                    disabled={isLoading}
                >
                    {
                        isLoading ? <CircleLoader className='login-form-loader' />
                            : 'Login'
                    }
                </button>
            </form>
        </div>
    )
}

export default Login;
