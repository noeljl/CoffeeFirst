import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

const EventSuccess = () => {
  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          Du wurdest erfolgreich für das Event registriert. Viel Spaß!
        </h2>
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
    textAlign: 'center',
  },
  title: {
    color: '#D51067',
  },
}

export default EventSuccess
