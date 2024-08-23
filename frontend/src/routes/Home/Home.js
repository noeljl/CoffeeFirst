// import React from 'react'
// https://github.com/tsparticles/react/#readme
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography, Layout, Space } from 'antd'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

import GradientButton from '../../components/GradientButton/GradientButton.js'
import Button from '../../components/Button/Button.js'

const { Title, Text } = Typography
const { Content } = Layout

const Home = () => {
  const userState = useSelector((state) => state.user.user)
  const [init, setInit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = (container) => {
    console.log(container)
  }

  const toGuestRegistry = async () => {
    navigate('/guestRegistry')
  }

  const toAttendenceRegistry = async () => {
    navigate('/attendenceRegistry')
  }

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: '#ffffff', // Hintergrundfarbe weiß
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#21226b', // Partikelfarbe blau
        },
        links: {
          color: '#21226b', // Verbindungsfarbe der Partikel auch blau
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 2, // Geschwindigkeit
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
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
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
          style={styles.particles}
        />
      )}
      <Content style={styles.content}>
        <Title level={2} style={styles.title}>
          Willkommen zurück, {userState?.firstName}!
        </Title>
        {/* <Text>Rotaract hat dich lieb.</Text> */}
        <Space style={{ marginTop: 5 }} size={20}>
          <GradientButton type="primary" size="large" onClick={toGuestRegistry}>
            Gast registrieren
          </GradientButton>
          <Button size="large" onClick={toAttendenceRegistry}>
            Anwesenheit eintragen
          </Button>
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
    zIndex: 1, // Content über den Partikeln
    padding: 24,
    margin: 0,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: '300px',
    fontSize: '50px',
    color: '#21226b',
    textAlign: 'center',
  },
  particles: {
    position: 'absolute',
    top: '200px', // Verschiebe die Animation 200px nach unten
    left: 0,
    width: '100%',
    height: 'calc(100% - 200px)', // Passe die Höhe an, um den Platz für die Verschiebung zu lassen
    zIndex: 0,
  },
}

export default Home
