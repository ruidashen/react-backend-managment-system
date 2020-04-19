import React, { Component } from "react";
import propTypes from "prop-types";

/**
 * UI Component
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }

  static propTypes = {
    count: propTypes.number.isRequired,
    increment: propTypes.func.isRequired,
    decrement: propTypes.func.isRequired,
    incrementAsync: propTypes.func.isRequired,
  };

  increment = () => {
    const number = this.numberRef.current.value * 1;
    this.props.increment(number);
  };

  decrement = () => {
    const number = this.numberRef.current.value * 1;
    this.props.decrement(number);
  };

  incrementIfOdd = () => {
    if (this.props.count % 2 !== 0) {
      const number = this.numberRef.current.value * 1;
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1;
    this.props.incrementAsync(number);
  };

  render() {
    const count = this.props.count;
    return (
      <div>
        <div>click {count} times</div>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          &nbsp;&nbsp;
          <button onClick={this.increment}>+</button>&nbsp;&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          &nbsp;&nbsp;
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    );
  }
}
