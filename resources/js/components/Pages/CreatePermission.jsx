import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {createPermission, loadPermissionsUiGroups, nodeClear} from "../../redux/actions";
import Select from 'react-select'
import {getSelectOptions} from "../../helpers/select";
import {withMutationHandler} from "../Common/HOC/withMutationHandler";
import PreloaderButton from "../Common/PreloaderButton";
import {CREATE_PERMISSION} from "../../constants/actionTypes";
import OperationStatus from "../Common/OperationStatus";
import {serializeForm} from "../../helpers/serialize";

class CreatePermission extends React.Component {


    constructor(props) {

        super(props);

        this.form = React.createRef();

        this.send = this.send.bind(this);

    }

    componentDidMount() {
        this.props.permissionsListActions.loadPermissionsUiGroups();
    }

    /**
     * Send form.
     *
     * @param event
     */
    send(event) {
        event.preventDefault();
        this.props.permissionsListActions.createPermission(serializeForm(this.form.current));
    }

    render() {

        const ui_groups_select_options = getSelectOptions(this.props.permissionsList.get('permissions_ui_groups'));

        return (
            <form onSubmit={this.send} ref={this.form}>
                <div className="form-group">
                    <label>{this.props.t('view.name')}</label>
                    <input type="text" name="name" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{this.props.t('view.description')}</label>
                    <input type="text" name="description" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{this.props.t('view.ui_group')}</label>
                    <Select
                        name="ui_group"
                        options={ui_groups_select_options}
                        classNamePrefix="react-select"
                        placeholder={this.props.t('view.select_ui_group')}
                    />
                </div>
                {
                    !this.props.operation_status || this.props.operation_status.status !== "success"
                        ? <PreloaderButton type="submit" className="btn btn-primary" is_loading={this.props.forwarding}>{this.props.t('view.create')}</PreloaderButton>
                        : ''
                }
                <OperationStatus {...this.props} />
            </form>
        );
    }
}

const CreatePermissionWithMutationHandler = withMutationHandler(
    CreatePermission,
    "permissionsList",
    CREATE_PERMISSION,
    nodeClear
);

function mapStateToProps(state) {
    return {
        permissionsList: state.get('permissionsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        permissionsListActions: bindActionCreators({
            createPermission,
            loadPermissionsUiGroups,
            nodeClear
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(CreatePermissionWithMutationHandler));