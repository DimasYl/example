import {combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer
})

export type RootReduxState = ReturnType<typeof redusers>


let store = createStore(redusers)
export type ReduxStoreType = typeof store
export default store