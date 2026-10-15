import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from './Utils';

const Login = () => {

    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()



    const handleChange = (e) => {
        const { name, value } = e.target;
        setloginInfo((currentInfo) => ({ ...currentInfo, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if ( !email || !password) {
            return handleError('name, email and password are required')
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
              handleSuccess(message);
              localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                },1000)
            } else if (error) {
                const details = error?.details[0].message
                handleError(details)
            }else if (!success) {
                handleError(message);
            }
        } catch (error) {
            handleError('Unable to sign up. Please try again.')
        }

    }

  return (
    <div className='container'> 
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor='email'>Email</label>
                  <input
                      onChange={handleChange}
                      type='email'
                      name='email'
                      placeholder='Enter your email...'
                      value={loginInfo.email}
                  />
              </div>
              <div>
                  <label htmlFor='password'>Password</label>
                  <input
                      onChange={handleChange}
                      type='password'
                      name='password'
                      placeholder='Enter your Password...'
                      value={loginInfo.password}
                  />
              </div>
              <button type='submit'>login</button>
              <span>Already have account ? 
                  <Link to='/signup'>Signup</Link>
              </span>
          </form>
    </div>
  )
}

export default Login
