import React from 'react'
import {UsersType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import {User} from "./User";
import s from './Users.module.css'

type UsersPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
    followSuccess: (userId: number) => void
    unfollowSuccess: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={s.usersContainer}>
        <Paginator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                    totalItemsCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   portionSize = {10}
        />
        <div>
        <User users={props.users} follow={props.follow} followingInProgress={props.followingInProgress} unfollow={props.unfollow}/>
        </div>
    </div>
}


export default Users