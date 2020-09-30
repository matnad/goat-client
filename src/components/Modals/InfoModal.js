import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal} from "react-bootstrap"
import {changeAdminComment, changeMember, changePaid, changeSeat} from "../../actions/adminActions"
import {hideModal} from "../../actions/modalActions"

class ModalContainer extends Component {

  modalType = 'info'

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
    }
  }

  closeModal() {
    this.props.hideModal()
  }

  render() {

    return (
      <div>
        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>{this.props.modalProps.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {this.props.modalProps.message}
          </Modal.Body>
          <Modal.Footer>
            {/*<Button variant="secondary" onClick={this.saveChanges}>*/}
            {/*  Save Changes*/}
            {/*</Button>*/}
            <Button variant="primary" onClick={this.closeModal}>
              Schliessen
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
  {changeMember, changePaid, changeSeat, changeAdminComment, hideModal}
)(ModalContainer)
