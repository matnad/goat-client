import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {API_URL} from '../config'
import {Link} from "react-router-dom"
import {loadUser} from "../actions/authAction"
import store from '../store'
import {login, logout} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions';
import {connect} from 'react-redux';
import {NavIcon,  NavText} from "./StyledNav";
import Profile from "./Profile";

class OAuth extends Component {

    state = {
        disabled: '',
    }

    componentDidMount() {
        const {socket, provider} = this.props

        // Get login payload from Google OAuth login via socket and try to authenticate
        socket.on(provider, payload => {
            // console.log(payload)
            this.props.login(payload)
            store.dispatch(loadUser())
            this.popup.close()
        })

        store.dispatch(loadUser())
    }

    checkPopup() {
        const check = setInterval(() => {
            const {popup} = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({disabled: ''})
            }
        }, 1000)
    }

    openPopup() {
        const {provider, socket} = this.props
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/${provider}?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => {
        if (!this.state.disabled) {
            this.props.clearErrors()
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({disabled: 'disabled'})
        }
    }

    logout = () => {
        this.props.logout()
    }



    render() {
      const {textStyle} = this.props

        return (
            <>

            </>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {login, logout, clearErrors}
)(OAuth);
//
// {isLoading ? null :
//     user
//         ? <Link to={'/profile'}>
//           {
//             user.picture ?
//                 <img className="rounded-circle" src={user.picture} style={{width: 43, height: 43}}
//                      alt={user.name}/>
//                 : <li className="icon fa fa-user" id="profile"/>
//           }
//         </Link>
//         : <Link to={'#'} onClick={this.startAuth} className={`button primary ${disabled}`}>
//           <li className="icon fab fa-google" id="cuatro"/>
//         </Link>
// }