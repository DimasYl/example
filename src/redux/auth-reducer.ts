
export type DataType = {
    userId: string | null
    email: string | null
    login: string | null
}

type SetAuthReducerActionType = {
    type: 'SET_USER_DATA'
    data: DataType
}

type ActionType =  SetAuthReducerActionType

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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData =
    (userId: string | null,email: string | null,login: string | null): SetAuthReducerActionType =>
    ({type: SET_USER_DATA,data: {userId,email,login}})

export default authReducer