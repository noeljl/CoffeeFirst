import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  registerEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
  fetchEvent,
  updateEventCategory,
} from '../../apis/event.js'

export const registerEventAction = createAsyncThunk(
  'events/registerEvent',
  async (registerData, thunkAPI) => {
    try {
      const event = await registerEvent(registerData)
      console.log(event)
      return {}
    } catch (err) {
      throw err
    }
  }
)

export const updateEventAction = createAsyncThunk(
  'events/updateEvent',
  async (updateData, thunkAPI) => {
    try {
      const event = await updateEvent(updateData)
      console.log(event)
      return {}
    } catch (err) {
      throw err
    }
  }
)

export const deleteEventAction = createAsyncThunk(
  'events/deleteEvent',
  async (deleteData, thunkAPI) => {
    try {
      const event = await deleteEvent(deleteData)
      console.log(event)
      return {}
    } catch (err) {
      throw err
    }
  }
)

export const fetchEventsAction = createAsyncThunk(
  'events/fetchEvents',
  async (_, thunkAPI) => {
    try {
      console.log('fetchEventsAction activated')
      const events = await fetchEvents()
      console.log('action/events ' + JSON.stringify(events))
      return events
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response ? err.response.data : err)
    }
  }
)

export const fetchEventAction = createAsyncThunk(
  'events/fetchEvent',
  async ({ eventID, token }, thunkAPI) => {
    try {
      console.log('In events fetchEventAction')
      console.log(eventID, token)
      const event = await fetchEvent(eventID, token)
      console.log('Ergebnis aus fetchEvent in der Action'  + JSON.stringify(event))
      return event
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response ? err.response.data : err)
    }
  }
)

export const updateEventCategoryAction = createAsyncThunk(
  'events/updateEventCategory',
  async ({ eventID, newCategoryId }, thunkAPI) => {
    try {
      console.log('Kommt an bei events/updateEventCategory: ' + eventID)
      const updatedEvent = await updateEventCategory(eventID, newCategoryId)
      return updatedEvent
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response ? err.response.data : err.message
      )
    }
  }
)
