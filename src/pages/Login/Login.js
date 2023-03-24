import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

import { login, signUpProvider, forgotPassword } from '../../firebase'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const submitHandler = async () => {
        if (!email || !password) {
            setError('Invalid Entry');
            return;
        }
        const message = await login(email, password);
        if (message) {
            setError(message);
            navigate("/login");
            return;
        }
        setError(null);
        navigate("/")
    }

    const providerHandler = () => {
        signUpProvider();
        navigate("/")
    }
    const forgotPasswordHandler = async (email) => {
        const message = await forgotPassword(email);
        if (message) setError(message);
    }


    return (
        <div className='Login'>
            <div className='loginForm'>
                <h1>Login</h1>
                {error && <p className='text-center m-3' style={{ color: '#f79d65' }}>{error}</p>}
                <form>
                    <div className='mb-1'>
                        <label htmlFor='email' className='form-label text-light'>Email</label>
                        <input type="email" className='form-control' id="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label text-light'>Password</label>
                        <input type="password" className='form-control' id="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <div className='text-center  mt-3' style={{ cursor: 'pointer', color: '#f79d65' }} onClick={() => forgotPasswordHandler(email)}>Forger Password?</div>
                    </div>
                    <div className='d-grid'>
                        <button type="button" className="btn   btn-block" style={{ backgroundColor: '#13505b', color: 'white' }} onClick={submitHandler}>Login</button>
                        <button type="button" className="btn mt-3  btn-block" style={{ backgroundColor: '#13505b', color: 'white' }} onClick={providerHandler}>Continue with Google</button>
                    </div>
                </form>
                <p className='text-center text-light mt-3'>Doesn't have an account?
                    <span className='ml-2' style={{ color: '#f79d65', cursor: 'pointer' }} onClick={() => navigate('/register')}>Sign up</span></p>
            </div>

        </div>
    )
}

export default Login