import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {createPermission, loadPermissions} from "../../redux/actions";
import TextInput from "../Form/TextInput";
import LoadIndicator from "../Request/LoadIndicator";
import PageLink from "../Common/PageLink";

class Permissions extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            name: '',
            description: '',
            ui_group: '', //todo
        }

        this.send = this.send.bind(this);

    }

    send() {
        this.props.permissionsListActions.createPermission(this.state);
    }

    /**
     * Изменение строки поиска.
     *
     * @param new_search
     */
    searchChanged(new_search) {
        this.setState({search: new_search});
        this.props.permissionsListActions.loadPermissions(new_search);
    }

    render() {
        return (
            <form onSubmit={this.send}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                           placeholder="Password" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        permissionsList: state.get('permissionsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        permissionsListActions: bindActionCreators({
            createPermission
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(Permissions));