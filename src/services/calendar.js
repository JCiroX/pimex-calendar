import request from 'axios'
import config from '../../config.json'

const API_URL = true ? config.calendarApi.url : 'http://localhost:5000'

const calendar = {}

// Calendar

calendar.getCalendarById = async (boardName, calendarId) => {
  const { data: calendar } = await request.get(
    `${API_URL}/calendar/${calendarId}`
  )
  return calendar
}

// Meetings

calendar.getMeetingById = async meetingId => {
  const { data: meeting } = await request.get(`${API_URL}/event/${meetingId}`)
  return meeting
}

calendar.insertMeeting = async (calendarInfo, selectedHour) => {
  const { data: meeting } = await request.post(`${API_URL}/event`, {
    calendarInfo,
    selectedHour
  })
  return meeting
}

calendar.updateMeeting = async meetingData => {
  const meetingId = meetingData.id
  delete meetingData.id
  const { data: meeting } = await request.put(
    `${API_URL}/event/${meetingId}`,
    meetingData
  )
  return meeting
}

calendar.updateMeetingState = async (meetingId, newState) => {
  const { data: meeting } = await request.patch(
    `${API_URL}/event/state/${meetingId}`,
    { newState }
  )
  return meeting
}

calendar.rescheduleMeeting = async meetingData => {
  const meetingId = meetingData.id
  delete meetingData.id
  const { data: meeting } = await request.post(
    `${API_URL}/event/reschedule/${meetingId}`,
    meetingData
  )
  return meeting
}

// Utils

calendar.padHour = (len, n) => {
  return (new Array(len + 1).join('0') + n).slice(-len)
}

calendar.getAvaiableHours = async (calendarData, selectedDay) => {
  const { data: availableHours } = await request.post(
    `${API_URL}/google/available-hours`,
    { calendarData, selectedDay }
  )
  console.log(availableHours)
  return availableHours
}

export default calendar
