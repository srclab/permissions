import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {
    deletePermission,
    loadPermission,
    loadPermissionsUiGroups,
    nodeClear,
    updatePermission
} from "../../redux/actions";
import Select from 'react-select'
import {getSelectedValue, getSelectOptions} from "../../helpers/select";
import {withMutationHandler} from "../Common/HOC/withMutationHandler";
import PreloaderButton from "../Common/PreloaderButton";
import {DELETE_PERMISSION, LOAD_PERMISSION, UPDATE_PERMISSION} from "../../constants/actionTypes";
import OperationStatus from "../Common/OperationStatus";
import {serializeForm} from "../../helpers/serialize";
import {error_type, fetching_type} from "../../constants/apiConstants";
import LoadIndicator from "../Common/LoadIndicator";

class EditPermission extends React.Component {

    constructor(props) {

        super(props);

        this.form = React.createRef();

        this.send = this.send.bind(this);
        this.delete = this.delete.bind(this);

    }

    componentDidMount() {
        this.props.permissionsListActions.loadPermission(this.props.app.get('id'));
        this.props.permissionsListActions.loadPermissionsUiGroups();
    }

    /**
     * Send form.
     */
    send(event) {
        event.preventDefault();
        this.props.setMutationAction(UPDATE_PERMISSION);
        this.props.permissionsListActions.updatePermission(serializeForm(this.form.current));
    }

    /**
     * Delete.
     */
    delete() {
        this.props.setMutationAction(DELETE_PERMISSION);
        this.props.permissionsListActions.deletePermission(this.props.permissionsList.getIn(['permission', 'id']));
    }

    render() {

        const ui_groups_select_options = getSelectOptions(this.props.permissionsList.get('permissions_ui_groups')),
            fetching = this.props.permissionsList.get(fetching_type(LOAD_PERMISSION)),
            error = this.props.permissionsList.get(error_type(LOAD_PERMISSION));

        return (
            fetching || error ?
                <LoadIndicator error={error} />
                :
                <>
                    <h3>{this.props.t('view.change_permission')}</h3>
                    <form onSubmit={this.send} ref={this.form}>
                        <input type="hidden" name="id" defaultValue={this.props.permissionsList.getIn(['permission', 'id'])} />
                        <div className="form-group">
                            <label>{this.props.t('view.name')}</label>
                            <input type="text" name="name" defaultValue={this.props.permissionsList.getIn(['permission', 'name'])} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{this.props.t('view.description')}</label>
                            <input type="text" name="description" defaultValue={this.props.permissionsList.getIn(['permission', 'description'])} className="form-control" onChange={event => this.setState({description: event.target.value})} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">{this.props.t('view.ui_group')}</label>
                            <Select
                                name="ui_group"
                                defaultValue={getSelectedValue(this.props.permissionsList.getIn(['permission', 'ui_group']), ui_groups_select_options)}
                                options={ui_groups_select_options}
                                classNamePrefix="react-select"
                                placeholder={this.props.t('view.select_ui_group')}
                            />
                        </div>
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

const EditPermissionWithMutationHandler = withMutationHandler(
    EditPermission,
    'permissionsList',
    null,
    nodeClear
);

function mapStateToProps(state) {
    return {
        app: state.get('app'),
        permissionsList: state.get('permissionsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        permissionsListActions: bindActionCreators({
            updatePermission,
            deletePermission,
            loadPermission,
            loadPermissionsUiGroups,
            nodeClear
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(EditPermissionWithMutationHandler));