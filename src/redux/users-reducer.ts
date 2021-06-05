import {usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./redux-store";


export type ActionType =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType

type FollowActionType = {
    type: 'FOLLOW'
    userId: number
}
type UnfollowActionType = {
    type: 'UNFOLLOW'
    userId: number
}
type SetUsersActionType = {
    type: 'SET_USERS'
    users: Array<UsersType>
}

type SetCurrentPageActionType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
type SetTotalUsersCountActionType = {
    type: 'SET_TOTAL_USERS_COUNT'
    count: number
}
type ToggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}

type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    followed: boolean
    name: string
    photos: string
    status: string
    location: LocationType
}

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return (
                {...state, followingInProgress: action.isFetching
                        ? [...state.followingInProgress,action.userId]
                        : state.followingInProgress.filter(id=>id !==action.userId)
                }
            )
        default:
            return state
    }
}

export const followSuccess = (userId: number): FollowActionType => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId})
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING, isFetching
})
export const toggleFollowingProgress = (isFetching: boolean,userId: number): ToggleFollowingProgressActionType => ({
    type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId
})

type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionType>

export const getUsers = (page: number, pageSize: number):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        let response = await usersAPI.getUsers(page,pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsersCount(response.totalCount))

    }
}

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any): Promise<void> => {
    dispatch(toggleFollowingProgress(true, id))
    let response = await apiMethod(id)

    if (response.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingProgress(false, id))
}

export const follow = (id:number):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        await followUnfollowFlow(dispatch, id, usersAPI.followed.bind(usersAPI), followSuccess)

    }
}

export const unfollow = (id:number):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
         await followUnfollowFlow(dispatch,id,usersAPI.unfollowed.bind(usersAPI),unfollowSuccess)
    }
}




export default usersReducer