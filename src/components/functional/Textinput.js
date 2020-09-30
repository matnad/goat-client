import React, { Component } from "react";


export default class Textinput extends Component {

  state = { value: this.props.initial };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <input
        className={this.props.className}
        name={this.props.name}
        type="text"
        placeholder={this.props.placeholder} value={this.state.value}
        onChange={this.handleChange}
        maxLength={100}

      />
    )
  }
}
