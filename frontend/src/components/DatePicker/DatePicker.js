import React, { useState } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

export const DatePickerComponent = ({ setFieldValue, values }) => {
  // Interner State für das Datum
  const [date, setDate] = useState(
    values.event_date ? moment(values.event_date, 'YYYY-MM-DD') : null
  )

  return (
    <DatePicker
      picker="date" // Stelle sicher, dass nur normale Monatswechsel stattfinden
      defaultValue={moment()} // Initialisiere das Startdatum auf das heutige Datum
      value={date} // Nutze den internen State, um das Datum zu kontrollieren
      format="DD.MM.YYYY" // Anzeigeformat des DatePickers
      onChange={(date) => {
        if (date) {
          const formattedDate = moment(date).format('YYYY-MM-DD') // Formatierung in das gewünschte Format
          setDate(moment(date)) // Aktualisiere den internen State
          setFieldValue('event_date', formattedDate) // Setze das Datum im Formik-Formular
        } else {
          setDate(null) // Setze den State zurück, wenn kein Datum ausgewählt wurde
          setFieldValue('event_date', null) // Setze das Feld im Formular auf null
        }
      }}
      disabledDate={(current) => current && current > moment().endOf('day')} // Verhindere zukünftige Daten
      style={{ width: '100%', color: 'inherit' }} // Stil für korrekte Anzeige
    />
  )
}
