import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, Layout, Space, message } from 'antd'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

import { fetchEventAction } from '../../store/events/Events.actions.js'

import { updateAttendeesForEventAction } from '../../store/attendeeEvents/AttendeeEvents.actions.js'

import GradientButton from '../../components/GradientButton/GradientButton.js'

const { Title, Text } = Typography
const { Content } = Layout

const EventHome = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

  // Extract eventID from URL
  const pathParts = location.pathname.split('/')
  const eventID = pathParts[2]

  const userState = useSelector((state) => state.attendee.attendee)
  const eventState = useSelector((state) => state.events.event)
  const [init, setInit] = useState(false)
  const [eventData, setEventData] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate() // Use navigate for redirection

  // Fetch event data when eventID or token change
  useEffect(() => {
    if (eventID && token) {
      dispatch(fetchEventAction({ eventID, token }))
    }
  }, [dispatch, eventID, token])

  // Update local eventData when eventState changes
  useEffect(() => {
    if (eventState) {
      setEventData(eventState)
    }
  }, [eventState])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const handleRegisterAttendeeForEvent = async () => {
    const attendeeId = userState?.attendee_id
    const eventId = eventData?.event_id

    if (attendeeId && eventId) {
      // Dispatch the action to update attendees for the event
      await dispatch(
        updateAttendeesForEventAction({
          attendeeId,
          incrementBy: 1,
          eventID: eventId,
        })
      )

      // Redirect to the success page after registration
      navigate(`/event/${eventId}/success`) // Redirect to a success page
    }
  }

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: '#ffffff' } },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: '#D51067' },
        links: {
          color: '#D51067',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: { enable: true, outModes: { default: 'bounce' }, speed: 2 },
        number: { density: { enable: true }, value: 80 },
        opacity: { value: 0.5 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  )

  if (!userState) {
    return <div>Loading...</div>
  }

  return (
    <Layout style={styles.layout}>
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          style={styles.particles}
        />
      )}
      <Content style={styles.content}>
        <Title level={2} style={styles.title}>
          Willkommen beim heutigen Event, {userState?.firstName}!
        </Title>

        {eventData && (
          <div style={styles.eventDetailsBox}>
            <Title level={3} style={styles.eventName}>
              {eventData.event_name}
            </Title>
            <Text>{eventData.description}</Text>
          </div>
        )}

        <Space style={{ marginTop: 17 }} size={20}>
          <GradientButton
            type="primary"
            size="large"
            onClick={handleRegisterAttendeeForEvent} // Updated to use the new handler
          >
            Für Event Anmelden
          </GradientButton>
        </Space>
      </Content>
    </Layout>
  )
}

const styles = {
  layout: {
    position: 'relative',
    overflow: 'hidden',
    padding: '24px',
  },
  content: {
    zIndex: 1,
    padding: 24,
    margin: 0,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  // #D51067
  title: {
    marginTop: '300px',
    fontSize: '50px',
    color: '#D51067',
    textAlign: 'center',
  },
  particles: {
    position: 'absolute',
    top: '200px',
    left: 0,
    width: '100%',
    height: 'calc(100% - 200px)',
    zIndex: 0,
  },
  eventDetailsBox: {
    marginTop: '20px',
    padding: '10px',
    border: '2px solid #D51067',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  eventName: {
    color: '#D51067',
    fontSize: '24px',
    marginBottom: '10px',
  },
}

export default EventHome
