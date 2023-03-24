import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../firebase'
import { signUpProvider } from '../../firebase'
import './Register.css'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState(null);

    const submitHandler = async () => {
        if (!name || !email || !password) {
            setError('Invalid Entry')
            return;
        }

        //sign the user in
        const message = await registerUser(email, password, name);
        if (message) {
            setError(message);
            navigate("/register");
            return;
        }
        setError(null);
        navigate("/login");
    }

    const providerHandler = () => {
        signUpProvider();
        navigate("/")
    }

    return (
        < div className='Register' >
            <div className='registerForm'>
                <h1>Register</h1>
                {error && <p className='text-center m-3' style={{ color: '#f79d65' }}> {error}</p>}
                <form>
                    <div className='mb-1'>
                        <label htmlFor='name' className='form-label text-light'>Name</label>
                        <input type="name" className='form-control' id="name" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className='mb-1'>
                        <label htmlFor='email' className='form-label text-light'>Email</label>
                        <input type="email" className='form-control' id="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label text-light'>Password</label>
                        <input type="password" className='form-control' id="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                    </div>
                    <div className='d-grid'>
                        <button type="button" className="btn   btn-block" style={{ backgroundColor: '#13505b', color: 'white' }} onClick={submitHandler}>Sign Up</button>
                        <button type="button" className="btn mt-3  btn-block" style={{ backgroundColor: '#13505b', color: 'white' }} onClick={providerHandler}>Continue with Google</button>
                    </div>
                </form>
                <p className='text-center text-light mt-3'>Has an account
                    <span className='ml-2' style={{ color: '#f79d65', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span></p>
            </div>

        </div >
    )
}

export default Register