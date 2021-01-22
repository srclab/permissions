import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {loadGroups} from "../../redux/actions";
import LoadIndicator from "../Request/LoadIndicator";

class Groups extends React.Component {

    componentDidMount() {
        this.props.groupsListActions.loadGroups();
    }

    render() {

        const groups = this.props.groupsList.get('groups'),
            fetching = this.props.groupsList.get('fetching'),
            error = this.props.groupsList.get('loadGroupsListError');

        return (
            <>
                <h3>Группы пользователей</h3>
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

                                            const permissions = group.get('permissions'),
                                                users = group.get('users');

                                            return (
                                                <tr key={key}>
                                                    <th scope="row">{group.get('id')}</th>
                                                    <td>{group.getIn(['parent', 'name']) || '-'}</td>
                                                    <td>{group.get('name')}</td>
                                                    <td>{group.get('description')}</td>
                                                    <td>
                                                        {
                                                            users && users.size > 0 ?
                                                                users.map((user, key) => {
                                                                    return (
                                                                        <div key={key}>
                                                                            {/*todo link*/}
                                                                            <a href="#">ID{user.get('id')} {user.get('login')}</a>
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
                                                                        //todo link
                                                                        <div key={key}>
                                                                            <a href="#">ID{permission.get('id')} {permission.get('name')}</a>
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