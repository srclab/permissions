import React from 'react';
import {withTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {
    loadGroups,
    loadPermissions,
    loadPermissionsUiGroups,
    loadUser,
    nodeClear,
    updateUser
} from "../../redux/actions";
import Select from 'react-select'
import {getSelectedValue, getSelectOptions} from "../../helpers/select";
import {withMutationHandler} from "../Common/HOC/withMutationHandler";
import PreloaderButton from "../Common/PreloaderButton";
import {
    LOAD_GROUPS,
    LOAD_PERMISSIONS,
    LOAD_PERMISSIONS_UI_GROUPS,
    LOAD_USER,
    UPDATE_USER
} from "../../constants/actionTypes";
import OperationStatus from "../Common/OperationStatus";
import {serializeForm} from "../../helpers/serialize";
import {error_type, fetching_type} from "../../constants/apiConstants";
import LoadIndicator from "../Common/LoadIndicator";
import EditablePermissions from "../Common/EditablePermissions";

class EditUser extends React.Component {

    constructor(props) {

        super(props);

        this.form = React.createRef();

        this.send = this.send.bind(this);

    }

    componentDidMount() {
        this.props.usersListActions.loadUser(this.props.app.get('id'));
        this.props.groupsListActions.loadGroups();
        this.props.permissionsListActions.loadPermissions();
        this.props.permissionsListActions.loadPermissionsUiGroups();
    }

    /**
     * Send form.
     */
    send(event) {
        event.preventDefault();
        this.props.usersListActions.updateUser(this.props.app.get('id'), serializeForm(this.form.current));
    }

    render() {

        const fetching = this.props.usersList.get(fetching_type(LOAD_USER))
                || this.props.groupsList.get(fetching_type(LOAD_GROUPS))
                || this.props.permissionsList.get(fetching_type(LOAD_PERMISSIONS))
                || this.props.permissionsList.get(fetching_type(LOAD_PERMISSIONS_UI_GROUPS)),
            error = this.props.usersList.get(error_type(LOAD_USER))
                || this.props.groupsList.get(error_type(LOAD_GROUPS))
                || this.props.permissionsList.get(error_type(LOAD_PERMISSIONS))
                || this.props.permissionsList.get(error_type(LOAD_PERMISSIONS_UI_GROUPS));

        let groups_select_options = [];

        if(this.props.groupsList.get('groups')) {
            groups_select_options = getSelectOptions(this.props.groupsList.get('groups').toMap().mapEntries(([key, group]) => [group.get('id'), group.get('name')]))
        }

        return (
            fetching || error ?
                <LoadIndicator error={error} />
                :
                <>
                    <h3>{this.props.t('view.change_user')}</h3>

                    <form onSubmit={this.send} ref={this.form}>
                        <div className="form-group">
                            <label>{this.props.t('view.id')}</label>
                            <input type="text" name="id" defaultValue={this.props.usersList.getIn(['user', 'id'])} className="form-control" disabled />
                        </div>
                        <div className="form-group">
                            <label>{this.props.t('view.login')}</label>
                            <input type="text" name="login" defaultValue={this.props.usersList.getIn(['user', 'login'])} className="form-control" disabled />
                        </div>
                        <div className="form-group">
                            <label>{this.props.t('view.group')}</label>
                            <Select
                                name="group_id"
                                defaultValue={getSelectedValue(this.props.usersList.getIn(['user', 'group_id']), groups_select_options)}
                                options={groups_select_options}
                                classNamePrefix="react-select"
                                placeholder={this.props.t('view.select_group')}
                            />
                        </div>

                        <h5>{this.props.t('view.user_permissions')}</h5>
                        <p><i>* - {this.props.t('view.cant_edit_parent_permissions')}</i></p>

                        <EditablePermissions
                            permissions={this.props.permissionsList.get('permissions')}
                            selected_permissions={this.props.usersList.getIn(['user', 'permissions'])}
                            selected_parent_permissions={this.props.usersList.getIn(['user', 'group_permissions'])}
                            ui_groups={this.props.permissionsList.get('permissions_ui_groups')} />

                        <br />

                        {
                            !this.props.operation_status || this.props.operation_status.status !== "success"
                                ? <PreloaderButton type="submit" className="btn btn-primary" is_loading={this.props.forwarding}>{this.props.t('view.update')}</PreloaderButton>
                                : ''
                        }
                        <OperationStatus {...this.props} />
                    </form>
                </>
        );
    }
}

const EditUserWithMutationHandler = withMutationHandler(
    EditUser,
    'usersList',
    UPDATE_USER,
    nodeClear
);

function mapStateToProps(state) {
    return {
        app: state.get('app'),
        usersList: state.get('usersList'),
        groupsList: state.get('groupsList'),
        permissionsList: state.get('permissionsList'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        groupsListActions: bindActionCreators({
            loadGroups,
        }, dispatch),
        permissionsListActions: bindActionCreators({
            loadPermissions,
            loadPermissionsUiGroups,
        }, dispatch),
        usersListActions: bindActionCreators({
            loadUser,
            updateUser,
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(EditUserWithMutationHandler));