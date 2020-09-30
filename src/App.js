import React, {Component} from 'react'
import {API_URL} from './config'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from "./components/Register";
import Home from "./components/Home";
import Admin from "./components/Admin"
import Wrapper from "./components/Wrapper"
import Profile from "./components/Profile"
import Info from "./components/Info"
import DemoForm from "./components/DemoForm"
import Sidenav from "./components/Sidenav"


class App extends Component {

  state = {
    loading: true
  };

  componentDidMount() {
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          this.setState({loading: false})
        }
      })

  }


  render() {
    return (
      <Router>
        <Provider store={store}>
          <Route path="/" render={routeProps => (
            <Wrapper path={routeProps.location.pathname}>
                <div className="bgimage"></div>
                <Route path={'/'} render={routeProps =>
                  (<Sidenav routeProps={routeProps}/>)}/>
                {/*first matching will be displayed*/}
                <Switch>
                  <Route path="/info" component={Info}/>
                  <Route path="/verein" component={Info}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/admin" component={Admin}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/demoform" component={DemoForm}/>
                  <Route path="/" component={Home}/>
                </Switch>
            </Wrapper>
          )}/>
        </Provider>
      </Router>
    )
  }
}

export default App
