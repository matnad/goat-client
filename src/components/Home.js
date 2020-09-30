import React, {Component} from 'react'
import {Link} from "react-router-dom"

import img from '../assets/img/logo.png'

class Home extends Component {

  render() {
    return (
      <div className="page" id="p1">
        <div className="container">
          <img className="logo" src={img} alt=""/>
          <Link to='/info'>
            <button className="primary-button" >G.O.A.T.</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
