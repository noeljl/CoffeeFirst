import React from 'react'
import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout

const AppHeader = () => {
  const navigate = useNavigate() // useNavigate-Hook für die Navigation

  const handleLogoClick = () => {
    navigate('/home') // Weiterleitung zur /home-Route
  }

  const handleStatisticsClick = () => {
    navigate('/statisticsTable') // Weiterleitung zur /statistics-Route
  }

  return (
    <Layout>
      <Header style={styles.header}>
        <div style={styles.logo} onClick={handleLogoClick}>
          Rotaract Distrikt 1842
        </div>
        <div style={styles.link} onClick={handleStatisticsClick}>
          Statistik
        </div>
      </Header>
    </Layout>
  )
}

const styles = {
  header: {
    position: 'fixed',
    zIndex: 10000,
    top: 0,
    left: 0,
    right: 0,
    height: '64px', // Höhe des Headers
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px', // Erhöhtes Padding für mehr Platz
    backgroundColor: '#21226b',
  },
  logo: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer', // Cursor als Zeiger für Logo
  },
  link: {
    color: 'white',
    fontSize: '15px', // Gleiche Schriftgröße wie das Logo
    fontWeight: 'bold', // Gleiche Schriftstärke wie das Logo
    cursor: 'pointer', // Cursor als Zeiger für den Link
  },
}

export default AppHeader
