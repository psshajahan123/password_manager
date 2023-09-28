import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteUrl: '',
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    searchInput: '',
  }

  deleteRecord = id => {
    const {passwordsList} = this.state
    const filteredPasswordsRecord = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordsList: filteredPasswordsRecord})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteUrl: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeCheck = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  addPasswordRecord = event => {
    event.preventDefault()

    const {websiteUrl, usernameInput, passwordInput} = this.state
    const newPasswordRecord = {
      id: uuidv4(),
      url: websiteUrl,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordRecord],
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchRecords = () => {
    const {passwordsList, searchInput} = this.state
    const searchResults = passwordsList.filter(eachRecord =>
      eachRecord.url.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  render() {
    const {showPassword} = this.state
    const searchResults = this.getSearchRecords()
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-header">
            <img
              className="app-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </div>
          <div className="manager-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
            <div className="form-container">
              <form
                className="form-responsive"
                onSubmit={this.addPasswordRecord}
              >
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="website-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <input
                    className="input-element"
                    placeholder="Enter Website"
                    type="text"
                    onChange={this.onChangeWebsiteInput}
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="website-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    className="input-element"
                    placeholder="Enter Username"
                    type="text"
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="website-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    className="input-element"
                    placeholder="Enter Password"
                    type="password"
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="btn-container">
                  <button
                    type="button"
                    onClick={this.addPasswordRecord}
                    className="add-button"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="password-card-container">
            <div className="passwords-container">
              <div className="passwords-header">
                <h1 className="password-section-heading">
                  Your Passwords
                  <span className="search-results-count">
                    {searchResults.length}
                  </span>
                </h1>
                <div className="search-container">
                  <div className="search-icon-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
              <hr className="hr-line" />

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="checkbox-input"
                  onChange={this.onChangeCheck}
                />
                <label htmlFor="checkbox" className="checkbox-label">
                  Show Passwords
                </label>
              </div>

              {searchResults.length === 0 ? (
                <div className="no-passwords-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-passwords-title">No Passwords</p>
                </div>
              ) : (
                <ul className="password-list-container">
                  {searchResults.map(eachRecord => (
                    <PasswordItem
                      key={eachRecord.id}
                      recordDetails={eachRecord}
                      showPassword={showPassword}
                      deleteRecord={this.deleteRecord}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
