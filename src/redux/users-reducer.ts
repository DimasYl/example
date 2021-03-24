type ActionType =
    followActionType
    | unfollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType

type followActionType = {
    type: 'FOLLOW'
    userId: number
}
type unfollowActionType = {
    type: 'UNFOLLOW'
    userId: number
}
type setUsersActionType = {
    type: 'SET_USERS'
    users: Array<UsersType>
}

type setCurrentPageActionType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
type setTotalUsersCountActionType = {
    type: 'SET_TOTAL_USERS_COUNT'
    count: number
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
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'


let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1
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
        default:
            return state
    }
}

export const followAC = (userId: number): followActionType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): unfollowActionType => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: Array<UsersType>): setUsersActionType => ({type: SET_USERS, users})
export const setCurrentPageAC = (currentPage: number): setCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalUsersCountAC = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})

export default usersReducer