import React from 'react'
// npm install antd
import { Layout, Menu } from 'antd'

const { Header } = Layout

const items = [
  { label: '', key: '1' },
  { label: 'About', key: '2' },
  { label: 'Contact', key: '3' },
]

const AppHeader = () => {
  return (
    <Layout>
      <Header style={styles.header}>
        <div style={styles.logo}>Rotaract Distrikt 1842</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} />
      </Header>
    </Layout>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    backgroundColor: '#21226b',
  },
  logo: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    marginLeft: '100px',
  },
}

export default AppHeader
