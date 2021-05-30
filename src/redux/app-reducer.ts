import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";


type SetInitializedActionType = {
    type: 'INITIALIZED_SUCCESS'
    initialized: boolean
}
const INITIALIZED_SUCCESS= 'INITIALIZED_SUCCESS'

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action:SetInitializedActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
              initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = (initialized: boolean): SetInitializedActionType => ({type: "INITIALIZED_SUCCESS", initialized})
// export const initializedSuccess = () => ({type: "INITIALIZED_SUCCESS"})

type ThunkType = ThunkAction<void, RootReduxState, unknown, SetInitializedActionType>


export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    // dispatch(somethingelse())
    // dispatch(somethingelse())
    // @ts-ignore
    promise.then(()=>{
        dispatch(initializedSuccess(true))
    })


}

export default appReducer