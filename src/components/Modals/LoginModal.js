import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal} from "react-bootstrap"
import {hideModal} from "../../actions/modalActions"
import io from "socket.io-client";
import {API_URL} from "../../config";
import store from '../../store'
import {loadUser, login} from "../../actions/authAction";
import {clearErrors} from "../../actions/errorActions";

const socket = io(API_URL)

class ModalContainer extends Component {

    modalType = 'login'

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Require correct modal type
        if (prevProps.modalType !== this.modalType && this.props.modalType !== this.modalType)
            return

        // Set state
        if (prevProps !== this.props) {
            this.setState({
                modalIsOpen: this.props.modalProps.open
            })
            if (this.props.modalProps.open) {
                // Get login payload from Google OAuth login via socket and try to authenticate
                socket.on('google', payload => {
                    this.props.login(payload)
                    this.popup.close()
                    this.closeModal()
                    store.dispatch(loadUser())
                })
                this.setState({
                    btnStatus: 'normal'
                })
            }
        }
    }

    closeModal() {
        this.props.hideModal()
    }

    startAuth = () => {
        if (this.state.btnStatus !== 'disabled') {
            this.props.clearErrors()
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({btnStatus: 'disabled'})
        }
    }

    openPopup() {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/google?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        )
    }

    checkPopup() {
        const check = setInterval(() => {
            const {popup} = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({btnStatus: 'normal'})
            }
        }, 1000)
    }


    render() {

        return (
            <div>
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Google Authentifizierung</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Damit du dich für die GOAT Lan anmelden kannst, musst du dein Google Konto mit der Webseite
                        verbinden.
                        <br/>
                        <br/>
                            <div
                                className={this.state.btnStatus === 'disabled' ?
                                    'google-button-disabled' :
                                    'cursor-pointer google-button'}
                                onClick={this.startAuth}
                            >
                            </div>

                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button variant="secondary" onClick={this.saveChanges}>*/}
                        {/*  Save Changes*/}
                        {/*</Button>*/}
                        <Button variant="primary" onClick={this.closeModal}>
                            Abbrechen
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.modal,
    admin: state.admin,
})

export default connect(
    mapStateToProps,
    {login, loadUser, clearErrors, hideModal}
)(ModalContainer)
