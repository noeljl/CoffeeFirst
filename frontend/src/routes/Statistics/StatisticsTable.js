import React, { useState, useEffect } from 'react'
import { Table, Layout, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTotalAttendanceAction } from '../../store/attendeeEvents/AttendeeEvents.actions.js'

const { Content } = Layout
const { Title } = Typography

const AttendanceTable = () => {
  const [sortedInfo, setSortedInfo] = useState({
    order: 'descend',
    columnKey: 'total_times_attended',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const attendees = useSelector((state) => {
    console.log('Redux State:', state) // Debugging Log hinzufügen
    return state.attendeeEvents.totalAttendance
  })

  useEffect(() => {
    console.log('Dispatching fetchTotalAttendanceAction...') // Debugging Log hinzufügen
    dispatch(fetchTotalAttendanceAction())
  }, [dispatch])

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter)
    setCurrentPage(pagination.current)
  }

  // Füge der Teilnehmerliste eine Positionsnummer hinzu, die unabhängig von der Sortierung ist
  const attendeesWithPosition = attendees.map((attendee, index) => ({
    ...attendee,
    position: index + 1, // Position basiert auf der ursprünglichen Reihenfolge
    key: attendee.id || index, // Füge einen eindeutigen 'key' hinzu
  }))

  const columns = [
    {
      title: 'Position',
      key: 'position',
      dataIndex: 'position', // Nutze die vorberechnete Positionsnummer
      render: (text, record) => {
        const position = record.position
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
      dataIndex: 'total_times_attended',
      key: 'total_times_attended',
      sorter: (a, b) => a.total_times_attended - b.total_times_attended,
      align: 'center',
      sortOrder:
        sortedInfo.columnKey === 'total_times_attended' && sortedInfo.order,
      defaultSortOrder: 'descend',
    },
  ]

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: '#D51067',
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
            color: '#D51067',
          }}
        >
          Teilnehmerübersicht
        </Title>
        <Table
          columns={columns}
          dataSource={attendeesWithPosition} // Verwende die Liste mit Positionsnummern
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
