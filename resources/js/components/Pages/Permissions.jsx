import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {loadPermissions} from "../../redux/actions";
import Search from "../Form/Search";
import LoadIndicator from "../Common/LoadIndicator";
import PageLink from "../Common/PageLink";
import {error_type, fetching_type} from "../../constants/apiConstants";
import {LOAD_PERMISSIONS} from "../../constants/actionTypes";

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
     * Change search input.
     *
     * @param new_search
     */
    searchChanged(new_search) {
        this.setState({search: new_search});
        this.props.permissionsListActions.loadPermissions(new_search);
    }

    render() {

        const permissions = this.props.permissionsList.get('permissions'),
            fetching = this.props.permissionsList.get(fetching_type(LOAD_PERMISSIONS)),
            error = this.props.permissionsList.get(error_type(LOAD_PERMISSIONS));

        return (
            <>
                <h3>{this.props.t('view.permissions')} <PageLink page="create_permission" class_name="btn btn-outline-primary">{this.props.t('view.create')}</PageLink></h3>
                <br/>
                <Search onChangeValue={this.searchChanged} placeholder={this.props.t('view.search')} buttonText={this.props.t('view.search_go')} />
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
                                                    <td><PageLink page={'edit_permission'} id={permission.get('id')}>{permission.get('name')}</PageLink></td>
                                                    <td>{permission.get('description')}</td>
                                                    <td>
                                                        {
                                                            groups && groups.size > 0 ?
                                                                groups.map((group, key) => {
                                                                    return (
                                                                        <div key={key}>
                                                                            <PageLink page="edit_group" id={group.get('id')}>
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
                                                                            <PageLink page="edit_user" id={user.get('id')}>
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

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(Permissions));