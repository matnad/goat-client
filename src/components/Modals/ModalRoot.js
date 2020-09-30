// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {Button, Modal} from "react-bootstrap"
//
//
// const mapStateToProps = state => ({
//   ...state.modal
// })
//
// class ModalContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modalIsOpen: false
//     };
//     this.closeModal = this.closeModal.bind(this)
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps !== this.props) {
//       this.setState({
//         modalIsOpen: nextProps.modalProps.open
//       })
//     }
//   }
//
//   closeModal() {
//     this.setState({ modalIsOpen: false })
//   }
//
//   render() {
//     // if (!this.props.modalType) {
//     //   return null
//     // }
//     return (
//       <div>
//         <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>{this.props.modalProps.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>{this.props.modalProps.message}</Modal.Body>
//           <Modal.Footer>
//             <Button variant="primary" onClick={this.closeModal}>
//               Close
//             </Button>
//             <Button variant="secondary" onClick={this.closeModal}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     )
//   }
// }
//
// export default connect(mapStateToProps, null)(ModalContainer)
