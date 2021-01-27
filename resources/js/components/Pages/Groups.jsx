import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {loadGroups} from "../../redux/actions";
import LoadIndicator from "../Common/LoadIndicator";
import {error_type, fetching_type} from "../../constants/apiConstants";
import {LOAD_GROUPS} from "../../constants/actionTypes";
import PageLink from "../Common/PageLink";

class Groups extends React.Component {

    componentDidMount() {
        this.props.groupsListActions.loadGroups();
    }

    render() {

        const groups = this.props.groupsList.get('groups'),
            fetching = this.props.groupsList.get(fetching_type(LOAD_GROUPS)),
            error = this.props.groupsList.get(error_type(LOAD_GROUPS));

        return (
            <>
                <h3>{this.props.t('view.users_groups')} <PageLink page="create_group" class_name="btn btn-outline-primary">{this.props.t('view.create')}</PageLink></h3>
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
                                    <th scope="col">{this.props.t('view.parent_group')}</th>
                                    <th scope="col">{this.props.t('view.name')}</th>
                                    <th scope="col">{this.props.t('view.description')}</th>
                                    <th scope="col">{this.props.t('view.users_one')}</th>
                                    <th scope="col">{this.props.t('view.permissions_one')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    groups && groups.size > 0 ?

                                        groups.map((group, key) => {

                                            const permissions = group.getIn(['parent', 'id']) ? group.getIn(['parent', 'permissions']).merge(group.get('permissions')) : group.get('permissions'),
                                                users = group.get('users');

                                            return (
                                                <tr key={key}>
                                                    <th scope="row">{group.get('id')}</th>
                                                    <td>
                                                        {
                                                            group.getIn(['parent', 'id'])
                                                                ?
                                                                <PageLink page="edit_group" id={group.getIn(['parent', 'id'])}>
                                                                    {group.getIn(['parent', 'name'])}
                                                                </PageLink>
                                                                :
                                                                '-'
                                                        }
                                                    </td>
                                                    <td>
                                                        <PageLink page="edit_group" id={group.get('id')}>
                                                            {group.get('name')}
                                                        </PageLink>
                                                    </td>
                                                    <td>{group.get('description')}</td>
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
                                                    <td>
                                                        {
                                                            permissions && permissions.size > 0 ?
                                                                permissions.map((permission, key) => {
                                                                    return (
                                                                        <div key={key}>
                                                                            <PageLink page="edit_permission" id={permission.get('id')}>
                                                                                ID{permission.get('id')} {permission.get('name')}
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

                                        : <tr>
                                            <td>{this.props.t('view.empty_data')}</td>
                                        </tr>
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
        groupsList: state.get('groupsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        groupsListActions: bindActionCreators({
            loadGroups
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(Groups));