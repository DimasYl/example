import React from 'react'
import {UsersType} from "../../redux/users-reducer";
import styles from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
}

function Users(props: UsersPropsType){

    let getUser = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return<div>
        <button onClick={getUser}>Get User</button>
        {props.users.map(u=><div key={u.id}>
            <span>
                <div>
                    <img alt={''} src={u.photos.small != null? u.photos.small() : userPhoto} className={styles.photo}/>
                </div>
                <div>
                    {u.followed?<button onClick={()=>{props.unfollow(u.id)}}>UnFollow</button>
                        :<button onClick={()=>{props.follow(u.id)}}>Follow</button>}
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