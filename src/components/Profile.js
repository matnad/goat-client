import React, {Component} from 'react'

import img from '../assets/img/right-about-image.png'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {logout, updateUser} from "../actions/authAction"
import {Link} from "react-router-dom"
import Textinput from "./functional/Textinput";
import {CURRENT_LAN} from "../config"

class Profile extends Component {

  nameRef = React.createRef()
  nickRef = React.createRef()
  phoneRef = React.createRef()

  state =  {
    userComment: ''
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeUserComment = this.changeUserComment.bind(this)
  }

  componentDidMount() {
    if(this.props.auth && this.props.auth.user) {
      this.setState ({
        userComment: this.props.auth.user.userComment ? this.props.auth.user.userComment : ''
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.auth.user) {
      this.props.updateUser(
          this.nameRef.current.state.value,
          this.nickRef.current.state.value,
          this.phoneRef.current.state.value,
          this.state.userComment
      )
    }
  }

  changeUserComment(event) {
    this.setState({
      userComment: event.target.value
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.auth.user && prevProps !== this.props ) {
      this.setState({
        userComment: this.props.auth.user.userComment ? this.props.auth.user.userComment : ''
      })
    }
  }


  static calculateDebt(user) {

    let debt = {
      lanKosten: 0,
      lanSchulden: 0,
      vereinsKosten: 0,
      vereinsSchulden: 0,
      totalSchulden: 0
    }

    if(!user) return debt
    const reg = user.current_registration

    // LAN
    if (reg && reg.status === 1) {
      if(user.member > 0) {
        if(reg.days === 3) {
          debt.lanKosten = 30
        } else {
          debt.lanKosten = 15
        }
      } else {
        if(reg.days === 3) {
          debt.lanKosten = 40
        } else {
          debt.lanKosten = 20
        }
      }
      debt.lanSchulden = debt.lanKosten * (reg.paid ? 0 : 1)
    }
    // else kosten und schulden = 0

    // Verein
    if(user.member > 0) {
      debt.vereinsKosten = 30
      if(user.member === 1) {
        debt.vereinsSchulden = 30
      }
    }

    // Total
    debt.totalSchulden = debt.lanSchulden + debt.vereinsSchulden

    return debt
  }

  render() {
    const {user} = this.props.auth

    if (!user) {
      return null
    }

    const debt = Profile.calculateDebt(user)

    return (

      <div className="page" id="p5">
        <li className={"icon fa" + (user.picture ? '' : " fa-user")}>
          {
            user.picture ? <img className="rounded-circle" src={user.picture} style={{width:150, height:150}} alt={user.name}/>
              : null
          }
          <span className="title">{user.name}</span>
          <div className="container">
            <div className="row" style={{lineHeight: '60px'}}>
              <div className="col-md-6">
                <form onSubmit={this.handleSubmit} id="contact">
                  <div className="col-md-12">
                    <fieldset>
                      <div className="input-group input-group-sm mb-3 mt-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="name">Name</span>
                        </div>
                      <Textinput
                          ref={this.nameRef}
                          name="name"
                          initial={user.name}
                          placeholder="Dein ganzer Name"
                          className="form-control"
                          required={true}
                      />
                      </div>
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <div className="input-group input-group-sm mb-3 mt-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="gamertag">Nickname</span>
                        </div>
                          <Textinput
                              ref={this.nickRef}
                              name="nick"
                              initial={user.nick}
                              placeholder="Dein Gamertag"
                              className="form-control"
                              required={true}
                          />
                      </div>
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <div className="input-group input-group-sm mb-3 mt-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="name">Telefon</span>
                        </div>
                      <Textinput
                          ref={this.phoneRef}
                          name="phone"
                          initial={user.phone}
                          placeholder="Telefon Nummer (Für unseren Whatsapp Chat)"
                          className="form-control"
                          required={false}
                      />
                      </div>
                    </fieldset>
                    <fieldset>
                      <textarea
                        className="form-control"
                        style={{lineHeight: '24px'}}
                        rows={5}
                        id="userComments"
                        onChange={this.changeUserComment}
                        value={this.state.userComment}
                        placeholder="Kommentar für die Organisatoren"
                      >
                      </textarea>
                    </fieldset>
                  </div>
                  <div className="col-md-12 mt-5">
                      <div className="btn-group" role="group" aria-label="Days Group">
                        <button type="submit" id="form-submit"
                                className="btn primary-button">Aktualisieren
                        </button>
                        <button type="button" className="btn primary-button">
                          <Link to='/info' onClick={this.props.logout}>Logout</Link>
                        </button>
                      </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <div className="right-info rounded">
                  <h4>Notizwand</h4>
                  <p>In der Textbox kannst du eine Nachricht hinterlassen, welche das Organisations-Team lesen kann.
                  Falls du etwas spezielles brauchst oder mitbringst, falls du ein Turnier organisieren möchtest oder ähnliches
                  ist dafür hier Platz.</p>
                  <h4 className="mt-5">Finanzielles</h4>
                  {
                    user.current_registration && user.current_registration.status === 1 ?
                      <p>Du bist für die {CURRENT_LAN}. GOAT LAN angemeldet und hast deinen Beitrag von {debt.lanKosten} Franken
                        {user.current_registration.paid ? ' bereits bezahlt. Super!' : ' noch nicht bezahlt. Am einfachsten nimmst du es bar zur Lan mit.'}
                      </p>
                      : ''
                  }
                  {
                    user.member > 0 ? <p>Du bist Mitglied im G.O.A.T. Verein. Den jährlichen Mitgliederbeitrag von {debt.vereinsKosten} Franken hast du
                      {user.member === 1 ? ' noch nicht bezahlt. Wende dich dafür bitte an Remy oder bezahle es an der nächsten Lan.' : ' bereits bezahlt. Besten Dank!' }  </p>
                    : <p>Du bist kein Mitglied im G.O.A.T. Verein. Falls du beitreten möchtest, wende dich bitte an Remy oder Vicky!</p>
                  }
                  {
                    debt.totalSchulden > 0 ?
                      <p>Total kriegen wir von dir noch <span style={{fontWeight: 'bold'}}>{debt.totalSchulden} Franken.</span></p>
                      : <p><span style={{fontWeight: 'bold'}}>Du hast zur Zeit keine offenen Beträge!</span></p>
                  }
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    )

  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logout, updateUser}
)(Profile);
