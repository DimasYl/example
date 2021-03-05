import {combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialog-reducer";

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

export type RootReduxState = ReturnType<typeof redusers>


let store = createStore(redusers)
export type ReduxStoreType = typeof store
export default store