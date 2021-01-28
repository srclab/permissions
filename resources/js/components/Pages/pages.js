import React from 'react';
import Users from "./Users";
import Groups from "./Groups";
import Permissions from "./Permissions";
import CreatePermission from "./CreatePermission";
import EditPermission from "./EditPermission";
import EditGroup from "./EditGroup";
import CreateGroup from "./CreateGroup";
import EditUser from "./EditUser";

export default {
    users: <Users />,
    groups: <Groups />,
    permissions: <Permissions />,
    create_permission: <CreatePermission />,
    create_group: <CreateGroup />,
    edit_permission: <EditPermission />,
    edit_group: <EditGroup />,
    edit_user: <EditUser />,
}