import React from 'react';

export default class OperationStatus extends React.Component {

    /**
     * Get string with validation errors.
     */
    getValidationsString() {

        let result = [], index = 0;

        for (let key in this.props.validation) {
            result.push(this.props.validation[key][0], <br key={index++}/>);
        }

        return result;
    }

    render() {

        if(this.props.forwarding) {
            return '';
        }

        //todo вынести в отдельный метод и вызвать здесь
        if (this.props.forwardingError) {
            return <div className="alert alert-danger mt-3">{this.props.forwardingError}</div>
        } else if (this.props.validation) {
            return <div className="alert alert-danger mt-3">{this.getValidationsString()}</div>
        } else if (this.props.operation_status) {
            if (this.props.operation_status.status === "success") {
                return <div className="alert alert-success mt-3">{this.props.operation_status.message}</div>
            } else if (this.props.operation_status.status === "error") {
                return <div className="alert alert-danger mt-3">{this.props.operation_status.message}</div>
            }
        }

        return '';

    }
}