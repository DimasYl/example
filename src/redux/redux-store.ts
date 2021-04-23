import {applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type RootReduxState = ReturnType<typeof redusers>


let store = createStore(redusers, applyMiddleware(thunkMiddleware))
export type ReduxStoreType = typeof store
export default store

// @ts-ignore
window.store = store