import React from 'react'
import {UsersType} from "../../redux/users-reducer";
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom';
import axios from "axios";

type UsersPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ''}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}><img alt={''}
                                                          src={u.photos.small != null ? u.photos.small() : userPhoto}
                                                          className={styles.photo}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed ? <button onClick={() => {
                        axios.delete(
                            `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,  {
                                withCredentials: true,
                                headers: {
                                    "API-KEY": "67826485-0736-4a8b-bcb2-5e0a03d704b3"
                                }
                            }
                        ).then(response => {
                            if (response.data.resultCode === 0) {
                                props.unfollow(u.id)
                            }
                        })

                        }}>UnFollow</button>

                        : <button onClick={() => {
                            axios.post(
                                `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},{
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "67826485-0736-4a8b-bcb2-5e0a03d704b3"
                                    }
                                }
                            ).then(response => {
                                if (response.data.resultCode === 0) {
                                    props.follow(u.id)
                                }
                            })

                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
            </span>
            <span>
                <div>{'u.location.country'}</div>
                <div>{'u.location.city'}</div>
            </span>
        </div>)}
    </div>
}


export default Users