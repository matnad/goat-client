import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {clearErrors} from "../actions/errorActions"
import {register} from '../actions/registrationAction'
import RegForm from "./RegForm"

class DemoForm extends Component {


  render() {
    const {user, isLoading} = this.props.auth

    return (

      <div className="page" id="p3">
        <li className="icon fa fa-network-wired">
          <span className="title">
             Anmeldung
          </span>
          <div className="container">
            {
              (!isLoading && user) ?
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


DemoForm.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {clearErrors, register}
)(DemoForm);
