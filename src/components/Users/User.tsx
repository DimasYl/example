import {UsersType} from "../../redux/users-reducer";
import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/users2.png";
import s from "./User.module.css";

type UserPropsType = {
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}
export const User: React.FC<UserPropsType> = ({users, followingInProgress, follow, unfollow}) => {
    return <div>
        {users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}><img alt={''}
                                                          src={u.photos.small != null ? u.photos.small : userPhoto}
                                                          className={s.photo}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed ? <button style={{marginLeft: 20}} disabled={followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              unfollow(u.id)
                                          }}>UnFollow</button>
                        : <button style={{marginLeft: 20}} disabled={followingInProgress.some(id => id === u.id)}
                                  onClick={() => {
                                      follow(u.id)
                                  }}>Follow</button>}
                </div>
            </span>
            <span>
                <div style={{color: '#e6dede', paddingLeft: 20}}>{u.name}</div>
                <div  style={{color: '#e6dede'}}>{u.status}</div>
            </span>

        </div>)}
    </div>
}