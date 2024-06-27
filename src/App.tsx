import { BaseSyntheticEvent, useState, useEffect } from 'react'
import './App.css'
import { formatInTimeZone, format } from 'date-fns-tz' // Import formatToTimeZone from date-fns-tz

const timezones = [
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'Central Time (CT)', value: 'America/Chicago' },
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'Alaska Time (AKT)', value: 'America/Anchorage' },
  { label: 'Hawaii-Aleutian Time (HST)', value: 'Pacific/Honolulu' },
]

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState('America/Denver')
  const [selectedDateTimeUTC, setSelectedDateTimeUTC] = useState('')
  const [selectedDateTimeLocal, setSelectedDateTimeLocal] = useState('')

  const handleTimezoneChange = (event: BaseSyntheticEvent) => {
    setSelectedTimezone(event.target.value)
  }

  const handleDateTimeChange = (event: BaseSyntheticEvent) => {
    const localDateTimeString = event.target.value
    const localDateTime = new Date(localDateTimeString)

    // Convert local datetime to UTC string
    const utcDateTimeString = localDateTime.toISOString()
    setSelectedDateTimeUTC(utcDateTimeString)

    // Update local datetime state
    setSelectedDateTimeLocal(localDateTimeString)
  }

  console.log('selectedDateTimeUTC:', selectedDateTimeUTC)
  console.log('selectedDateTimeLocal:', selectedDateTimeLocal)

  return (
    <div>
      <select value={selectedTimezone} onChange={handleTimezoneChange}>
        {timezones.map(timezone => (
          <option key={timezone.value} value={timezone.value}>
            {timezone.label}
          </option>
        ))}
      </select>

      <p>Selected Timezone: {selectedTimezone}</p>

      <input
        type='datetime-local'
        id='datetime-input'
        value={selectedDateTimeLocal.slice(0, 16)}
        onChange={handleDateTimeChange}
      />

      <hr />

      <p>
        Selected Time (Local):{' '}
        <strong>{format(selectedDateTimeLocal, 'hh:mm:ss a')}</strong>
      </p>

      <p>
        Selected Time (UTC):{' '}
        <strong>{selectedDateTimeUTC.slice(11, 16)}</strong>
      </p>

      <p>
        {`Formatted in ${selectedTimezone}: `}
        <strong>
          {selectedDateTimeUTC &&
            formatInTimeZone(
              selectedDateTimeUTC,
              selectedTimezone,
              'hh:mm:ss a',
            )}
        </strong>
      </p>
    </div>
  )
}

export default App
