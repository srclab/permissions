import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import rootReducer from '../redux/reducers'
// import {createLogger} from 'redux-logger'
import {apiMiddleware} from '../redux/enhancers/apiEnhancers'

export default function configureAppStore(preloadedState) {
    return configureStore({
        reducer: rootReducer(),
        middleware: [/*createLogger(), */apiMiddleware, ...getDefaultMiddleware({serializableCheck: false})],
        preloadedState,
    })
}