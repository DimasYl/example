import {authAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import { RootReduxState } from "./redux-store";

export type DataType = {
    userId: string | null
    email: string | null
    login: string | null
}

type SetAuthReducerActionType = {
    type: 'SET_USER_DATA'
    data: DataType
}

type AutLoginActionType = {
    type: 'AUT_LOGIN'
    data: {
        userId: number
    }
}
type AntiLoginActionType = {
    type: 'ANTI_LOGIN'
    data: {}
}


type ActionType =  SetAuthReducerActionType | AutLoginActionType | AntiLoginActionType

const SET_USER_DATA = 'SET_USER_DATA'
const AUT_LOGIN = 'AUT_LOGIN'
const ANTI_LOGIN = 'ANTI_LOGIN'

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
                ...action.data,
                isAuth: true
            }
        case "AUT_LOGIN":
            return {
                ...state,
                userId: state.userId
            }
        default:
            return state
    }
}

export const setAuthUserData =
    (userId: string | null,email: string | null,login: string | null): SetAuthReducerActionType =>
    ({type: SET_USER_DATA,data: {userId,email,login}})

type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionType>

export const author = ():ThunkType => {
    return (dispatch) => {
        authAPI.me().then((data) => {
            if(data.resultCode === 0){
                let {userId,login,email} = data.data
                dispatch(setAuthUserData(userId,email,login))
            }
        })
    }
}

export const autLogin = (): ThunkType => {
    const email = 'dima.ilyushin.2016@mail.ru'
        const password = '1105Taska1992'
    return (dispatch) => {
        authAPI.login(email,password,true)
            .then((res)=>{
                return res.data
            })
    }
}

export const antiLogin = (): ThunkType => {
    return (dispatch) => {
        authAPI.antiLogin()
            .then((res) => {
                return res.data
            })
    }
}

export default authReducer