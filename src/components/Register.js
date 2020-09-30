import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {clearErrors} from "../actions/errorActions"
import {register} from '../actions/registrationAction'
import RegForm from "./RegForm"
import Seats from "./Seats"

class Register extends Component {


  render() {
    const {user, isLoading} = this.props.auth
    return (

      <div className="page" id="p3">
        <li className="icon fa fa-desktop">
          <span className="title">
            {(user && user.current_registration) ? 'Sitzplatz Reservation' : 'Anmeldung'}
          </span>
          <div className="container">
            {
              (!isLoading && user) ?
                user.current_registration ?
                  <Seats/>
                  :
                  <RegForm/>
                :
                <div className="col-md-12">
                  <div className="right-info text-center">
                    <p>Um diesen Inhalt zu sehen, logge dich bitte ein.</p>
                  </div>
                </div>
            }
          </div>
        </li>
      </div>


    )
  }
}


Register.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {clearErrors, register}
)(Register);
