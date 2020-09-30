import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {showModal} from "../actions/modalActions"
import {Link} from "react-router-dom"
import DiscordModal from "./Modals/DiscordModal"

class InfoVerein extends Component {

  constructor(props) {
    super(props)
    this.openDiscordModal = this.openDiscordModal.bind(this)
    this.openInfoModal = this.openInfoModal.bind(this)
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

  openInfoModal() {
    const content = () => {
      return (
        <div>
          Auf unserem Discord Server bist du immer direkt an der Informationsquelle und du kannst dich mit den anderen GOATlern austauschen.
          <br/>
          <br/>
          <a href="https://discord.gg/2yPN7hn" rel="noopener noreferrer" target="_blank" id="discordlink">Jetzt Beitreten</a>
        </div>
      )
    }

    this.props.showModal({
        open: true,
        title: 'Discord Server',
        message: content(),
        closeModal: this.closeModal
      },

      'info'
    )
  }

  render() {
    return (
      <>
        <div className="col-md-6 text-justify">
          <h4 className="text-center">G.O.A.T. VEREIN</h4>
          <DiscordModal />
          <p>An einer LAN-Party im Oktober 2016 spielten sich ein paar Freunde ein Wochenende lang mit- und gegeneinander
           durch diverse Computer-Spiel-Klassiker.</p>
          <p> Die Freude am gemeinsamen Spielen und die Tatsache, dass kleine LAN-Parties im Zeitalter von Online-Gaming
           beinahe ausgestorben waren, motivierte uns dazu, den Anlass halbjährlich zu organisieren.</p>
           <p>Wir gründeten im Juni 2018 den Verein «Gemeinschaft organisierter angewandter Technologien», kurz G.O.A.T., um das Wachstum
           der GOAT LAN Community zu unterstützen.</p>
           <p>Wir sind Gamer aus verschiedensten Freundes- und Berufskreisen und sind eine offene Community, die LAN-Anlässe lieben und weiterhin stattfinden sehen wollen.</p>
           <p>Der Verein organisiert etwa alle 6 Monate eine LAN-Party für 20 Personen.
             Wenn du dich dafür interessierst, dann <Link to={"#"} onClick={this.openInfoModal}>besuche uns auf unserem Discord-Server.</Link></p>
        </div>
        <div className="col-md-6 text-justify">
          <h4 className="text-center">BEITRETEN</h4>
          <p>Wenn du die Arbeit von G.O.A.T. unterstützen möchtest, so kannst du dem Verein beitreten.
          Der Mitgliederbeitrag pro Jahr beträgt CHF 30.-. Für dich wird die halbjährliche GOAT LAN ab Beitritt günstiger
          (CHF 30.- für die ganze und CHF 15.- für die halbe GOAT LAN). Du wirst an die jährliche GV eingeladen und kannst
          den Verein aktiv mitgestalten. Und du wirst Teil einer wachsenden Community rund um die GOAT LAN.</p>
          <p>Wenn du an einem Vereinsbeitritt interessiert bist oder Fragen zum Verein hast, dann melde dich bei
            <Link onClick={() => this.openDiscordModal("Vicky", "Interesse am Vereinsbeitritt", "Lass uns wissen, ob du noch Fragen zum Verein hast oder ob du beitreten möchtest.")} to={"#"}> Vicky </Link>
          (Präsidentin von G.O.A.T.) oder
            <Link onClick={() => this.openDiscordModal("Remy", "Interesse am Vereinsbeitritt", "Lass uns wissen, ob du noch Fragen zum Verein hast oder ob du beitreten möchtest.")} to={"#"}> Remy </Link>
           (Kassier von G.O.A.T.). Ein Beitritt an der GOAT LAN ist auch möglich und die Vergünstigung erhältst du sofort.</p>
        </div>
      </>
    )

  }
}

InfoVerein.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {showModal}
)(InfoVerein);
