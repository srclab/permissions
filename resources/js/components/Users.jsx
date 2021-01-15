import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {loadUsers} from "../redux/actions";
import TextInput from "./TextInput";

class Users extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            search: '',
        }

        this.searchChanged = this.searchChanged.bind(this);

    }

    componentDidMount() {
        this.props.usersListActions.loadUsers(this.state.search);
    }

    /**
     * Изменение строки поиска.
     *
     * @param new_search
     */
    searchChanged(new_search) {
        this.setState({search: new_search});
        this.props.usersListActions.loadUsers(new_search);
    }

    render() {

        const users = this.props.usersList.get('users');

        return (
            <>
                <h3>{this.props.t('view.users')}</h3>
                <br/>
                <TextInput onChangeValue={this.searchChanged} placeholder={this.props.t('view.search')} buttonText={this.props.t('view.search_go')} />
                <br/>
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
                                            <a href="#">{user.get('login')}</a><br/>
                                            #{user.getIn(['group', 'id'])} {user.getIn(['group', 'name'])}
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
        usersList: state.get('usersList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usersListActions: bindActionCreators({
            loadUsers
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true })(Users));