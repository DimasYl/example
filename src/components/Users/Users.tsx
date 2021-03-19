import React from 'react'
import {UsersType} from "../../redux/users-reducer";
import styles from './Users.module.css'

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
}

function Users(props: UsersPropsType){

    if(props.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    followed: true,
                    fullName: 'Dmitry',
                    fotoUrl: 'https://tatufoto.com/wp-content/uploads/2018/05/%D1%84%D0%BE%D1%82%D0%BE-%D0%A2%D0%B0%D1%82%D1%83-%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D1%8F-%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2%D0%B0-%D0%BE%D1%82-07.05.2018-%E2%84%96033-Dmitry-Nagiyevs-tattoo-tatufoto.com_.jpg',
                    status: 'I am a boss',
                    location: {city: 'Minsk', country: 'Belarus'}
                },
                {
                    id: 2,
                    followed: false,
                    fullName: 'Dimas',
                    fotoUrl: 'https://tatufoto.com/wp-content/uploads/2018/05/%D1%84%D0%BE%D1%82%D0%BE-%D0%A2%D0%B0%D1%82%D1%83-%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D1%8F-%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2%D0%B0-%D0%BE%D1%82-07.05.2018-%E2%84%96033-Dmitry-Nagiyevs-tattoo-tatufoto.com_.jpg',
                    status: 'I am a boss',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    followed: true,
                    fullName: 'Andrew',
                    fotoUrl: 'https://tatufoto.com/wp-content/uploads/2018/05/%D1%84%D0%BE%D1%82%D0%BE-%D0%A2%D0%B0%D1%82%D1%83-%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D1%8F-%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2%D0%B0-%D0%BE%D1%82-07.05.2018-%E2%84%96033-Dmitry-Nagiyevs-tattoo-tatufoto.com_.jpg',
                    status: 'I am a boss',
                    location: {city: 'Kiev', country: 'Ukraine'}
                }
            ]
        )
    }

    debugger
    return<div>
        {props.users.map(u=><div key={u.id}>
            <span>
                <div>
                    <img alt={''} src={u.fotoUrl} className={styles.photo}/>
                </div>
                <div>
                    {u.followed?<button onClick={()=>{props.unfollow(u.id)}}>UnFollow</button>
                        :<button onClick={()=>{props.follow(u.id)}}>Follow</button>}
                </div>
            </span>
            <span>
                <div>{u.fullName}</div>
                <div>{u.status}</div>
            </span>
            <span>
                <div>{u.location.country}</div>
                <div>{u.location.city}</div>
            </span>
        </div>)}
    </div>
}

export default Users