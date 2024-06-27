import { BaseSyntheticEvent, useState, useEffect } from 'react'
import './App.css'
import { formatInTimeZone } from 'date-fns-tz' // Import formatToTimeZone from date-fns-tz

const timezones = [
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'Greenwich Mean Time (GMT)', value: 'Europe/London' },
  { label: 'Japan Standard Time (JST)', value: 'Asia/Tokyo' },
]

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0].value)
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

  useEffect(() => {
    // Set initial values for UTC and local datetime when selectedTimezone changes
    const localDateTime = selectedDateTimeUTC
      ? new Date(selectedDateTimeUTC)
      : new Date()
    const formattedDateTime = formatInTimeZone(
      localDateTime,
      selectedTimezone,
      'yyyy-MM-ddTHH:mm',
    )
    setSelectedDateTimeUTC(selectedDateTimeUTC || localDateTime.toISOString())
    setSelectedDateTimeLocal(formattedDateTime)
  }, [selectedTimezone])

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

      <p>Selected Date and Time (Local): {selectedDateTimeLocal}</p>

      <p>Selected Date and Time (UTC): {selectedDateTimeUTC}</p>

      <p>
        Selected Date and Time (Formatted in Timezone):{' '}
        {selectedDateTimeUTC &&
          formatInTimeZone(
            selectedDateTimeUTC,
            selectedTimezone,
            'yyyy-MM-dd HH:mm:ss',
          )}
      </p>
    </div>
  )
}

export default App
