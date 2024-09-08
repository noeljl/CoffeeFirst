import React, { useState } from 'react'
import { Layout, Form, Input, Button, Select } from 'antd'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import {
  registerAttendeeAction,
  deleteAttendeeAction,
} from '../../store/attendees/Attendees.actions.js'

const { Content } = Layout
const { Option } = Select

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
    username: Yup.string().required(
      'Benutzername ist ein verpflichtendes Feld'
    ),
    password: Yup.string().required('Passwort ist ein verpflichtendes Feld'),
    attendee_category: Yup.string().required(
      'Kategorie ist ein verpflichtendes Feld'
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
            username: '',
            password: '',
            attendee_category: 'guest', // Standardmäßig Gast
          }}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={async (values, { setSubmitting, setFieldValue }) => {
            setSubmitting(false)
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
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
                  errors.username && touched.username ? 'error' : ''
                }
                help={
                  errors.username && touched.username ? errors.username : ''
                }
              >
                <Input
                  name="username"
                  placeholder="Benutzername"
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
                  placeholder="Passwort"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.attendee_category && touched.attendee_category
                    ? 'error'
                    : ''
                }
                help={
                  errors.attendee_category && touched.attendee_category
                    ? errors.attendee_category
                    : ''
                }
              >
                <Select
                  name="attendee_category"
                  placeholder="Kategorie wählen"
                  value={values.attendee_category}
                  onChange={(value) =>
                    setFieldValue('attendee_category', value)
                  }
                >
                  <Option value="guest">Gast</Option>
                  <Option value="member">Mitglied</Option>
                </Select>
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
                  danger
                  loading={isLoading}
                  style={styles.deleteButton}
                  onClick={() => handleGuestAction(values, 'delete')}
                >
                  Gast Löschen
                </Button>
                <Button
                  type="default"
                  style={styles.eventsButton}
                  onClick={() => navigate('/eventsRegistry')}
                >
                  Zu den Events
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
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#D51067',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    width: '100%',
  },
  deleteButton: {
    width: '100%',
    marginTop: '10px',
  },
  eventsButton: {
    width: '100%',
    marginTop: '10px',
    borderRadius: '15px',
  },
}

export default GuestRegistry
