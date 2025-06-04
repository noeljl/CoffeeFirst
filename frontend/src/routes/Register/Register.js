import React, { useState } from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { registerMemberAction } from '../../store/auth/Auth.actions.js'

const { Content } = Layout

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  // Register handler
  const handleRegister = async (credentials) => {
    try {
      setIsLoading(true)
      await dispatch(registerMemberAction(credentials))
      setIsLoading(false)
      // Nach erfolgreicher Registrierung z.B. zum Login weiterleiten
      navigate('/login')
    } catch (err) {
      setIsLoading(false)
    }
  }

  // Validation-Schema ohne Username
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email('Ungültige E-Mail')
      .required('E-Mail ist erforderlich'),
    password: Yup.string()
      .min(6, 'Mindestens 6 Zeichen')
      .required('Passwort ist erforderlich'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwörter müssen übereinstimmen')
      .required('Bitte bestätige dein Passwort'),
  })

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        <h2 style={styles.title}>Register</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registerSchema}
          validateOnBlur
          onSubmit={async (values) => {
            const { email, password } = values
            await handleRegister({ email, password })
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onFinish={handleSubmit} style={styles.form}>
              <Form.Item
                validateStatus={errors.email && touched.email ? 'error' : ''}
                help={errors.email && touched.email ? errors.email : ''}
              >
                <Input
                  name="email"
                  placeholder="E-Mail"
                  onChange={handleChange}
                  value={values.email}
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
                  placeholder="Passwort"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Item>

              <Form.Item
                validateStatus={
                  errors.confirmPassword && touched.confirmPassword
                    ? 'error'
                    : ''
                }
                help={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ''
                }
              >
                <Input.Password
                  name="confirmPassword"
                  placeholder="Passwort bestätigen"
                  onChange={handleChange}
                  value={values.confirmPassword}
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
                  Registrieren
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
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

export default Register
