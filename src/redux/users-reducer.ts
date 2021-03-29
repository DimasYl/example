export type ActionType =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType

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
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'


let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action: ActionType) => {
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
        case "TOGGLE_IS_FETCHING":
        return {
            ...state,isFetching: action.isFetching
        }
        default:
            return state
    }
}

export const follow = (userId: number): FollowActionType => ({type: FOLLOW, userId})
export const unfollow = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId})
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
    type: TOGGLE_IS_FETCHING, isFetching})

export default usersReducer