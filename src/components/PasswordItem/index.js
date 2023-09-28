import './index.css'

const PasswordItem = props => {
  const profileColors = [
    '#7683cb',
    '#f59e0b',
    '#10b981',
    '#f97316',
    '#14b8a6',
    '#b91c1c',
    '#0ea5e9',
  ]

  const profilePicColor = profileColors[Math.floor(Math.random()) * 10 - 4]
  const {recordDetails, showPassword, deleteRecord} = props
  const {id, url, username, password} = recordDetails

  const deletePasswordRecord = () => {
    deleteRecord(id)
  }

  const passwordPattern = showPassword ? (
    <p className="website-text">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-icon"
    />
  )

  return (
    <li className="password-item">
      <div className="circle" style={{background: profilePicColor}}>
        {username[0]}
      </div>
      <div>
        <p className="website-text">{url}</p>
        <p className="website-text">{username}</p>
        {passwordPattern}
      </div>
      <button type="button" className="delete-btn" data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          onClick={deletePasswordRecord}
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
