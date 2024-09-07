// npm install formik yup react-redux
import React, { useState } from 'react'
import { Layout, Form, Input, Button, DatePicker, Select } from 'antd'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import {
  registerEventAction,
  updateEventAction,
  deleteEventAction,
} from '../../store/events/Events.actions.js'

const { Content } = Layout
const { Option } = Select

const EventsRegistry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleEventAction = async (data, actionType) => {
    try {
      setIsLoading(true)
      switch (actionType) {
        case 'create':
          await dispatch(registerEventAction(data))
          break
        case 'update':
          await dispatch(updateEventAction(data))
          break
        case 'delete':
          await dispatch(deleteEventAction(data))
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
    event_name: Yup.string().required(
      'Event Name ist ein verpflichtendes Feld'
    ),
    event_date: Yup.date().required('Event Datum ist ein verpflichtendes Feld'),
    location: Yup.string(),
    event_category: Yup.number().required(
      'Kategorie ist ein verpflichtendes Feld'
    ),
  })

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        <h2 style={styles.title}>Event Registrieren</h2>
        <Formik
          initialValues={{
            event_name: '',
            event_date: null,
            location: '',
            event_category: undefined,
          }}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={async (values, { setSubmitting }) => {
            const formattedValues = {
              ...values,
              event_date: values.event_date
                ? values.event_date.format('DD.MM.YYYY')
                : null, // Datum formatieren
            }
            setSubmitting(false)
            handleEventAction(formattedValues, 'create')
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <Form style={styles.form} onFinish={handleSubmit}>
              <Form.Item
                validateStatus={
                  errors.event_name && touched.event_name ? 'error' : ''
                }
                help={
                  errors.event_name && touched.event_name
                    ? errors.event_name
                    : ''
                }
              >
                <Input
                  name="event_name"
                  placeholder="Event Name"
                  onChange={handleChange}
                  value={values.event_name}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.event_date && touched.event_date ? 'error' : ''
                }
                help={
                  errors.event_date && touched.event_date
                    ? errors.event_date
                    : ''
                }
              >
                <DatePicker
                  name="event_date"
                  format="DD.MM.YYYY"
                  placeholder="Datum auswählen"
                  onChange={(date, dateString) =>
                    setFieldValue('event_date', date)
                  }
                  value={values.event_date}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  name="location"
                  placeholder="Ort"
                  onChange={handleChange}
                  value={values.location}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.event_category && touched.event_category ? 'error' : ''
                }
                help={
                  errors.event_category && touched.event_category
                    ? errors.event_category
                    : ''
                }
              >
                <Select
                  name="event_category"
                  placeholder="Kategorie"
                  onChange={(value) => setFieldValue('event_category', value)}
                  value={values.event_category}
                  style={{ width: '100%' }}
                >
                  <Option value="Meeting">Meeting</Option>
                  <Option value="Meetup">Meet-up</Option>
                  <Option value="Sozialaktion">Sozialaktion</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  loading={isLoading}
                  style={styles.registerButton}
                  onClick={() => handleEventAction(values, 'create')}
                >
                  Event Registrieren
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
  guestButton: {
    width: '100%',
    marginTop: '10px',
    borderRadius: '15px',
  },
}

export default EventsRegistry
