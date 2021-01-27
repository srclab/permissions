import React from 'react';

export default class EditablePermissions extends React.Component {

    render() {

        if(!this.props.permissions || !this.props.ui_groups || !this.props.selected_parent_permissions || !this.props.selected_permissions) {
            return '';
        }

        let result = [];

        this.props.permissions.groupBy(permission => permission.get('ui_group')).sort().forEach((grouped_permissions, ui_group_id) => {

            let checkboxes = [];

            grouped_permissions.forEach((permission) => {

                let is_parent_permission = this.props.selected_parent_permissions.find(parent_permission => parent_permission === permission.get('id')),
                    is_checked = this.props.selected_permissions.find(selected_permission_id => selected_permission_id === permission.get('id'));

                checkboxes.push(
                    <div key={permission.get('id')} className="ui-group-permission col-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="permissions[]" defaultValue={permission.get('id')} defaultChecked={is_checked} disabled={is_parent_permission} />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                {permission.get('description')} {is_parent_permission ? '*' : ''}
                            </label>
                        </div>
                    </div>
                );
            });

            result.push(
                <div key={ui_group_id} className="row">
                    <div className="ui-group-name col-12"><b>{this.props.ui_groups.find((value, key) => key === ui_group_id)}</b></div>
                    {checkboxes}
                </div>
            );

        });

        return result;
    }

}