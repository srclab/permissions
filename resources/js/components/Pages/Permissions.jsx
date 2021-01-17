import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {loadPermissions} from "../../redux/actions";
import TextInput from "../Form/TextInput";
import LoadIndicator from "../Request/LoadIndicator";
import PageLink from "../Common/PageLink";

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

        const permissions = this.props.permissionsList.get('permissions'),
            fetching = this.props.permissionsList.get('fetching'),
            error = this.props.permissionsList.get('loadPermissionsListError');

        //todo create
        return (
            <>
                <h3>{this.props.t('view.permissions')} <button type="button" className="btn btn-outline-primary">{this.props.t('view.create')}</button></h3>
                <br/>
                <TextInput onChangeValue={this.searchChanged} placeholder={this.props.t('view.search')} buttonText={this.props.t('view.search_go')} />
                <br/>
                {
                    fetching || error ?
                        <LoadIndicator error={error} />
                        :
                        (
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
                                                                        <div key={key}>
                                                                            <PageLink page="groups">
                                                                                ID{group.get('id')} {group.get('name')}
                                                                            </PageLink>
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
                                                                            <PageLink page="users" search={user.get('id')}>
                                                                                ID{user.get('id')} {user.get('login')}
                                                                            </PageLink>
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
                        )
                }

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