import {UsersType} from "../../redux/users-reducer";
import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import styles from "./Users.module.css";

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
                                                          src={u.photos.small != null ? u.photos.small() : userPhoto}
                                                          className={styles.photo}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed ? <button disabled={followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              unfollow(u.id)
                                          }}>UnFollow</button>
                        : <button disabled={followingInProgress.some(id => id === u.id)}
                                  onClick={() => {
                                      follow(u.id)
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