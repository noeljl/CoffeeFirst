import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Footer from '../components/Footer'
import NavBar from '../components/navbar/Navbar'
import MenuMobile from '../components/navbar/MenuMobile'
import styles from './styles/ColumnLayout.module.css'

// This component provides a two-column layout with a sidebar and main content area. It's just a shell that can be used to design the two column dashboard and settings pages.

function ColumnLayout({ SidebarSlot, children, sidebarType }) {
  const isTablet = useMediaQuery({ maxWidth: 900 })

  return (
    <>
      <NavBar />
      <div className={styles.layoutContainer}>
        <aside className={styles.sidebar}>
          <SidebarSlot type={sidebarType} />
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
      {isTablet && <MenuMobile />}
    </>
  )
}

export default ColumnLayout
