type ActionType = followActionType | unfollowActionType | setUsersActionType

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
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'


let initialState: InitialStateType = {
    users: []
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
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export const followAC = (userId: number): followActionType => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): unfollowActionType => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: Array<UsersType>): setUsersActionType => ({type: SET_USERS, users})

export default usersReducer