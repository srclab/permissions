import {combineReducers} from 'redux-immutable'
import {permissionsList} from './permissionsReducer'
import {groupsList} from './groupsReducer'
import {usersList} from './usersReducer'

/**
 * Combine reducers
 */
const rootReducer = () => combineReducers({
    permissionsList,
    groupsList,
    usersList,
});

export default rootReducer;