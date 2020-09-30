import React, {Component} from 'react'
import InfoLan from "./InfoLan"
import InfoVerein from "./InfoVerein"
// import Toggle from 'react-bootstrap-toggle';

class Info extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggleLan: this.props.location.pathname === '/info'
    }
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ toggleLan: !this.state.toggleLan });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.location.pathname !== prevProps.location.pathname)
      this.setState({
        toggleLan: this.props.location.pathname === '/info'
      })
  }

  render() {
    return (

      <div className="page" id="p2">
        <li className="icon fa fa-info">
          <span className="title">
            {/*<Toggle*/}
            {/*className="cursor-pointer"*/}
            {/*onClick={this.onToggle}*/}
            {/*on={'Zu den Vereinsinfos'}*/}
            {/*off={'Zu den Laninfos'}*/}
            {/*size="m"*/}
            {/*active={this.state.toggleLan}*/}
            {/*width={240}*/}
            {/*onClassName="btn-primary"*/}
            {/*onstyle="primary"*/}
            {/*offClassName="btn-primary"*/}
            {/*offstyle="primary"*/}
            {/*/>*/}
          </span>
          <div className="container">
            <div className="row">
              {
                this.state.toggleLan ?
                <InfoLan /> :
                <InfoVerein />
              }
            </div>
          </div>
        </li>
      </div>
    )

  }
}

export default Info
