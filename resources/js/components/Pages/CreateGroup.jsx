import React from 'react';
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {createGroup, loadParentGroups, nodeClear} from "../../redux/actions";
import Select from 'react-select'
import {getSelectedValue, getSelectOptions} from "../../helpers/select";
import {withMutationHandler} from "../Common/HOC/withMutationHandler";
import PreloaderButton from "../Common/PreloaderButton";
import {CREATE_GROUP} from "../../constants/actionTypes";
import OperationStatus from "../Common/OperationStatus";
import {serializeForm} from "../../helpers/serialize";

class CreateGroup extends React.Component {


    constructor(props) {

        super(props);

        this.form = React.createRef();

        this.send = this.send.bind(this);

    }

    componentDidMount() {
        this.props.groupsListActions.loadParentGroups();
    }

    /**
     * Отправка формы.
     */
    send(event) {
        event.preventDefault();
        this.props.groupsListActions.createGroup(serializeForm(this.form.current));
    }

    render() {

        const parent_groups_select_options = getSelectOptions(this.props.groupsList.get('parent_groups'));
        parent_groups_select_options.unshift({value: 0, label: this.props.t('view.select_parent_group')});

        return (
            <form onSubmit={this.send} ref={this.form}>
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

const CreateGroupWithMutationHandler = withMutationHandler(
    CreateGroup,
    'groupsList',
    CREATE_GROUP,
    nodeClear
);

function mapStateToProps(state) {
    return {
        groupsList: state.get('groupsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        groupsListActions: bindActionCreators({
            createGroup,
            loadParentGroups,
            nodeClear
        }, dispatch),
    }
}

export default withTranslation('general')(connect(mapStateToProps, mapDispatchToProps)(CreateGroupWithMutationHandler));