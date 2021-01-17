import React from 'react';

export default class TextInput extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            value: props.value || '',
        }

        this.changeValue = this.changeValue.bind(this);

    }

    /**
     * Изменение значения поля.
     *
     * @param event
     */
    changeValue(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <form className="form-inline my-2 my-lg-0" onSubmit={(event) => {event.preventDefault(); this.props.onChangeValue(this.state.value)}}>
                <input className="form-control mr-sm-2" type="search" placeholder={this.props.placeholder} aria-label={this.props.placeholder} value={this.state.value} onChange={this.changeValue} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{this.props.buttonText}</button>
            </form>
        );
    }
}