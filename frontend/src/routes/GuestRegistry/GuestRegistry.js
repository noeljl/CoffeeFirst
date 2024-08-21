// npm install formik yup react-redux
import React, { useState } from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import {
  registerAttendeeAction,
  updateAttendeeAction,
  deleteAttendeeAction,
} from '../../store/attendees/Attendees.actions.js'

const { Content } = Layout

const GuestRegistry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleGuestAction = async (data, actionType) => {
    try {
      setIsLoading(true)
      switch (actionType) {
        case 'create':
          await dispatch(registerAttendeeAction(data))
          break
        case 'update':
          console.log('Update clicked')
          await dispatch(updateAttendeeAction(data))
          break
        case 'delete':
          await dispatch(deleteAttendeeAction(data))
          break
        default:
          break
      }
      setIsLoading(false)
      navigate('/home')
    } catch (err) {
      setIsLoading(false)
      // Fehlerbehandlung (optional: hier könnte eine Fehlermeldung angezeigt werden)
    }
  }

  const validationSchema = Yup.object().shape({
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
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={async (values, { setSubmitting, setFieldValue }) => {
            setSubmitting(false)
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form style={styles.form}>
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
                  loading={isLoading}
                  style={styles.registerButton}
                  onClick={() => handleGuestAction(values, 'create')}
                >
                  Gast Registrieren
                </Button>
                <Button
                  type="primary"
                  loading={isLoading}
                  style={styles.updateButton}
                  onClick={() => handleGuestAction(values, 'update')}
                >
                  Gast Updaten
                </Button>
                <Button
                  type="primary"
                  danger
                  loading={isLoading}
                  style={styles.deleteButton}
                  onClick={() => handleGuestAction(values, 'delete')}
                >
                  Gast Löschen
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
  registerButton: {
    width: '100%',
  },
  updateButton: {
    width: '100%',
    marginTop: '10px',
    backgroundColor: 'green',
  },
  deleteButton: {
    width: '100%',
    marginTop: '10px',
  },
}

export default GuestRegistry
