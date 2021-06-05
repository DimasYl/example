import {authAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./redux-store";
import {stopSubmit} from "redux-form";

export type DataType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthReducerActionType = {
    type: 'SET_USER_DATA'
    payload: DataType
}

type AutLoginActionType = {
    type: 'LOGIN'
    data: {
        userId: number
    }
}
type AntiLoginActionType = {
    type: 'OUT_LOGIN'
    data: {}
}


type ActionType =  SetAuthReducerActionType | AutLoginActionType | AntiLoginActionType

const SET_USER_DATA = 'SET_USER_DATA'

type AuthType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: AuthType = {
   userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionType): AuthType  => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData =
    (userId: string | null,email: string | null,login: string | null, isAuth: boolean): SetAuthReducerActionType =>
    ({type: SET_USER_DATA,payload: {userId,email,login, isAuth}})

type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionType>

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let response = await authAPI.me()
        if (response.resultCode === 0) {
            let {userId, login, email} = response.data
            dispatch(setAuthUserData(userId, email, login, true))
        }

}



export const login = (email: string, password: string, rememberMe: boolean): ThunkType=> async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
            if(response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                // @ts-ignore
                dispatch(stopSubmit("login", {_error: message}))
            }
}

export const logout = (): ThunkType=> async (dispatch) => {
    let response = await authAPI.logout()
            if(response.data.resultCode === 0) {
                dispatch(setAuthUserData(null,null,null, false))
            }
}

export default authReducer