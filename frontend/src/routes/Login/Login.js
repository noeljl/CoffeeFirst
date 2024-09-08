// npm install formik yup react-redux
import React, { useState } from 'react'
import { Layout, Form, Input, Button, Divider } from 'antd'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { loginUser } from '../../store/auth/Auth.actions.js'

const { Content } = Layout

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  // Login handler
  const handleLogin = async (credentials) => {
    try {
      console.log(credentials)
      setIsLoading(true)
      await dispatch(loginUser(credentials))
      setIsLoading(false)
      navigate('/home')
    } catch (err) {
      setIsLoading(false)
    }
  }

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('username address is required'),
    password: Yup.string().required('Password is required'),
  })

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          validateOnBlur
          onSubmit={async (values) => {
            const { username, password } = values
            await handleLogin({ username, password })
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onFinish={handleSubmit} style={styles.form}>
              <Form.Item
                validateStatus={
                  errors.username && touched.username ? 'error' : ''
                }
                help={
                  errors.username && touched.username ? errors.username : ''
                }
              >
                <Input
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.password && touched.password ? 'error' : ''
                }
                help={
                  errors.password && touched.password ? errors.password : ''
                }
              >
                <Input.Password
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Item>
              {error && <div style={styles.error}>{error}</div>}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={styles.button}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
        {/* <Divider />
        <p style={{ textAlign: 'center' }}>Sign in with</p>
        <div style={styles.socialButtons}>
          <Button
            type="primary"
            href="/api/auth/facebook"
            style={styles.facebookButton}
          >
            Facebook
          </Button>
          <Button
            type="danger"
            href="/api/auth/google"
            style={styles.googleButton}
          >
            Google
          </Button>
        </div> */}
      </div>
    </Content>
  )
}

const styles = {
  content: {
    backgroundColor: '#D51067',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#D51067',
  },
  form: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  facebookButton: {
    width: '48%',
  },
  googleButton: {
    width: '48%',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
}

export default Login
