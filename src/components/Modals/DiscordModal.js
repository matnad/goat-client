import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal} from "react-bootstrap"
import {hideModal} from "../../actions/modalActions"
import {discordMessage} from "../../actions/discordActions"


class ModalContainer extends Component {

  modalType = 'discord'
  rcpts = ['Vorstand', 'Vicky', 'Remy', 'Matthias', 'Benni']

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      discordMsg: '',
      rcpt: ''
    };
    this.closeModal = this.closeModal.bind(this)
    this.changeMessage = this.changeMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeRcpt = this.changeRcpt.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Require correct modal type
    if (prevProps.modalType !== this.modalType && this.props.modalType !== this.modalType)
      return

    // Set state
    if (prevProps !== this.props) {
      this.setState({
        modalIsOpen: this.props.modalProps.open,
        discordMsg: this.props.modalProps.discordMsg ? this.props.modalProps.discordMsg : '',
        rcpt: this.props.modalProps.rcpt ? this.props.modalProps.rcpt : 'Vorstand'
      })
    }
  }

  changeRcpt(event) {
    this.setState({
      rcpt: event.target.value
    })
  }

  closeModal() {
    this.props.hideModal()
  }

  handleSubmit() {
    if (this.props.auth.user && this.props.auth.isAuthenticated) {
      this.props.discordMessage(this.state.discordMsg, this.state.rcpt)
    }
    this.closeModal()
  }

  changeMessage(event) {
    this.setState({
      discordMsg: event.target.value
    })
  }

  renderRcpts() {
    return this.rcpts.map((rcpt, index) => {
      return <option key={index} value={rcpt}>{rcpt}</option>
    })
  }

  render() {
    const {rcpt} = this.state
    const description = this.props.modalProps.message
    const {title} = this.props.modalProps
    const {isAuthenticated, user} = this.props.auth

    return (
      <div>
        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>{title != null && title !== '' ? title : 'Nachricht an ' + rcpt}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {user && isAuthenticated ?
              <>
            {rcpt === 'Vorstand'
              ? 'Diese Nachricht wird direkt an den Discord Channel des G.O.A.T. Vorstands gesendet.'
              :  'Diese Nachricht wird direkt per Discord an '+ rcpt + ' gesendet.'}
            <br /><br />
            {description != null && description !== '' ? [description,<br key={1} />,<br key={2} />] : '' }
            Empfänger:<br />
            <form onSubmit={this.handleSubmit} id="contact">
              <fieldset>
                <div className="form-group mt-2">
                  <select
                    className="form-control"
                    id="seatSelector"
                    onChange={this.changeRcpt}
                    value={rcpt}>
                    {this.renderRcpts()}
                  </select>
                </div>
              </fieldset>
              <fieldset>
                <textarea
                  className="form-control"
                  style={{lineHeight: '24px'}}
                  rows={5}
                  id="discordMessage"
                  onChange={this.changeMessage}
                  value={this.state.discordMsg}
                  placeholder="Deine Nachricht"
                >
                </textarea>
              </fieldset>
            </form>
            </>
              : 'Bitte logge dich ein um Nachrichten an uns schicken zu können.'}
          </Modal.Body>
          <Modal.Footer>
            {user && isAuthenticated ? <Button variant="secondary" onClick={this.handleSubmit}>
              Nachricht Senden
            </Button>
              : ''}
            <Button variant="primary" onClick={this.closeModal}>
              Schliessen
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.modal,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {discordMessage, hideModal}
)(ModalContainer)
