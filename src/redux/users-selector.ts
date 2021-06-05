import {RootReduxState} from "./redux-store";
import {createSelector} from "reselect";

export const getUserSelector = (state: RootReduxState) => {
 return state.usersPage.users
}

export const getUser = createSelector(getUserSelector,(users)=>{
    return users.filter(u=>true)
})

export const getPageSize = (state: RootReduxState) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: RootReduxState) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: RootReduxState) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: RootReduxState) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: RootReduxState) => {
    return state.usersPage.followingInProgress
}


