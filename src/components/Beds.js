import React, {Component} from 'react'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {pushToast} from "../actions/toastActions"
import {updateBed} from "../actions/registrationAction"


class Beds extends Component {

  constructor(props) {
    super(props)
    const emptyBeds = Beds.getEmptyBeds(this.props.registrations, this.props.maxBeds)
    this.state = {
      emptyBeds1: emptyBeds[0],
      emptyBeds2: emptyBeds[1],
      bed: this.props.auth.user.current_registration.bed ? this.props.auth.user.current_registration.bed : 0
    }
    this.handleBeds = this.handleBeds.bind(this)
  }

  static getEmptyBeds(registrations, maxBeds) {
    let emptyBeds = []
    emptyBeds.push(
      maxBeds - registrations.filter(reg => reg.bed && (1 & reg.bed) > 0).length
    )
    emptyBeds.push(
      maxBeds - registrations.filter(reg => reg.bed && (2 & reg.bed) > 0).length
    )
    return emptyBeds
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.user.current_registration.bed !== prevProps.auth.user.current_registration.bed) {

      this.setState({
        bed: this.props.auth.user.current_registration.bed,
      })
    }
  }

  handleBeds(e) {

    if (this.props.auth.user.current_registration.status !== 1) {
      this.props.pushToast("Bettreservation", "Du kannst nur ein Bett reservieren wenn du definitiv angemeldet bist.")
      return
    }

    const oldBeds = this.state.bed
    const choice = parseInt(e.target.value)

    let updateSuccess = true
    let newBeds
    if ((choice & oldBeds) > 0) {
      // Deselect
      newBeds = choice ^ oldBeds
      if (choice === 1) {
        this.setState({emptyBeds1: this.state.emptyBeds1 + 1})
      } else {
        this.setState({emptyBeds2: this.state.emptyBeds2 + 1})
      }
    } else {
      // Select
      newBeds = choice | oldBeds
      if (choice === 1) {
        if (this.state.emptyBeds1 > 0) {
          this.setState({emptyBeds1: this.state.emptyBeds1 - 1})
        } else {
          this.props.pushToast("Bettreservation", "Es sind für diesen Tag keine Betten mehr verfügbar.")
          updateSuccess = false
        }
      } else {
        if (this.state.emptyBeds2 > 0) {
          this.setState({emptyBeds2: this.state.emptyBeds2 - 1})
        } else {
          this.props.pushToast("Bettreservation", "Es sind für diesen Tag keine Betten mehr verfügbar.")
          updateSuccess = false
        }
      }
    }

    if (updateSuccess) {
      this.setState({bed: newBeds})
      this.props.updateBed(newBeds)
    }
  }

  render() {


    const {bed, emptyBeds1, emptyBeds2} = this.state
    return (
      <div  className="text-center">

        <div className="btn-group" role="group" aria-label="Bed Group">
          <button type="button"
                  className={"btn btn-secondary " + ((1 & bed) > 0 ? 'bg-success' : 'bg-secondary')}
                  value={1} onClick={this.handleBeds}
          >
            Bett FR - SA: {Math.max(0, emptyBeds1)} verfügbar
          </button>
          <button type="button"
                  className={"btn btn-secondary " + ((2 & bed) > 0 ? 'bg-success' : 'bg-secondary')}
                  value={2} onClick={this.handleBeds}
          >
            Bett SA - SO: {Math.max(0, emptyBeds2)} verfügbar
          </button>
        </div>
      </div>
    )
  }
}

Beds.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {pushToast, updateBed}
)(Beds);

