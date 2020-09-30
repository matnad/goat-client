import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {answers, questions} from "../content/faq"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {showModal} from "../actions/modalActions"
import DiscordModal from "./Modals/DiscordModal"


class InfoLan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: null
    }
    this.openItem = this.openItem.bind(this)
    this.openDiscordModal = this.openDiscordModal.bind(this)
  }

  openItem(event) {
    let newItem = parseInt(event.target.dataset.value)
    if(this.state.activeItem === newItem) {
      newItem = null
    }
    this.setState({
      activeItem: newItem
    })
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

  renderFAQ() {
    const {user} = this.props.auth
    return (
      <div id="accordion">

        {/*Read FAQ from txt file*/}
        {questions.map((question, index) => {
          return (
            <div key={"div_"+index} className="card">
              <div className="card-header">
                <Link onClick={this.openItem} data-value={index} className="card-link" data-toggle="collapse" to={'#'}>
                  {question}
                </Link>
              </div>
              <div id="collapseOne" className={this.state.activeItem === index ? "collapse show" : "collapse"} data-parent="#accordion">
                <div className="card-body" dangerouslySetInnerHTML={{__html: answers[index]}} />
              </div>
            </div>
          )
        })}

        {/*Discord Link*/}
          <div key={"div_discord"} className="card">
            <div className="card-header">
              <Link onClick={this.openItem} data-value="99" className="card-link" data-toggle="collapse" to={'#'}>
                Noch weitere Fragen?
              </Link>
            </div>
            <div id="collapseOne" className={this.state.activeItem === 99 ? "collapse show" : "collapse"}
                 data-parent="#accordion">
              <div className="card-body">
                {user
                ? <Link onClick={() => this.openDiscordModal(
                    "Vorstand",
                      "Frage zur G.O.A.T. LAN",
                      "Schicke uns deine Frage und wir werden uns sobald möglich bei dir melden!"
                    )} to={"#"}
                  >
                    Stell deine Frage direkt ans Organisations Team!
                  </Link>
                : 'Logge dich ein um uns direkt eine Nachricht zu schicken!'
                }
              </div>
            </div>
          </div>

      </div>
    )
  }

  render() {
    return (
      <>
        <div className="col-md-6 text-justify">
          <DiscordModal />
          <h4 className="text-center">GOAT LAN 7</h4>
          <p><span className="font-weight-bold">Datum/Zeit:</span> Die nächste GOAT LAN findet vom 22.-24. November 2019
            im Nachthafen im Werkraum Warteck statt.
            Wir starten am Freitag um 18:00 Uhr und spielen bis Sonntag, ca. 15:00 Uhr.</p>
          <p><span className="font-weight-bold">Ort:</span> Nachthafen, Werkraum Warteck pp, Burgweg 15, CH-4058 Basel.
            Die Loft befindet sich im 3. Stock, es
            gibt einen Lift.</p>
          <p><span className="font-weight-bold">Anmeldung:</span> Du kannst dich direkt auf der Webpage mit deinem
            Google Konto einloggen. Es gibt wieder 20 Plätze. Melde dich verbindlich für das ganze
            Wochenende an um dir online deinen Platz zu reservieren.</p>
          <p><span className="font-weight-bold">Kosten:</span> CHF 40.- für die ganze und CHF 20.- für die halbe GOAT
            LAN. Für Vereinsmitglieder reduziert sich
            der Betrag auf CHF 30.- für die ganze und CHF 15.- für die halbe GOAT LAN.</p>
          <p><span className="font-weight-bold">Infrastruktur:</span> Wir stellen euch Tische und einfache Stühle zur
            Verfügung. Ebenfalls bekommt jede Tischreihe
            eine Kabelrolle wo ihr eure Steckleisten einstecken könnt, sowie einen eigenen Switch.</p>
          <p><span className="font-weight-bold">Location:</span> Es gibt 8 Schlafplätze, Toiletten und eine Dusche.
            Falls ihr im Nachthafen übernachten wollt, bringt euren Schlafsack mit.
            Ebenfalls ist eine Küche mit einem grossen Kühlschrank vorhanden.</p>
        </div>
        <div className="col-md-6 text-justify">
          <h4 className="text-center">LAN FAQ</h4>
          {this.renderFAQ()}
        </div>
      </>
    )
  }
}

InfoLan.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {showModal}
)(InfoLan);
