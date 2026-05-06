import React, { useEffect, useState } from 'react'

const days = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

const formatDateTime = (date) => {
  const day = days[date.getDay()]
  const month = months[date.getMonth()]
  const dayOfMonth = date.getDate()

  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  if (hours === 0) {
    hours = 12
  } else if (hours > 12) {
    hours -= 12
  }

  return `${day} ${month} ${dayOfMonth} ${hours}:${minutes} ${ampm} `
}

const DataTime = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [])

  return <div>{formatDateTime(now)}</div>
}

export default DataTime