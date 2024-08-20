import React from 'react'
// npm install antd
import { Layout, Menu } from 'antd'

const { Header } = Layout

const items = [
  { label: 'Home', key: '1' },
  { label: 'About', key: '2' },
  { label: 'Contact', key: '3' },
]

const AppHeader = () => {
  return (
    <Layout>
      <Header style={styles.header}>
        <div style={styles.logo}>Rotaract Distrikt 1842</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
        />
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
  },
}

export default AppHeader
