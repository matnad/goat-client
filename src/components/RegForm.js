import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {clearErrors} from "../actions/errorActions"
import {register} from '../actions/registrationAction'
import {updateUser} from '../actions/authAction'
import Textinput from "./functional/Textinput"
import RegStatus from "./RegStatus"

class RegForm extends Component {
  nameRef = React.createRef()
  nickRef = React.createRef()
  phoneRef = React.createRef()
  statusRef = React.createRef()

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      status: 1
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.auth.user) {
      const {status, days} = this.statusRef.current.state
      this.props.register(status, days)
      this.props.updateUser(
        this.nameRef.current.state.value,
        this.nickRef.current.state.value,
        this.phoneRef.current.state.value
      )
    }
  }

  handleChange(e) {
    this.setState({
      status: parseInt(e.target.value)
    })
  }

  render() {
    const {user} = this.props.auth
    return (
      <div className="row" style={{lineHeight: '60px'}}>
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit} id="contact">
            <div className="col-md-12">
              <fieldset>
                <Textinput
                  ref={this.nameRef}
                  name="name"
                  initial={user.name}
                  placeholder="Dein ganzer Name"
                  className="form-control"
                  required={true}
                />
              </fieldset>
            </div>
            <div className="col-md-12">
              <fieldset>
                <Textinput
                  ref={this.nickRef}
                  name="nick"
                  initial={user.nick}
                  placeholder="Dein Gamertag"
                  className="form-control"
                  required={true}
                />
              </fieldset>
            </div>
            <div className="col-md-12">
              <fieldset>
                <Textinput
                  ref={this.phoneRef}
                  name="phone"
                  initial={user.phone}
                  placeholder="Telefon Nummer (Für unseren Whatsapp Chat)"
                  className="form-control"
                  required={false}
                />
              </fieldset>
            </div>
            <div className="col-md-12 mt-5">
              <RegStatus
                ref={this.statusRef}
                autoSave={false}
              />
            </div>
            <div className="col-md-12 mt-5">
              <fieldset>
                <button type="submit" id="form-submit"
                        className="btn primary-button mt-3">Datenschutz Erklärung Akzeptieren und Anmelden
                </button>
              </fieldset>
            </div>
          </form>
        </div>
        <div className="col-md-6" style={{lineHeight: '24px'}}>
          <div className="right-info rounded">
            <h4>Datenschutzerklärung</h4>
            <p>Hiermit erlaube ich dem Verein Gemeinschaft Organisierter Angewandter Technologien (nachfolgend G.O.A.T.), die in diesem Formular angegebenen persönlichen Daten für die Planung und Durchführung von LAN-Parties zu verarbeiten. Ich stimme zu, dass mich G.O.A.T. anhand dieser Daten kontaktieren darf. Diese Kontaktaufnahme geschieht nur im Rahmen des für die Durchführung von LAN-Parties nötigen Ausmasses. Ich bin darüber informiert, dass G.O.A.T. für den Zweck der Planung und Durchführung von LAN-Parties diese Daten speichert. G.O.A.T. teilt die zur Verfügung gestellten Daten nicht mit Dritten. Ein Auszug oder eine Löschung der persönlichen Daten kann jederzeit bei G.O.A.T. im Rahmen der Datenschutzverordnung (DSVO) der Europäischen Union Regulation (2016/679) verlangt werden.</p>
          </div>
        </div>
      </div>
    )
  }
}


RegForm.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {clearErrors, register, updateUser}
)(RegForm);
