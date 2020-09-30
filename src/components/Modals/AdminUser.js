import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal} from "react-bootstrap"
import {CURRENT_LAN} from "../../config"
import {changeAdminComment, changeMember, changePaid, changeSeat} from "../../actions/adminActions"
import {hideModal} from "../../actions/modalActions"

class ModalContainer extends Component {

  modalType = 'adminUser'

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      saving: false
    };
    this.closeModal = this.closeModal.bind(this)
    this.changeMember = this.changeMember.bind(this)
    this.changePaid = this.changePaid.bind(this)
    this.changeSeat = this.changeSeat.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
    this.changeAdminComment = this.changeAdminComment.bind(this)
  }

componentDidUpdate(prevProps, prevState, snapshot) {

    // Require correct modal type
    if (this.props.modalType !== this.modalType && prevProps.modalType !== this.modalType)
      return

    // Set state
    if (this.props !== prevProps) {
      this.setState({
        modalIsOpen: this.props.modalProps.open
      })

      if (this.props.modalProps.open) {
        const user = this.props.admin.users[this.props.modalProps.message]
        const reg = user.registrations[CURRENT_LAN]
        this.setState({
          email: user.email,
          initMember: user.member,
          member: user.member,
          status: reg.status,
          days: reg.days,
          initPaid: reg.paid,
          paid: reg.paid,
          initSeat: reg.seat ? reg.seat : 0,
          seat: reg.seat ? reg.seat : 0,
          initAdminComment: user.adminComment ? user.adminComment : '',
          adminComment: user.adminComment ? user.adminComment : '',
          userComment: user.userComment ? user.userComment : '',
        })
      }
    }

  }

  closeModal() {
    // this.setState({ modalIsOpen: false })
    this.props.hideModal()
  }

  changeMember(event) {
    const {name} = event.target.dataset
    let member
    if (name === 'isMember') {
      member = this.state.member === 0 ? 1 : 0
    } else if (name === 'isMemberPaid') {
      member = this.state.member === 1 ? 2 : 1
    }
    this.setState({
      member
    })
  }

  changePaid() {
    const paid = (this.state.paid + 1) % 2
    this.setState({paid})
  }

  changeSeat(event) {
    this.setState({
      seat: event.target.value
    })
  }

  changeAdminComment(event) {
      this.setState({
        adminComment: event.target.value
      })
  }

  saveChanges() {
    const id = this.props.modalProps.message

    if (this.state.initMember !== this.state.member) {
      this.props.changeMember(id, this.state.member)
    }

    if (this.state.initPaid !== this.state.paid) {
      this.props.changePaid(id, this.state.paid)
    }

    if (this.state.initSeat !== this.state.seat) {
      this.props.changeSeat(id, this.state.seat)
    }

    if (this.state.initAdminComment !== this.state.adminComment) {
      this.props.changeAdminComment(id, this.state.adminComment)
    }

    this.closeModal()
  }

  renderSeatOptions() {
    const users = this.props.admin.users
    let registerdSeats = {}
    Object.values(users).forEach((user) => {
      if (user.registrations[CURRENT_LAN]) {
        registerdSeats[user.registrations[CURRENT_LAN].seat] = user.name
      }
    })

    let options = []
    for (let i = 0; i <= 20; i++) {
      let text = 'Sitz ' + i
      if (i === 0)
        text = 'Keine Sitzreservation'
      if (registerdSeats[i])
        text += ' (' + registerdSeats[i] + ')'
      options.push(<option key={i} value={i}>{text}</option>)
    }
    return options
  }

  render() {
    const statusText = ['', 'Angemeldet', 'Provisorisch', 'Abgemeldet']
    const daysText = ['Keine Abende (Fehler?)', 'Nur FR-SA', 'Nur SA-SO', 'Beide Abende']
    const memberText = ['Kein Mitglied', 'Mitglied', 'Mitglied']
    const paidMemberText = ['', 'Mitgliederbeitrag ausstehend', 'Mitgliederbeitrag bezahlt']
    const paidText = ['Lan noch nicht bezahlt', 'Lan bezahlt']
    const changedStyle = {color: '#39ff14', fontWeight: 500}

    return (
      <div>
        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalProps.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='ml-3'>
              <span >
                {this.state.email}<br />
              </span>
            <span
              className="cursor-pointer"
              style={this.state.initMember !== this.state.member ? changedStyle : null}
              data-name="isMember"
              onClick={this.changeMember}
            >
                {memberText[this.state.member % 3]}<br/>
              </span>
              {this.state.member > 0 ?
                <div className="ml-3">
                  <span
                    className="cursor-pointer"
                    style={this.state.initMember !== this.state.member ? changedStyle : null}
                    data-name="isMemberPaid"
                    onClick={this.changeMember}
                  >
                      {paidMemberText[this.state.member % 3]}<br/>
                  </span>
                </div> : null}
              <span
                className="cursor-pointer"
                style={this.state.initPaid !== this.state.paid ? changedStyle : null}
                onClick={this.changePaid}
              >
                {paidText[this.state.paid % 2]}<br/>
              </span>
              <span>Status: {statusText[this.state.status]} {this.state.status < 3 ? ' (' + daysText[this.state.days] + ')' : ''}<br/></span>
              <div className="form-group mt-2">
                <select
                  className="form-control"
                  id="seatSelector"
                  onChange={this.changeSeat}
                  value={this.state.seat}>
                  {this.renderSeatOptions()}
                </select>
              </div>
              <div className="form-group mt-2">
                <textarea
                  className="form-control"
                  rows={5}
                  id="seatSelector"
                  onChange={this.changeAdminComment}
                  value={this.state.adminComment}>
                </textarea>
              </div>
              {this.state.userComment ?
                <><p style={{fontWeight: 'bold'}}>User Kommentar</p>
                <p>{this.state.userComment}</p></> : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="secondary" onClick={this.saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.modal,
  admin: state.admin,
})

export default connect(
  mapStateToProps,
  {changeMember, changePaid, changeSeat, changeAdminComment, hideModal}
)(ModalContainer)
