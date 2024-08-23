import React, { useState, useEffect } from 'react'
import { Table, Layout, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAttendeesAction } from '../../store/attendees/Attendees.actions.js'

const { Content } = Layout
const { Title } = Typography

const AttendanceTable = () => {
  const [sortedInfo, setSortedInfo] = useState({
    order: 'descend',
    columnKey: 'timesAttended',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const attendees = useSelector((state) => state.attendees.attendees)

  useEffect(() => {
    console.log('Fetching Attendees ...')
    dispatch(fetchAttendeesAction())
  }, [dispatch])

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter)
    setCurrentPage(pagination.current)
  }

  const sortedAttendeesByAttendance = [...attendees].sort(
    (a, b) => b.timesAttended - a.timesAttended
  )

  const columns = [
    {
      title: 'Position',
      key: 'position',
      render: (text, record) => {
        const position =
          sortedAttendeesByAttendance.findIndex((att) => att.id === record.id) +
          1
        let backgroundColor
        if (position === 1) {
          backgroundColor = '#FFD700'
        } else if (position === 2) {
          backgroundColor = '#C0C0C0'
        } else if (position === 3) {
          backgroundColor = '#CD7F32'
        } else {
          backgroundColor = '#87CEEB'
        }
        return (
          <div
            style={{
              backgroundColor,
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {position}
          </div>
        )
      },
    },
    {
      title: 'Vorname',
      dataIndex: 'firstName',
      align: 'center',
      key: 'firstName',
    },
    {
      title: 'Mittelname',
      dataIndex: 'middleName',
      align: 'center',
      key: 'middleName',
    },
    {
      title: 'Nachname',
      dataIndex: 'lastName',
      align: 'center',
      key: 'lastName',
    },
    {
      title: 'Anzahl an Präsenzen',
      dataIndex: 'timesAttended',
      key: 'timesAttended',
      sorter: (a, b) => a.timesAttended - b.timesAttended,
      align: 'center',
      sortOrder: sortedInfo.columnKey === 'timesAttended' && sortedInfo.order,
      defaultSortOrder: 'descend',
    },
  ]

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: '#21226b',
      }}
    >
      <Content
        style={{
          margin: '75px auto',
          padding: '10px',
          width: '90%',
          maxWidth: '1500px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#21226b',
          }}
        >
          Teilnehmerübersicht
        </Title>
        <Table
          columns={columns}
          dataSource={attendees}
          onChange={handleChange}
          pagination={{ position: ['bottomCenter'], pageSize: 8 }}
          bordered
          scroll={{ x: 600 }} // Ermöglicht horizontales Scrollen bei kleineren Bildschirmen
        />
      </Content>
    </Layout>
  )
}

export default AttendanceTable
