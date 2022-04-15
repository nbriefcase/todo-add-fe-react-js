import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css'

class CounterButton extends Component {

    render() {
        //    render = () => (
        return (
            <div className="counter" >
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
                {/*<span className="count">{this.state.counter}</span>*/}
            </div>
        )
    };
}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default CounterButton;