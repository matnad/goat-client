import React, {Component} from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {changeMember, changePaid, loadUsers} from "../actions/adminActions"
import store from '../store'
import {clearErrors} from "../actions/errorActions"
import {CURRENT_LAN} from "../config"
import {hideModal, showModal} from "../actions/modalActions"
import AdminUser from "./Modals/AdminUser"
import Table from "react-bootstrap/Table"
import Profile from './Profile'

class Admin extends Component {

  state = {
    filter: 0 // 0-4
  }

  highlightGreen = {
    color: '#00dd00',
    fontWeight: 'bold'
  }

  highlightRed = {
    color: '#d30000',
    fontWeight: 'bold'
  }

  componentDidMount() {
    store.dispatch(clearErrors())
    store.dispatch(loadUsers())
    this.changeMember = this.changeMember.bind(this)
    this.changePaid = this.changePaid.bind(this)
    this.openModal = this.openModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  applyFilter(event) {
    let newFilter = parseInt(event.target.dataset.id);
    if (newFilter === this.state.filter) {
      newFilter = 0
    }
    this.setState({
      filter: newFilter
    })
  }

  changeMember(event) {
    if (this.props.admin.isLoading)
      return
    const {member, id, name} = event.target.dataset
    let current = parseInt(member)
    current = isNaN(current) ? 0 : current
    let newMember
    if (name === 'isMember') {
      newMember = current === 0 ? 1 : 0
    } else if (name === 'isMemberPaid') {
      newMember = current === 1 ? 2 : 1
    }
    store.dispatch(changeMember(id, newMember))
  }

  changePaid(event) {
    if (this.props.admin.isLoading)
      return
    let current = parseInt(event.target.dataset.paid)
    current = isNaN(current) ? 0 : current
    const newPaid = (current + 1) % 2
    store.dispatch(changePaid(event.target.dataset.id, newPaid))
  }

  openModal(event) {
    const user = this.props.admin.users[event.target.id]
    this.props.showModal({
      open: true,
      title: user.name,
      message: user._id,
      closeModal: this.closeModal
    }, 'adminUser')
  }

  renderUserArray(arr) {
    if (arr.length === 0)
      return <><span>Keine User in dieser Kategorie.</span><br/></>



    return arr.map((entry, index) => {
      const {user, reg} = entry
      user.current_registration = reg;
      const filter = this.state.filter

      let regString = ''

      if (filter === 5 && reg.status < 3) {
        regString += (reg.bed & 1) > 0 ? '✔️' : '❌'
        regString += (reg.bed & 2) > 0 ? '✔️' : '❌'
      } else if (reg.status < 3) {
        regString += (reg.days & 1) > 0 ? '✔️' : '❌'
        regString += (reg.days & 2) > 0 ? '✔️' : '❌'
      }

      let style = {}

      if (
        (filter === 1 && reg.paid === 1) ||
        (filter === 2 && user.member > 0)
      ) {
        style = this.highlightGreen
      }

      if (filter === 2 && user.member === 1) {
        style = this.highlightRed
      }

      let schulden = ''

      if (filter === 3) {
        const debt = Profile.calculateDebt(user)
        schulden = ` (${debt.totalSchulden} CHF)`
        if (debt.totalSchulden === 0) {
          style = this.highlightGreen
        } else {
          style = this.highlightRed
        }
      }

      return (
        <span
          id={user._id}
          className='cursor-pointer mb-1'
          style={style}
          key={index + '_name'}
          onClick={this.openModal}
        >
            {regString} {user.name} {schulden}<br/>
          {
            (filter === 4 && (user.adminComment !== '' && user.adminComment != null)) ?
              <span style={{marginLeft: '55px'}}>{user.adminComment}<br key={index + '_adminComment'}/></span> :
              null
          }
          {
            (filter === 4 && (user.userComment !== '' && user.userComment != null)) ?
            <span style={{marginLeft: '65px'}}>{user.userComment}<br key={index + '_userComment'}/></span> :
            null
          }

          </span>
      )
    })
  }

  render() {
    const {isAuthenticated, users} = this.props.admin
    let userArray = []
    if (users) {
      Object.values(users).forEach((user) => {
        Object.values(user.registrations).forEach((reg) => {
          if (reg.version === CURRENT_LAN) {
            userArray.push({user, reg})
          }
        })
      })
    }

    if (!isAuthenticated || !users)
      return null


    return (

      <div className="page" id="p4">
        <li className="wrapli icon fa fa-user-shield"><span className="title">Admin Bereich</span>
          <div className="container">
            <div className="row">
              <div className="col-md-6 left-text">
                <Table borderless size="sm">
                  <thead className="text-center font-weight-bold cursor-pointer">
                    <tr>
                      <th
                        data-id={5}
                        onClick={this.applyFilter}
                        style={this.state.filter === 5 ? this.highlightGreen : {}}
                      >
                        ★ Bett
                      </th>
                      <th
                        data-id={1}
                        onClick={this.applyFilter}
                        style={this.state.filter === 1 ? this.highlightGreen : {}}
                      >
                        ★ Lan bez.
                      </th>
                      <th
                        data-id={2}
                        onClick={this.applyFilter}
                        style={this.state.filter === 2 ? this.highlightGreen : {}}
                      >
                        ★ Mitglied
                      </th>
                      <th
                        data-id={3}
                        onClick={this.applyFilter}
                        style={this.state.filter === 3 ? this.highlightGreen : {}}
                      >
                        ★ Schulden
                      </th>
                      <th
                        data-id={4}
                        onClick={this.applyFilter}
                        style={this.state.filter === 4 ? this.highlightGreen : {}}
                      >
                        ★ Kommentare
                      </th>
                    </tr>
                  </thead>
                </Table>
                <br/>
                <AdminUser/>
                <span className="font-weight-bold">Angemeldet</span><br/>
                {
                  this.renderUserArray(userArray.filter(user => {
                    return user.reg.status === 1
                  }))
                }
                <br/><span className="font-weight-bold">Provisorisch</span><br/>
                {
                  this.renderUserArray(userArray.filter(user => {
                    return user.reg.status === 2
                  }))
                }
                <br/><span className="font-weight-bold">Abgemeldet</span><br/>
                {
                  this.renderUserArray(userArray.filter(user => {
                    return user.reg.status === 3
                  }))
                }
              </div>
              <div className="col-md-3">
                <div>
                  <Table bordered size="sm">
                    <thead>
                    <tr>
                      <th>Stats</th>
                      <th>Fr - Sa</th>
                      <th>Sa - So</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><strong>Angemeldet</strong></td>
                      <td>{userArray.filter(user => user.reg.status === 1 && (user.reg.days & 1) > 0).length}</td>
                      <td>{userArray.filter(user => user.reg.status === 1 && (user.reg.days & 2) > 0).length}</td>
                    </tr>
                    <tr>
                      <td>Provisorisch</td>
                      <td>{userArray.filter(user => user.reg.status === 2 && (user.reg.days & 1) > 0).length}</td>
                      <td>{userArray.filter(user => user.reg.status === 2 && (user.reg.days & 2) > 0).length}</td>
                    </tr>
                    <tr>
                      <td style={{fontWeight: 'bold'}}>Gesamt</td>
                      <td
                        style={{fontWeight: 'bold'}}>{userArray.filter(user => user.reg.status < 3 && (user.reg.days & 1) > 0).length}</td>
                      <td
                        style={{fontWeight: 'bold'}}>{userArray.filter(user => user.reg.status < 3 && (user.reg.days & 2) > 0).length}</td>
                    </tr>
                    <tr>
                      <td>Abgemeldet</td>
                      <td colSpan="2">{userArray.filter(user => user.reg.status === 3).length}</td>
                    </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    )
  }
}


Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin,
  error: state.error
});

export default connect(
  mapStateToProps,
  {loadUsers, changeMember, changePaid, clearErrors, hideModal, showModal}
)(Admin);
