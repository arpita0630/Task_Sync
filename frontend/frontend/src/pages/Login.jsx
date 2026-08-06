import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const Login = () => {

  const navigate = useNavigate()

  const [isRegister, setIsRegister]   = useState(false)
  const [username, setUsername]       = useState('')
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [error, setError]             = useState('')
  const [strength, setStrength]       = useState('')

  // password strength checker
  const checkStrength = (value) => {
    if (value.length === 0) {
      setStrength('')
    } else if (value.length < 6) {
      setStrength('Weak')
    } else if (value.length < 10) {
      setStrength('Medium')
    } else {
      setStrength('Strong')
    }
  }

  const getStrengthColor = () => {
    if (strength === 'Weak')   return 'red'
    if (strength === 'Medium') return 'orange'
    if (strength === 'Strong') return 'green'
    return 'transparent'
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (isRegister) checkStrength(e.target.value)
  }

  const handleSubmit = () => {

    if (isRegister) {
      axios.post(`${API_URL}/auth/register`, { username, email, password }, { withCredentials:true })
        .then((response) => {
          if (response.data.status === 'success') {
            navigate('/dashboard')
          }
        })
        .catch((error) => {
          setError(error.response?.data?.message || 'Registration failed')
        })
    } else {
      axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials:true })
        .then((response) => {
          if (response.data.status === 'success') {
            navigate('/dashboard')
          }
        })
        .catch((error) => {
          setError(error.response?.data?.message || 'Login failed')
        })
    }

  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#111' }}>
      <div style={{ backgroundColor:'#222', padding:'40px', borderRadius:'10px', width:'400px' }}>

        <h1 style={{ color:'#3b82f6', textAlign:'center', marginBottom:'10px' }}>TaskSync</h1>
        <p style={{ color:'#aaa', textAlign:'center', marginBottom:'30px' }}>Collaborative Workspace</p>

        <h2 style={{ color:'white', marginBottom:'20px' }}>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        {isRegister && (
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width:'100%', padding:'12px', marginBottom:'15px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
          />
        )}

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width:'100%', padding:'12px', marginBottom:'15px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          style={{ width:'100%', padding:'12px', marginBottom:'5px', borderRadius:'8px', border:'1px solid #444', backgroundColor:'#333', color:'white', boxSizing:'border-box' }}
        />

        
        {isRegister && strength && (
          <p style={{ color:getStrengthColor(), fontSize:'13px', marginBottom:'15px' }}>
            Password Strength: {strength}
          </p>
        )}

        {!isRegister && (
          <p
            onClick={() => navigate('/forgot-password')}
            style={{ color:'#3b82f6', fontSize:'13px', textAlign:'right', cursor:'pointer', marginBottom:'15px' }}
          >
            Forgot Password?
          </p>
        )}

        {error && <p style={{ color:'red', marginBottom:'15px' }}>{error}</p>}

        <button
          onClick={handleSubmit}
          style={{ width:'100%', padding:'12px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer', marginBottom:'15px' }}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p
          onClick={() => { setIsRegister(!isRegister); setError(''); setStrength('') }}
          style={{ color:'#aaa', textAlign:'center', cursor:'pointer' }}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>

      </div>
    </div>
  )
}

export default Login