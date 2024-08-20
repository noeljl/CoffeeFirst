// npm install formik yup react-redux
// npm install formik yup react-redux
import React, { useState } from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { registerAttendeeAction } from '../../store/attendees/Attendees.actions.js'

const { Content } = Layout

const GuestRegistry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  // Login handler
  const handleGuestRegistry = async (data) => {
    try {
      console.log(data)
      setIsLoading(true)
      await dispatch(registerAttendeeAction(data))
      setIsLoading(false)
      navigate('/home')
    } catch (err) {
      setIsLoading(false)
      // Handle error (optional: you might want to display an error message here)
    }
  }

  const loginSchema = Yup.object().shape({
    firstName: Yup.string().required('Vorname ist ein verpflichtendes Feld'),
    lastName: Yup.string().required('Nachname ist ein verpflichtendes Feld'),
    timesAttended: Yup.string().required(
      'Anzahl an Präsenzzeiten ist ein verpflichtendes Feld'
    ),
  })

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        <h2 style={styles.title}>Gast Registrieren</h2>
        <Formik
          initialValues={{
            firstName: '',
            middleName: '',
            lastName: '',
            timesAttended: 0,
          }}
          validationSchema={loginSchema}
          validateOnBlur
          onSubmit={async (values) => {
            const { firstName, middleName, lastName, timesAttended } = values
            await handleGuestRegistry({
              firstName,
              middleName,
              lastName,
              timesAttended,
            })
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onFinish={handleSubmit} style={styles.form}>
              <Form.Item
                validateStatus={
                  errors.firstName && touched.firstName ? 'error' : ''
                }
                help={
                  errors.firstName && touched.firstName ? errors.firstName : ''
                }
              >
                <Input
                  name="firstName"
                  placeholder="Vorname"
                  onChange={handleChange}
                  value={values.firstName}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.middleName && touched.middleName ? 'error' : ''
                }
                help={
                  errors.middleName && touched.middleName
                    ? errors.middleName
                    : ''
                }
              >
                <Input
                  name="middleName"
                  placeholder="Mittelname"
                  onChange={handleChange}
                  value={values.middleName}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.lastName && touched.lastName ? 'error' : ''
                }
                help={
                  errors.lastName && touched.lastName ? errors.lastName : ''
                }
              >
                <Input
                  name="lastName"
                  placeholder="Nachname"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.timesAttended && touched.timesAttended ? 'error' : ''
                }
                help={
                  errors.timesAttended && touched.timesAttended
                    ? errors.timesAttended
                    : ''
                }
              >
                <Input
                  name="timesAttended"
                  placeholder="Anzahl an Präsenzen"
                  onChange={handleChange}
                  value={values.timesAttended}
                />
              </Form.Item>
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
    backgroundColor: '#21226b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#21226b',
  },
  form: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
}

export default GuestRegistry
