import {
    error_type,
    fail_type,
    fetching_type,
    request_type,
    response_type,
    validation_type
} from "../../constants/apiConstants";
import Immutable from "immutable";

export function queryHandler(state, action, success_handler) {

    switch (action.type) {
        case request_type(action.main_type):
            return state.set(fetching_type(action.main_type), true)
                .delete(error_type(action.main_type))
                .delete(validation_type(action.main_type));
        case response_type(action.main_type):
            return success_handler(state.delete(fetching_type(action.main_type)), action);
        case fail_type(action.main_type):
            return state.delete(fetching_type(action.main_type))
                .set(error_type(action.main_type), Immutable.fromJS(action.error))
                .set(validation_type(action.main_type), Immutable.fromJS(action.validation));
        default:
            return state;
    }

}

