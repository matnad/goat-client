import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Picker from "./Picker"
import RegStatus from "./RegStatus"
import Profile from './Profile'
import axios from "axios"
import {API_URL} from "../config"
import DiscordModal from "./Modals/DiscordModal"
import {Link} from "react-router-dom"
import {showModal} from "../actions/modalActions"
import Beds from "./Beds"


class Seats extends Component {

  MAX_SEATS = 20
  MAX_BEDS = 8

  state = {
    loading: true,
    registrations: null,
    emptyBeds: []
  }

  constructor(props) {
    super(props)
    this.openDiscordModal = this.openDiscordModal.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/api/registration`)
      .then(res => {
        this.setState({
          registrations: res.data,
          loading: false,
          emptyBeds: Beds.getEmptyBeds(res.data, this.MAX_BEDS)
        })

      })
      .catch(err => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err)
      });
  }

  openDiscordModal(rcpt, title = "", info = "", discordMsg = "") {
    this.props.showModal({
        open: true,
        title,
        message: info,
        closeModal: this.closeModal,
        discordMsg,
        rcpt
      },
      'discord'
    )
  }

  renderStatus() {
    const {user} = this.props.auth
    if (this.state.loading || !user || !user.current_registration) {
      return null;
    }

    // Set up variables
    const debt = Profile.calculateDebt(user)
    const {status, days, seat, bed} = user.current_registration
    const member = parseInt(user.member)
    const lanFull = this.state.registrations.filter(reg => reg.seat && reg.seat > 0).length >= this.MAX_SEATS
    let paragraphs = []

    // ANMELDE STATUS

    if (status === 1) {
      // Definitiv angemeldet
      if (days === 3) {
        // Beide Tage
        if (seat && seat > 0) {
          // Sitzplatz reserviert
          paragraphs.push(`Du bist für beide Abende definitiv angemeldet und hast dir den Platz ${seat} gesichert. Wir freuen uns auf dich!`)
        } else if (lanFull) {
          // Angemeldet, noch nicht reserviert und lan voll
          paragraphs.push([`Du möchtest dich für beide Abende anmelden, jedoch sind leider keine Plätze mehr frei. 
          Wenn du auch spontan kommen würdest, melde dich bei `,
            <Link key={"remy"} onClick={() => this.openDiscordModal("Remy")} to={"#"}>Remy</Link>,
            ` oder `,
            <Link key={"vicky"} onClick={() => this.openDiscordModal("Vicky")} to={"#"}>Vicky</Link>,
            `, dann können wir dich informieren, sollte ein Platz frei werden.`])
        } else {
          // Noch nicht reserviert, aber platz
          paragraphs.push(`Du bist für beide Abende definitiv angemeldet, aber hast dir noch keinen Platz gesichert. Klicke auf die Karte um deinen Platz auszuwählen.`)
        }
      } else {
        // Nur einen Tag
        if (lanFull) {
          // Lan voll
          paragraphs.push([`Du möchtest dich für einen Abend anmelden, jedoch sind leider keine Plätze mehr frei. 
          Wenn du auch spontan kommen würdest, melde dich bei `,
            <Link key={"remy"} onClick={() => this.openDiscordModal("Remy")} to={"#"}>Remy</Link>,
            ` oder `,
            <Link key={"vicky"} onClick={() => this.openDiscordModal("Vicky")} to={"#"}>Vicky</Link>
            ,`, dann können wir dich informieren, sollte ein Platz frei werden.`])
        } else {
          // Noch Platz (aber reservation nicht möglich, da nur 1 tag)
          paragraphs.push(`Du bist definitiv für einen Abend angemeldet. Du bekommst einen der freien Plätze.`)
        }
      }
    } else if (status === 2) {
      // Provisorisch angemeldet (ab hier ist nie ein sitz reserviert)
      if (days === 3) {
        // Beide Tage
        if (lanFull) {
          // Lan voll
          paragraphs.push([`Du möchtest dich provisorisch für beide Abende anmelden. Leider sind keine Plätze mehr frei. Wenn du auch spontan kommen würdest, melde dich bei `,
            <Link key={"remy"} onClick={() => this.openDiscordModal("Remy")} to={"#"}>Remy</Link>,
          ` oder `,
            <Link key={"vicky"} onClick={() => this.openDiscordModal("Vicky")} to={"#"}>Vicky</Link>,
          `, dann können wir dich informieren, sollte ein Platz frei werden.`])
        } else {
          // Noch Platz (aber reservation nicht möglich, da provisorisch)
          paragraphs.push(`Du hast dich provisorisch für beide Abende angemeldet. Um einen Sitz- und Schlafplatz zu reservieren, melde dich definitiv an.`)
        }
      } else {
        // Nur einen Tag
        if (lanFull) {
          // Lan voll
          paragraphs.push(`Du bist provisorisch für einen Abend angemeldet. Leider sind keine Plätze mehr frei. Wenn du auch spontan kommen würdest, melde dich definitiv an.`)
        } else {
          // Noch Platz (aber reservation nicht möglich, da nur 1 tag und provisorisch)
          paragraphs.push(`Du bist provisorisch für einen Abend angemeldet. Um einen der freien Plätze zu bekommen, melde dich definitiv an.`)
        }
      }
    } else if (status === 3) {
      // Abgemeldet
      paragraphs.push(`Schade! Wir bedanken uns für dein Interesse und hoffen sehr, dich an der nächsten GOAT LAN wieder dabei zu haben!`)
      paragraphs.push(`Falls du doch kommen möchtest, wechsle einfach deinen Status solange es noch Plätze frei hat und du bist sofort angemeldet!`)
    }

    // BETT
    if (status === 1 && bed === 0) {
      if (this.state.emptyBeds[0] === 0 || this.state.emptyBeds[1] === 0) {
        paragraphs.push([`Für mindestens eine Nacht sind keine Schläfplätze mehr frei. Falls du auf eine Übernachtungsmöglichkeit angewiesen bist, bitte melde dich beim `,
          <Link key={"vorstand"} onClick={() => this.openDiscordModal("Vorstand", "Übernachtung an der G.O.A.T. LAN")} to={"#"}>Organisationsteam</Link>,
          `.`]
        )
      }
    } else if (status === 1) {
      paragraphs.push([`Das Bett ist für dich reserviert. Am besten nimmst du einen Schlafsack mit oder `,
        <Link key={"vorstand"} onClick={() => this.openDiscordModal("Vorstand", "Übernachtung an der G.O.A.T. LAN")} to={"#"}>meldest dich bei uns</Link>,
        ` falls du Bettwäsche aus dem Nachthafen benötigst.`]
      )
    }

    // MEMBER STATUS UND KOSTEN
    if (status === 1) {
      // Nur wenn angemeldet
      if (member === 0) {
        // Kein Vereinsmitglied
        paragraphs.push(`Du bist noch kein G.O.A.T.-Vereinsmitglied. Die LAN kostet für dich ${debt.lanKosten} Franken.`)
        if (debt.lanSchulden > 0) {
          // Lan noch nicht nezahlt
          paragraphs.push(`Du hast den Beitrag für die LAN noch nicht bezahlt. Du kannst das direkt an der LAN tun. Wir empfehlen dir, passend Bargeld mitzunehmen.`)
        } else {
          paragraphs.push(`Du hast die LAN bereits bezahlt. Vielen Dank!`)
        }
      } else if (member >= 1) {
        paragraphs.push(`Cool, du bist G.O.A.T.-Vereinsmitglied! Die LAN kostet für dich nur ${debt.lanKosten} Franken`)
        if (debt.lanSchulden > 0) {
          // Lan noch nicht nezahlt
          paragraphs.push(`Du hast den Beitrag für die LAN noch nicht bezahlt. Du kannst das direkt an der LAN tun. Wir empfehlen dir, passend Bargeld mitzunehmen.`)
        } else {
          paragraphs.push(`Du hast die LAN bereits bezahlt. Vielen Dank!`)
        }
      }
    }

    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }

  render() {
    const {user} = this.props.auth
    if (!user || !user.current_registration)
      return null

    const loading = this.state.loading

    return (
      <div className="row">
        <div className="col-md-6">
          <DiscordModal/>
          {(user && user.current_registration) ?
            <div className="mb-3">
              <RegStatus autoSave={true}/>
            </div>
            : null

          }
          {
            user && user.current_registration ?
              <div className="mt-5 mb-5">
                {loading ? '' :
                  <>
                    <Picker registrations={this.state.registrations}/>
                    <br /><br />
                    <Beds registrations={this.state.registrations} maxBeds={this.MAX_BEDS}/>
                  </>
                  }
              </div>
              : null

          }
        </div>
        <div className="col-md-6">
          <div className="right-info rounded">
            <h4>Dein Status</h4>
            {this.renderStatus()}
          </div>
        </div>
      </div>
    )
  }
}


Seats.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {showModal}
)(Seats);
