import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {loadPermissions} from "../redux/actions";
import TextInput from "./TextInput";

class Permissions extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            search: '',
        }

        this.searchChanged = this.searchChanged.bind(this);

    }

    componentDidMount() {
        this.props.permissionsListActions.loadPermissions(this.state.search);
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

        const permissions = this.props.permissionsList.get('permissions');

        return (
            <>
                <h3>{this.props.t('view.permissions')}</h3>
                <br/>
                <TextInput onChangeValue={this.searchChanged} placeholder={this.props.t('view.search')} buttonText={this.props.t('view.search_go')} />
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{this.props.t('view.name')}</th>
                        <th scope="col">{this.props.t('view.description')}</th>
                        <th scope="col">{this.props.t('view.groups_one')}</th>
                        <th scope="col">{this.props.t('view.users_one')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        permissions && permissions.size > 0 ?

                            permissions.map((permission, key) => {

                                const groups = permission.get('groups'),
                                    users = permission.get('users');

                                return (
                                    <tr key={key}>
                                        <th scope="row">{permission.get('id')}</th>
                                        <td>{permission.get('name')}</td>
                                        <td>{permission.get('description')}</td>
                                        <td>
                                            {
                                                groups && groups.size > 0 ?
                                                    groups.map((group, key) => {
                                                        return (
                                                            //todo link
                                                            <div key={key}>
                                                                <a href="#">ID{group.get('id')} {group.get('name')}</a>
                                                                <br/>
                                                            </div>
                                                        )
                                                    })
                                                    : '-'
                                            }
                                        </td>
                                        <td>
                                            {
                                                users && users.size > 0 ?
                                                    users.map((user, key) => {
                                                        return (
                                                            <div key={key}>
                                                                //todo link
                                                                <a href="#">ID{user.get('id')} {user.get('login')}</a>
                                                                <br/>
                                                            </div>
                                                        )
                                                    })
                                                    : '-'
                                            }
                                        </td>
                                    </tr>
                                )
                            })

                            : <tr><td>{this.props.t('view.empty_data')}</td></tr>
                    }
                    </tbody>
                </table>
            </>
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
            loadPermissions
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true })(Permissions));