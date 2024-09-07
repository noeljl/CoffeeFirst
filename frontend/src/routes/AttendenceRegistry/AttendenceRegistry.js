import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete, Input, Layout, Typography, Button, Space } from 'antd'
import {
  fetchAttendeesForEventAction,
  updateAttendeesForEventAction,
} from '../../store/attendeeEvents/AttendeeEvents.actions.js'
import { fetchEventsAction } from '../../store/events/Events.actions.js'

const { Content } = Layout
const { Title } = Typography
const { Search } = Input

const AttendanceRegistry = () => {
  const dispatch = useDispatch()

  const attendees = useSelector((state) => state.attendeeEvents.eventAttendees)
  const events = useSelector((state) => state.events.events)
  console.log(attendees)

  const [eventOptions, setEventOptions] = useState([])
  const [attendeeOptions, setAttendeeOptions] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [attendeeTimesMap, setAttendeeTimesMap] = useState({})
  const [dropdownVisible, setDropdownVisible] = useState(false) // New state to control dropdown visibility

  useEffect(() => {
    dispatch(fetchEventsAction())
  }, [dispatch])

  useEffect(() => {
    if (selectedEvent) {
      dispatch(fetchAttendeesForEventAction(selectedEvent.id))
    }
  }, [dispatch, selectedEvent])

  useEffect(() => {
    if (attendees && attendees.length > 0) {
      const initialTimesMap = attendees.reduce((acc, attendee) => {
        acc[attendee.attendee_id] = attendee.times_attended || 0
        return acc
      }, {})
      setAttendeeTimesMap(initialTimesMap)
    }
  }, [attendees])

  useEffect(() => {
    setEventOptions(generateEventOptions(events))
  }, [events])

  useEffect(() => {
    setAttendeeOptions(
      generateAttendeeOptions(attendees, searchValue, attendeeTimesMap)
    )
  }, [attendees, searchValue, attendeeTimesMap])

  const onEventSearch = (value) => {
    setEventOptions(generateEventOptions(events, value))
  }

  const onAttendeeSearch = (value) => {
    setSearchValue(value)
    setDropdownVisible(true) // Ensure the dropdown stays visible on search
  }

  const generateEventOptions = (events, searchValue = '') => {
    return events
      .filter((event) =>
        event.event_name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
      .map((event) => ({
        value: event.event_name,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{event.event_name}</span>
            <span
              style={{
                backgroundColor: getCategoryColor(event.event_category),
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '12px',
                marginLeft: '10px',
                fontSize: '12px',
              }}
            >
              {event.event_category}
            </span>
          </div>
        ),
        id: event.event_id,
        key: event.event_id,
      }))
  }

  const generateAttendeeOptions = (attendees, searchValue, timesMap) => {
    return attendees
      .filter(
        (attendee) =>
          attendee.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          (attendee.middleName &&
            attendee.middleName
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          attendee.lastName.toLowerCase().includes(searchValue.toLowerCase())
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
              <span
                style={{
                  backgroundColor: getAttendeeCategoryColor(
                    attendee.attendee_category
                  ),
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  marginLeft: '10px',
                  fontSize: '12px',
                }}
              >
                {attendee.attendee_category}
              </span>
              <Button
                type="primary"
                onClick={(e) => decrementTimeAttended(attendee.attendee_id)}
                disabled={timesMap[attendee.attendee_id] === 0}
              >
                -
              </Button>
              <span
                style={{
                  display: 'inline-block',
                  width: '40px',
                  textAlign: 'center',
                }}
              >
                {timesMap[attendee.attendee_id]}
              </span>
              <Button
                type="primary"
                onClick={(e) => incrementTimeAttended(attendee.attendee_id)}
              >
                +
              </Button>
            </Space>
          </div>
        ),
      }))
  }

  const getAttendeeCategoryColor = (category) => {
    switch (category) {
      case 'Mitglied':
        return 'blue' // Blau für Mitglieder
      case 'Gast':
        return 'green' // Grün für Gäste
      default:
        return 'gray' // Standardfarbe für unbekannte Kategorien
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Meetup':
        return 'green' // Grün für Kategorie 'a'
      case 'Sozialaktion':
        return 'yellow' // Gelb für Kategorie 'b'
      case 'Meeting':
        return 'blue' // Rot für Kategorie 'c'
      default:
        return 'gray' // Standardfarbe, falls keine Kategorie zugewiesen ist
    }
  }

  const incrementTimeAttended = (attendeeId) => {
    const newTimes = (attendeeTimesMap[attendeeId] || 0) + 1
    updateLocalTimesAttended(attendeeId, newTimes)
    dispatch(
      updateAttendeesForEventAction({
        attendeeId,
        incrementBy: 1,
        eventID: selectedEvent.id,
      })
    )
  }

  const decrementTimeAttended = (attendeeId) => {
    const newTimes = Math.max(0, (attendeeTimesMap[attendeeId] || 0) - 1)
    updateLocalTimesAttended(attendeeId, newTimes)
    dispatch(
      updateAttendeesForEventAction({
        attendeeId,
        incrementBy: -1,
        eventID: selectedEvent.id,
      })
    )
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

  const handleEventSelect = (value, option) => {
    setSelectedEvent({ id: option.id, name: value })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          padding: '20px',
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
            marginBottom: '20px',
            marginTop: '100px',
            fontSize: '32px',
            textAlign: 'center',
          }}
        >
          Rotaract Event Search
        </Title>
        <AutoComplete
          options={eventOptions}
          onSearch={onEventSearch}
          onSelect={handleEventSelect}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <Search
            placeholder="Suche nach einem Event"
            enterButton="Search"
            size="large"
            style={{ width: '100%' }}
          />
        </AutoComplete>
        {selectedEvent && (
          <>
            <Title
              level={4}
              style={{
                color: '#fff',
                marginBottom: '20px',
                marginTop: '20px',
                fontSize: '24px',
                textAlign: 'center',
              }}
            >
              Teilnehmer für Event: {selectedEvent.name}
            </Title>
            <AutoComplete
              options={attendeeOptions}
              onSearch={onAttendeeSearch}
              open={dropdownVisible} // Keep the dropdown visible
              onFocus={() => setDropdownVisible(true)} // Ensure dropdown stays open on focus
              onBlur={() => setDropdownVisible(true)} // Keep dropdown open even on blur
              style={{ width: '100%', maxWidth: '600px' }}
            >
              <Search
                placeholder="Suche nach einem registrierten Mitglied oder Gast"
                enterButton="Search"
                size="large"
                style={{ width: '100%' }}
              />
            </AutoComplete>
          </>
        )}
      </Content>
    </Layout>
  )
}

export default AttendanceRegistry
