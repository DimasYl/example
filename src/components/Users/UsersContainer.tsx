import React from 'react'
import {connect} from "react-redux";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../redux/users-reducer";
import {RootReduxState} from "../../redux/redux-store";
import Users from "./Users";

type mapStateToPropsType = {
    users: Array<UsersType>
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
}

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

const UsersContainer =
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, RootReduxState>(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer