import React, {Component} from 'react'
import {Link} from "react-router-dom"
import OAuth from "./OAuth";
import io from 'socket.io-client'
import {API_URL} from '../config'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import InfoModal from "./Modals/InfoModal"
import {showModal} from "../actions/modalActions"
import {ButtonToolbar, DropdownButton, Dropdown} from "react-bootstrap"

// const socket = io(API_URL)

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
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
    const user = this.props.auth.user
    return (

      <ul id="navb" className="navb">
        <InfoModal/>
        <div className="navicons">
          {/*<Link to="/">*/}
          {/*  <li className="icon fa fa-home" id="uno"/>*/}
          {/*</Link>*/}
          {/*<Link to="/info">*/}
          {/*  <li className="icon fa fa-info" id="info"/>*/}
          {/*</Link>*/}
          {/*<Link to="/register">*/}
          {/*  <li className="icon fa fa-desktop" id="register"/>*/}
          {/*</Link>*/}
          {/*{user && user.isAdmin ?*/}
          {/*  <Link to="/admin">*/}
          {/*    <li className="icon fa fa-user-shield" id="admin"/>*/}
          {/*  </Link>*/}
          {/*  : ''*/}
          {/*}*/}
          {/*<OAuth*/}
          {/*  provider='google'*/}
          {/*  key='google'*/}
          {/*  socket={socket}*/}
          {/*/>*/}
          {/*<Link to={"#"} onClick={this.openModal}>*/}
          {/*  <li className="icon fab fa-discord"></li>*/}
          {/*</Link>*/}
        </div>
      </ul>

    )
  }

}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {showModal}
)(Navbar);
