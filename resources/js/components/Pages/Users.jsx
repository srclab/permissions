import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {clearPage, loadUsers} from "../../redux/actions";
import Search from "../Form/Search";
import LoadIndicator from "../Common/LoadIndicator";
import PageLink from "../Common/PageLink";
import {error_type, fetching_type} from "../../constants/apiConstants";
import {LOAD_USERS} from "../../constants/actionTypes";

class Users extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            search: props.app.get('search') || '',
        }

        props.appActions.clearSearch();

        this.searchChanged = this.searchChanged.bind(this);

    }

    componentDidMount() {
        this.props.usersListActions.loadUsers(this.state.search);
    }

    /**
     * Change search input.
     *
     * @param new_search
     */
    searchChanged(new_search) {
        this.setState({search: new_search});
        this.props.usersListActions.loadUsers(new_search);
    }

    render() {

        const users = this.props.usersList.get('users'),
            fetching = this.props.usersList.get(fetching_type(LOAD_USERS)),
            error = this.props.usersList.get(error_type(LOAD_USERS));

        return (
            <>
                <h3>{this.props.t('view.users')}</h3>
                <br/>
                <Search value={this.state.search} onChangeValue={this.searchChanged} placeholder={this.props.t('view.search')} buttonText={this.props.t('view.search_go')} />
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
                                    <th scope="col">{this.props.t('view.user')}</th>
                                    <th scope="col">{this.props.t('view.permissions_one')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    users && users.size > 0 ?

                                        users.map((user, key) => {

                                            const permissions = user.get('permissions');

                                            return (
                                                <tr key={key}>
                                                    <th scope="row">{user.get('id')}</th>
                                                    <td scope="row">
                                                        <PageLink page="edit_user" id={user.get('id')}>
                                                            {user.get('login')}
                                                        </PageLink>
                                                        <br/>
                                                        <PageLink page="edit_group" id={user.getIn(['group', 'id'])}>
                                                            ID{user.getIn(['group', 'id'])} {user.getIn(['group', 'name'])}
                                                        </PageLink>
                                                    </td>
                                                    <td>
                                                        {
                                                            permissions && permissions.size > 0 ?
                                                                permissions.map((permission, key) => {
                                                                    return (
                                                                        <div key={key}>
                                                                            <PageLink page="edit_permission" id={permission.get('id')}>
                                                                                ID{permission.get('id')} {permission.get('description')}
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
        app: state.get('app'),
        usersList: state.get('usersList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({
            clearSearch: clearPage
        }, dispatch),
        usersListActions: bindActionCreators({
            loadUsers
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(Users));