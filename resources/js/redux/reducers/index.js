import {combineReducers} from 'redux-immutable'
import {app} from './appReducer'
import {permissionsList} from './permissionsReducer'
import {groupsList} from './groupsReducer'
import {usersList} from './usersReducer'

/**
 * Combine reducers
 */
const rootReducer = () => combineReducers({
    app,
    permissionsList,
    groupsList,
    usersList,
});

export default rootReducer;