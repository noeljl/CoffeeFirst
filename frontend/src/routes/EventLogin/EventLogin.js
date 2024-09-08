import React, { useEffect, useState } from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { Formik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { validateQRCodeAction } from '../../store/qrCodeVerfication/QRCode.actions.js'
import { loginEventAttendeeAction } from '../../store/auth/Auth.actions.js'

const { Content } = Layout

const EventLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { isQRCodeValid, error: qrCodeError } = useSelector(
    (state) => state.qrCode
  )
  const { error: loginError } = useSelector((state) => state.auth)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const eventID = location.pathname.split('/')[2]
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')

    if (eventID && token) {
      dispatch(validateQRCodeAction({ eventID, token }))
    } else {
      navigate('/error')
    }
  }, [dispatch, location, navigate])

  useEffect(() => {
    if (!isQRCodeValid && qrCodeError) {
      navigate('/error')
    }
  }, [isQRCodeValid, qrCodeError, navigate])

  const handleLogin = async (credentials) => {
    setIsLoading(true)
    try {
      await dispatch(loginEventAttendeeAction(credentials))
      setIsLoading(false)
      const eventID = location.pathname.split('/')[2]
      const queryParams = new URLSearchParams(location.search)
      const token = queryParams.get('token')
      console.log(eventID, token)
      navigate(`/eventHome/${eventID}?token=${token}`)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        {isQRCodeValid ? (
          <>
            <h2 style={styles.title}>Event Login</h2>
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
                  {loginError && <div style={styles.error}>{loginError}</div>}
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
          </>
        ) : (
          <p>Verifying QR Code...</p>
        )}
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
  error: {
    color: 'red',
    marginBottom: '10px',
  },
}

export default EventLogin
