import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Button from '../components/Buttons.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { logoutMemberAction } from '../store/auth/Auth.actions.js'
import NavBar from '../components/navbar/Navbar'
import Footer from '../components/Footer.jsx'
import MenuMobile from '../components/navbar/MenuMobile'
import { useMediaQuery } from 'react-responsive'
import { CheckInButton } from '../components/Buttons.jsx'

export default function ProfilePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const member = useSelector((state) => state.auth.member)
  const isMobile = useMediaQuery({ maxWidth: 900 })

  const handleLogout = async () => {
    await dispatch(logoutMemberAction())
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '2rem 1rem 5rem 1rem' : '3rem 0', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', marginBottom: 8, border: '2px solid #eee', background: '#fafafa' }}>
            <Avatar />
          </div>
          <div style={{ fontWeight: 600, fontSize: '1.3rem', color: '#222', textAlign: 'center' }}>{member?.firstName} {member?.lastName}</div>
          <div style={{ color: '#888', fontSize: '1rem', textAlign: 'center' }}>{member?.email}</div>
        </div>
        <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <CheckInButton />
          <Button bg="white" fs="medium" radius="full" padding="medium" width="full" onClick={() => navigate('/account-settings/personal')}>
            Account Settings
          </Button>
          {isMobile && (
            <Button bg="white" fs="medium" radius="full" padding="medium" width="full" onClick={() => navigate('/account-settings/membership')}>
              Membership
            </Button>
          )}
          <Button bg="black" fs="medium" radius="full" padding="medium" width="full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <Footer />
      {isMobile && <MenuMobile />}
    </div>
  )
} 