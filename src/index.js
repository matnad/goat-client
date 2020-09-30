import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import './assets/css/force-seats.css'
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-theme.min.css';
import './assets/css/fontAwesome.css';
import './assets/css/all.css';
import './assets/css/style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const routing = (
  <Router>
      <Route path="/" component={App} />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
registerServiceWorker()
