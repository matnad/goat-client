import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {register} from '../actions/registrationAction'

class RegStatus extends Component {

  constructor(props) {
    super(props)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleDays = this.handleDays.bind(this)
    if (this.props.auth.user.current_registration) {
      this.state = {
        status: this.props.auth.user.current_registration.status !== undefined
            ? this.props.auth.user.current_registration.status : 1,
        days: this.props.auth.user.current_registration.days !== undefined
            ? this.props.auth.user.current_registration.days : 3
      }
    } else {
      this.state = {
        status: 1,
        days: 3
      }
    }
  }

  handleStatus(e) {
    const newStatus = parseInt(e.target.value)
    if (newStatus >= 1 && newStatus <= 3) {
      if (this.props.autoSave) {
        this.props.register(newStatus, this.state.days)
      }
      this.setState({
        status: newStatus
      })
    }
  }

  handleDays(e) {
    const {days, status} = this.state
    const choice = parseInt(e.target.value)

    let newDays
    if ((choice & days) > 0) {
      // Deselect
      newDays = choice ^ days
    } else {
      // Select
      newDays = choice | days
    }
    if (newDays >= 1 && newDays <= 3) {
      if (this.props.autoSave) {
        this.props.register(status, newDays)
      }
      this.setState({
        days: newDays
      })
    }

  }

  render() {
    const {status, days} = this.state


    const btnColors = [
      status === 1 ? 'bg-success' : 'bg-secondary',
      status === 2 ? 'bg-info' : 'bg-secondary',
      status === 3 ? 'bg-danger' : 'bg-secondary',
    ]
    const btnTexts = [
      'Ich melde mich für die 7. GOAT LAN an',
      'Ich melde mich provisorisch für die 7. GOAT LAN an',
      'Ich kann leider nicht an dern 7. GOAT LAN dabei sein'
    ]
    const daysText = [
      'Freitag-Samstag', 'Samstag-Sonntag'
    ]

    return (
      <div className="btn-group-vertical" role="group" aria-label="Status Group">

        <button type="button" className={"btn btn-secondary " + btnColors[0]}
                value={1} onClick={this.handleStatus}
        >
          {btnTexts[0]}
        </button>

        {
          status === 1 ?
            <div className="btn-group" role="group" aria-label="Days Group">
              <button type="button"
                      className={"btn btn-secondary " + ((1 & days) > 0 ? btnColors[0] : 'bg-secondary')}
                      value={1} onClick={this.handleDays}
              >
                {daysText[0]}
              </button>
              <button type="button"
                      className={"btn btn-secondary " + ((2 & days) > 0 ? btnColors[0] : 'bg-secondary')}
                      value={2} onClick={this.handleDays}
              >
                {daysText[1]}
              </button>
            </div>
            : ''
        }

        <button type="button" className={"btn btn-secondary " + btnColors[1]}
                value={2} onClick={this.handleStatus}
        >
          {btnTexts[1]}
        </button>

        {
          status === 2 ?
            <div className="btn-group" role="group" aria-label="Days Group">
              <button type="button"
                      className={"btn btn-secondary " + ((1 & days) > 0 ? btnColors[1] : 'bg-secondary')}
                      value={1} onClick={this.handleDays}
              >
                {daysText[0]}
              </button>
              <button type="button"
                      className={"btn btn-secondary " + ((2 & days) > 0 ? btnColors[1] : 'bg-secondary')}
                      value={2} onClick={this.handleDays}
              >
                {daysText[1]}
              </button>
            </div>
            : ''
        }

        <button type="button" className={"btn btn-secondary " + btnColors[2]}
                value={3} onClick={this.handleStatus}
        >
          {btnTexts[2]}
        </button>
      </div>
    )
  }
}

RegStatus.propTypes = {
  auth: PropTypes.object.isRequired,
  autoSave: PropTypes.bool
}

RegStatus.defaultProps = {
  autoSave: true
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {register},
  null,
  { forwardRef : true }
)(RegStatus);
