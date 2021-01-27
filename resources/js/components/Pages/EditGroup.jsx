import React from 'react';
import {withTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {
    deleteGroup,
    loadGroup,
    loadParentGroups,
    loadPermissions,
    loadPermissionsUiGroups,
    nodeClear,
    updateGroup
} from "../../redux/actions";
import Select from 'react-select'
import {getSelectedValue, getSelectOptions} from "../../helpers/select";
import {withMutationHandler} from "../Common/HOC/withMutationHandler";
import PreloaderButton from "../Common/PreloaderButton";
import {
    DELETE_GROUP,
    LOAD_GROUP,
    LOAD_PARENT_GROUPS,
    LOAD_PERMISSIONS,
    LOAD_PERMISSIONS_UI_GROUPS,
    UPDATE_GROUP
} from "../../constants/actionTypes";
import OperationStatus from "../Common/OperationStatus";
import {serializeForm} from "../../helpers/serialize";
import {error_type, fetching_type} from "../../constants/apiConstants";
import LoadIndicator from "../Common/LoadIndicator";
import EditablePermissions from "../Common/EditablePermissions";

class EditGroup extends React.Component {

    constructor(props) {

        super(props);

        this.form = React.createRef();

        this.send = this.send.bind(this);
        this.delete = this.delete.bind(this);

    }

    componentDidMount() {
        this.props.groupsListActions.loadGroup(this.props.app.get('id'));
        this.props.groupsListActions.loadParentGroups();
        this.props.permissionsListActions.loadPermissions();
        this.props.permissionsListActions.loadPermissionsUiGroups();
    }

    /**
     * Send form.
     */
    send(event) {
        event.preventDefault();
        this.props.setMutationAction(UPDATE_GROUP);
        this.props.groupsListActions.updateGroup(this.props.app.get('id'), serializeForm(this.form.current));
    }

    /**
     * Delete.
     */
    delete() {
        this.props.setMutationAction(DELETE_GROUP);
        this.props.groupsListActions.deleteGroup(this.props.groupsList.getIn(['group', 'id']));
    }

    render() {

        const parent_groups_select_options = getSelectOptions(this.props.groupsList.get('parent_groups')),
            fetching = this.props.groupsList.get(fetching_type(LOAD_GROUP))
                || this.props.groupsList.get(fetching_type(LOAD_PARENT_GROUPS))
                || this.props.permissionsList.get(fetching_type(LOAD_PERMISSIONS))
                || this.props.permissionsList.get(fetching_type(LOAD_PERMISSIONS_UI_GROUPS)),
            error = this.props.groupsList.get(error_type(LOAD_GROUP))
                || this.props.groupsList.get(error_type(LOAD_PARENT_GROUPS))
                || this.props.permissionsList.get(error_type(LOAD_PERMISSIONS))
                || this.props.permissionsList.get(error_type(LOAD_PERMISSIONS_UI_GROUPS));

        parent_groups_select_options.unshift({value: 0, label: this.props.t('view.select_parent_group')});

        return (
            fetching || error ?
                <LoadIndicator error={error} />
                :
                <>
                    <h3>{this.props.t('view.change_group')}</h3>

                    <form onSubmit={this.send} ref={this.form}>
                        <input type="hidden" name="id" defaultValue={this.props.groupsList.getIn(['group', 'id'])} />
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">{this.props.t('view.parent_group')}</label>
                            <Select
                                name="parent_id"
                                defaultValue={getSelectedValue(this.props.groupsList.getIn(['group', 'parent_id'], 0), parent_groups_select_options)}
                                options={parent_groups_select_options}
                                classNamePrefix="react-select"
                                placeholder={this.props.t('view.select_parent_group')}
                            />
                        </div>
                        <div className="form-group">
                            <label>{this.props.t('view.name')}</label>
                            <input type="text" name="name" defaultValue={this.props.groupsList.getIn(['group', 'name'])} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{this.props.t('view.description')}</label>
                            <input type="text" name="description" defaultValue={this.props.groupsList.getIn(['group', 'description'])} className="form-control" onChange={event => this.setState({description: event.target.value})} />
                        </div>

                        <h5>{this.props.t('view.group_permissions')}</h5>
                        <p><i>* - {this.props.t('view.cant_edit_parent_permissions')}</i></p>

                        <EditablePermissions
                            permissions={this.props.permissionsList.get('permissions')}
                            selected_permissions={this.props.groupsList.getIn(['group', 'permissions'])}
                            selected_parent_permissions={this.props.groupsList.getIn(['group', 'parent_permissions'])}
                            ui_groups={this.props.permissionsList.get('permissions_ui_groups')} />

                        <br />

                        {
                            !this.props.operation_status || this.props.operation_status.status !== "success"
                                ? (
                                    <>
                                        <PreloaderButton type="submit" className="btn btn-primary" is_loading={this.props.forwarding}>{this.props.t('view.update')}</PreloaderButton>
                                        <PreloaderButton type="button" className="btn btn-outline-danger ml-2" is_loading={this.props.forwarding} onClick={this.delete}>{this.props.t('view.delete')}</PreloaderButton>
                                    </>
                                )
                                : ''
                        }
                        <OperationStatus {...this.props} />
                    </form>
                </>
        );
    }
}

const EditGroupWithMutationHandler = withMutationHandler(
    EditGroup,
    'groupsList',
    null,
    nodeClear
);

function mapStateToProps(state) {
    return {
        app: state.get('app'),
        groupsList: state.get('groupsList'),
        permissionsList: state.get('permissionsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        groupsListActions: bindActionCreators({
            updateGroup,
            deleteGroup,
            loadGroup,
            loadParentGroups,
            nodeClear
        }, dispatch),
        permissionsListActions: bindActionCreators({
            loadPermissions,
            loadPermissionsUiGroups,
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(EditGroupWithMutationHandler));