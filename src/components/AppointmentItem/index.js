// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isToggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const isToggleStarred = () => {
    isToggleStar(id)
  }
  return (
    <li className="title-time-starred-container">
      <div>
        <p>{title}</p>
        <p>{date}</p>
      </div>
      <button
        className="button-star-image"
        onClick={isToggleStarred}
        data-testid="star"
      >
        <img src={starImageUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
