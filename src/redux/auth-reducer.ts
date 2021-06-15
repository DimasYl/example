import {authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./redux-store";
import {stopSubmit} from "redux-form";

export type DataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthReducerActionType = {
    type: typeof SET_USER_DATA
    payload: DataType
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl: string
    }
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


type ActionType = SetAuthReducerActionType | AutLoginActionType | AntiLoginActionType | GetCaptchaUrlSuccessActionType

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: ActionType): AuthType => {
    switch (action.type) {
        case "SET_USER_DATA":
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthReducerActionType =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})


export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionType>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData= await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }

}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha()
    const captchaUrl = data.url


    dispatch(getCaptchaUrlSuccess(captchaUrl))

}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        // @ts-ignore
        dispatch(stopSubmit("login", {_error: message}))
    }
}



export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer