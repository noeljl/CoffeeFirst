import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete, Input, Layout, Typography, Button, Space } from 'antd'
import {
  fetchAttendeesAction,
  updateTimesAttendedAction,
} from '../../store/attendees/Attendees.actions.js'

const { Content } = Layout
const { Title } = Typography
const { Search } = Input

const AttendanceRegistry = () => {
  const dispatch = useDispatch()
  const attendees = useSelector((state) => state.attendees.attendees)
  const [options, setOptions] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [attendeeTimesMap, setAttendeeTimesMap] = useState({})

  useEffect(() => {
    console.log('Fetching Attendees ...')
    dispatch(fetchAttendeesAction())
  }, [dispatch])

  useEffect(() => {
    if (attendees && attendees.length > 0) {
      const initialTimesMap = attendees.reduce((acc, attendee) => {
        acc[attendee.id] = attendee.timesAttended
        return acc
      }, {})
      setAttendeeTimesMap(initialTimesMap)
    }
  }, [attendees])

  useEffect(() => {
    setOptions(generateOptions(attendees, searchValue, attendeeTimesMap))
  }, [attendees, searchValue, attendeeTimesMap])

  const onChange = (value) => {
    setSearchValue(value)
  }

  const generateOptions = (attendees, searchValue, timesMap) => {
    return attendees
      .filter(
        (attendee) =>
          attendee.firstName
            .toLowerCase()
            .startsWith(searchValue.toLowerCase()) ||
          (attendee.middleName &&
            attendee.middleName
              .toLowerCase()
              .startsWith(searchValue.toLowerCase())) ||
          attendee.lastName.toLowerCase().startsWith(searchValue.toLowerCase())
      )
      .map((attendee) => ({
        value: `${attendee.firstName} ${
          attendee.middleName ? attendee.middleName + ' ' : ''
        }${attendee.lastName}`,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{`${attendee.firstName} ${
              attendee.middleName ? attendee.middleName + ' ' : ''
            }${attendee.lastName}`}</span>
            <Space>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  decrementTimeAttended(attendee.id)
                }}
              >
                -
              </Button>
              <span>{timesMap[attendee.id]}</span>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  incrementTimeAttended(attendee.id)
                }}
              >
                +
              </Button>
            </Space>
          </div>
        ),
      }))
  }

  const incrementTimeAttended = (attendeeId) => {
    const newTimes = (attendeeTimesMap[attendeeId] || 0) + 1
    updateLocalTimesAttended(attendeeId, newTimes)
    dispatch(updateTimesAttendedAction({ attendeeId, incrementBy: 1 }))
  }

  const decrementTimeAttended = (attendeeId) => {
    const newTimes = (attendeeTimesMap[attendeeId] || 0) - 1
    updateLocalTimesAttended(attendeeId, newTimes)
    dispatch(updateTimesAttendedAction({ attendeeId, incrementBy: -1 }))
  }

  const updateLocalTimesAttended = (attendeeId, newTimes) => {
    setAttendeeTimesMap((prevTimesMap) => {
      const updatedMap = {
        ...prevTimesMap,
        [attendeeId]: newTimes,
      }
      return updatedMap
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#21226b',
        }}
      >
        <Title
          style={{
            color: '#fff',
            marginBottom: '30px',
            marginTop: '200px',
            fontSize: '50px',
          }}
        >
          Rotaract Search
        </Title>
        <AutoComplete
          options={options}
          onSearch={onChange}
          style={{ width: 600 }}
        >
          <Search
            placeholder="Suche nach einem registrierten Mitglied oder Gast"
            enterButton="Search"
            size="large"
          />
        </AutoComplete>
      </Content>
    </Layout>
  )
}

export default AttendanceRegistry
