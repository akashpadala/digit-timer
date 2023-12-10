// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    timerMinutes: 25,
    seconds: 0,
    isTimerStarted: false,
  }

  onClickIncrement = () => {
    this.setState(prevState => ({
      minutes: parseInt(prevState.minutes) + 1,
      timerMinutes: parseInt(prevState.timerMinutes) + 1,
    }))
  }

  onClickDecrement = () => {
    const {timerMinutes} = this.state

    if (timerMinutes > 0) {
      this.setState(prevState => ({
        minutes: parseInt(prevState.minutes) - 1,
        timerMinutes: parseInt(prevState.timerMinutes) - 1,
      }))
    }
  }

  onStartTimer = () => {
    this.setState(prevState => ({
      isTimerStarted: !prevState.isTimerStarted,
    }))
    this.timerId = setInterval(this.timer, 1000)
  }

  onPauseTimer = () => {
    this.setState(prevState => ({
      isTimerStarted: !prevState.isTimerStarted,
    }))
    clearInterval(this.timerId)
  }

  onClickReset = () => {
    this.setState({
      minutes: 25,
      timerMinutes: 25,
      seconds: 0,
      isTimerStarted: false,
    })
    clearInterval(this.timerId)
  }

  timer = () => {
    const {seconds} = this.state
    if (seconds <= 0) {
      this.setState(prevState => ({
        timerMinutes: prevState.timerMinutes - 1,
        seconds: 59,
      }))
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  render() {
    const {minutes, timerMinutes, seconds, isTimerStarted} = this.state
    const altValue = isTimerStarted ? 'pause icon' : 'play icon'
    const timeStatus = isTimerStarted ? 'Pause' : 'Start'
    const timerStatus = isTimerStarted ? 'Running' : 'Paused'
    const activeStateMethod = isTimerStarted
      ? this.onPauseTimer
      : this.onStartTimer
    let stopTimerMinutes = timerMinutes
    let stopTimerSeconds = seconds
    const imgUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    if (timerMinutes < 10) {
      stopTimerMinutes = `0${timerMinutes}`
    }
    if (seconds < 10) {
      stopTimerSeconds = `0${stopTimerSeconds}`
    }
    return (
      <div className="bg-container">
        <div className="inner-container">
          <h1 className="title"> Digital Timer </h1>
          <div className="inner-card-container">
            <div className="inner-card-container-1">
              <div className="timer-container">
                <h1 className="timer">
                  {stopTimerMinutes}:{stopTimerSeconds}
                </h1>
                <p className="description"> {timerStatus} </p>
              </div>
            </div>
            <div className="inner-card-container-2">
              <div className="action-buttons">
                <div className="action-button-1">
                  <button
                    className="action-button"
                    onClick={activeStateMethod}
                    type="button"
                  >
                    <img
                      src={imgUrl}
                      alt={altValue}
                      className="action-button-img"
                    />
                    <p className="action-name"> {timeStatus} </p>
                  </button>
                </div>
                <div className="action-button-1">
                  <button
                    className="action-button"
                    onClick={this.onClickReset}
                    type="button"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="action-button-img"
                    />
                    <p className="action-name"> Reset </p>
                  </button>
                </div>
              </div>
              <div className="set-timer-container">
                <p className="set-timer-text"> Set Timer Limit </p>
                <div className="set-timer-inner-container">
                  <button
                    className="action-button button"
                    disabled={seconds > 0}
                    onClick={this.onClickDecrement}
                    type="button"
                  >
                    -
                  </button>
                  <div className="time-limit-container">
                    <p className="time"> {minutes} </p>
                  </div>
                  <button
                    className="action-button button"
                    disabled={seconds > 0}
                    onClick={this.onClickIncrement}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
