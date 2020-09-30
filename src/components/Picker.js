import React, {Component} from 'react'
import {connect} from "react-redux"
import {updateSeat} from "../actions/registrationAction"
import PropTypes from "prop-types"
import SeatPicker from "react-seat-picker"


class Picker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      rows: this.buildRows(this.props.registrations)
    }
  }


  addSeatCallback = (row, number, id, cb) => {
    this.setState({
      loading: true
    }, async () => {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      this.props.updateSeat(id)
      // console.log(`Added seat ${number}, row ${row}, id ${id}`)

      if (this.props.auth.user.current_registration.status === 1) {
        const {name, nick} = this.props.auth.user
        const newTooltip = Picker.buildFullName(name, nick)
        cb(row, number, newTooltip)
      }
      this.setState({loading: false})
    })
  }

  removeSeatCallback = (row, number, id, cb) => {
    this.setState({
      loading: true
    }, async () => {
      this.props.updateSeat(null)
      // console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      cb(row, number, '')
      this.setState({loading: false})
    })
  }

  static buildFullName(name, nick) {
    if(!nick) return name
    let fullName = name.split(" ")
    fullName.splice(1, 0, '"' + nick + '"')
    return fullName.join(" ")
  }

  buildRows(regs) {
    const max_seats = 18
    let bigrow = 0
    let nrow = 8
    let ncol = 7
    let seat_counter = 2
    let bed_coutner = 0

    let sortedRegs = new Array(max_seats+1).fill(null);
    regs.forEach(function(registration) {
      if (registration.seat) {
        registration.tooltip = Picker.buildFullName(registration.user.name, registration.user.nick)
        sortedRegs[registration.seat] = registration
      }
    })

    // Seats 1 and 2
    let seat12 = []
    for (let i = 1; i <= 2; i++) {
      const reservation = sortedRegs[i] ? sortedRegs[i] : null
      let seat
      let orientation = ['', 'east', 'west']
      const nr = 'S'+i
      if (reservation) {
        if (reservation.user._id === this.props.auth.user._id)
          seat = {id: nr, number: nr, orientation: orientation[i], isSelected: true, tooltip: reservation.tooltip}
        else
          seat = {id: nr, number: nr, orientation: orientation[i], isReserved: true, tooltip: reservation.tooltip}
      }
      else
        seat = {id: i, number: nr, orientation: orientation[i]}
      seat12.push(seat)
    }
    const rows = [
      [null, null, null, null, seat12[0],null,seat12[1]],
      new Array(ncol).fill(null)
    ]

    // Rest of the Seats
    for (let r = 1; r <= nrow; r++) {
      let row = []
      if (r !== 3 && r !== 6) bigrow++
      for (let c = 1; c <= ncol; c++) {
        let nr = null
        let seat = null
        let orientation = 'north'
        if (c !== 4 && c !== 8 && r !== 3 && r !== 6) {
          if (c > 8 && bed_coutner <= 8) {
            nr = 'B' + ++bed_coutner
          } else if (bigrow & 1 && c <= 8) {
            // odd
            if (~c & 1) nr = 'S' + ++seat_counter
          } else if (c <= 8) {
            // even
            orientation = 'south'
            if (c & 1) nr = 'S' + ++seat_counter
          }

          if (nr !== null) {
            const reservation = sortedRegs[seat_counter] ? sortedRegs[seat_counter] : null
            if (reservation) {
              if (reservation.user._id === this.props.auth.user._id)
                seat = {id: nr, number: nr, orientation, isSelected: true, tooltip: reservation.tooltip}
              else
                seat = {id: nr, number: nr, orientation, isReserved: true, tooltip: reservation.tooltip}
            }
            else
              seat = {id: seat_counter, number: nr, orientation}
          }
        }
        row.push(seat)
      }
      rows.push(row)
    }
    return rows
  }

  render() {
    const {current_registration} = this.props.auth.user
    const {loading, rows} = this.state
    return (
      <div style={{display: '-webkit-box'}}>
          {rows ?
          <SeatPicker
            addSeatCallback={this.addSeatCallback}
            removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={(current_registration.status === 1 && current_registration.days >= 3)  ? 1 : 0}
            alpha
            visible={false}
            selectedByDefault={true}
            loading={loading}
          /> : null}
      </div>
    )
  }
}

Picker.propTypes = {
  auth: PropTypes.object.isRequired,
  registrations: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {updateSeat}
)(Picker);

