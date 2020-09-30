import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {showModal} from "../actions/modalActions"
import SideNav, {Nav, NavIcon, NavItem, NavText, Toggle} from './StyledNav';
import InfoModal from "./Modals/InfoModal";
import LoginModal from "./Modals/LoginModal";
import {loadUser} from "../actions/authAction";

const pages = ['register', 'admin', 'info', 'verein', 'profile']


class Sidenav extends Component {

    componentDidMount() {
        this.props.loadUser()
    }

    constructor(props) {
        super(props)
        this.openDiscordModal = this.openDiscordModal.bind(this)
    }

    openDiscordModal() {
        const content = () => {
            return (
                <div>
                    Auf unserem Discord Server bist du immer direkt an der Informationsquelle und du kannst dich mit den
                    anderen GOATlern austauschen.
                    <br/>
                    <br/>
                    <a href="https://discord.gg/2yPN7hn" rel="noopener noreferrer" target="_blank" id="discordlink">Jetzt
                        Beitreten</a>
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

    openLoginModal() {
        this.props.showModal({
                open: true,
                closeModal: this.closeModal
            },
            'login'
        )
    }

    renderIcon(iconStyle) {
        const {user} = this.props.auth

        if (user) {
            if (user.picture) {
                return <img className="rounded-circle" src={user.picture} style={{width: 40, height: 40}}
                            alt={user.name}/>
            } else {
                return <i className="fa fa-fw fa-user" style={iconStyle}/>
            }
        } else {
            return <i className="fab fab-fw fa-google" style={iconStyle}/>
        }
    }

    render() {
        const user = this.props.auth.user
        const {pathname} = this.props.routeProps.location
        const currentPage = pathname.substr(1)
        const {history} = this.props.routeProps

        const iconStyle = {
            fontSize: '1.75em',
            color: '#1c2541',
            verticalAlign: 'middle'
        }


        const textStyle = {
            color: pages.includes(currentPage) ? '#fff' : '#000'
        }

        const navBackgroundColor = pages.includes(currentPage) ? '#777' : 'rgba(0,0,0,0)'

        SideNav.componentStyle.rules[1] = `background-color: ${navBackgroundColor} !important;`
        Nav.componentStyle.rules[1] =   `background-color: ${navBackgroundColor} !important;
                                        [class*="sidenav-subnav--"] {
                                            background-color: ${navBackgroundColor} !important;
                                            border: 1px solid #999;
                                        }`
        return (
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (selected === 'profile' && !user) {
                        this.openLoginModal()
                    } else if (pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <Toggle/>
                <InfoModal/>
                <LoginModal/>
                <Nav selected={currentPage}>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={iconStyle}/>
                        </NavIcon>
                        <NavText style={textStyle}>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Infos" style={textStyle}>
                        <NavIcon>
                            <i className="fa fa-fw fa-info" style={iconStyle}/>
                        </NavIcon>
                        <NavText style={textStyle}>
                            Infos
                        </NavText>
                        <NavItem eventKey="info">
                            <NavText style={textStyle}>
                                Lan Infos und FAQ
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="verein">
                            <NavText style={textStyle}>
                                Vereins Info
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="register">
                        <NavIcon>
                            <i className="fa fa-fw fa-desktop" style={iconStyle}/>
                        </NavIcon>
                        <NavText style={textStyle}>
                            {user && user.current_registration ? "GOAT Lan 7" : "Lan Anmeldung"}
                        </NavText>
                    </NavItem>
                    {user && user.isAdmin ?
                        <NavItem eventKey="admin">
                            <NavIcon>
                                <i className="fa fa-fw fa-user-shield" style={iconStyle}/>
                            </NavIcon>
                            <NavText style={textStyle}>
                                Admin Bereich
                            </NavText>
                        </NavItem> : null}
                    <NavItem eventKey="profile" style={
                        user ? null :
                            {marginTop: '30px'}
                    }>
                        <NavIcon>
                            {this.renderIcon(iconStyle)}
                        </NavIcon>
                        <NavText style={textStyle}>
                            {user ? 'Profil' : 'Login'}
                        </NavText>
                    </NavItem>
                </Nav>
            </SideNav>
        )
    }

}

Sidenav.propTypes = {
    auth: PropTypes.object.isRequired,
    routeProps: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {showModal, loadUser}
)(Sidenav);
