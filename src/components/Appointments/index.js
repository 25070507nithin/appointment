// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  isToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateChange = event => {
    this.setState({dateInput: event.target.value})
  }

  filteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredList = this.filteredAppointmentList()
    const classNameFilter = isFilterActive ? 'filter' : ''
    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="input-container">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  id="title"
                  type="text"
                  placeholder="title"
                  className="input-title"
                  onChange={this.onTitleChange}
                  value={titleInput}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  id="date"
                  type="date"
                  className="input-title"
                  onChange={this.onDateChange}
                  value={dateInput}
                />
                <br />
                <button type="submit">Add</button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image-appointment"
              />
            </div>
          </div>
          <hr />

          <div className="appointment-starred-container">
            <h1>Appointments</h1>
            <button
              className={classNameFilter}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredList.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                appointmentDetails={appointment}
                isToggleStar={this.isToggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
