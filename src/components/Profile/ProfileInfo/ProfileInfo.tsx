import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";

const ProfileInfo = (props: ProfilePropsType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                    alt={'photo'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img alt={''} src={props.profile.photos.large}/>
                <h3>{props.profile.fullName}</h3>
                <div><b>Поиск работы - </b>{props.profile.lookingForAJobDescription}</div>
                <div><b> Мои контакты:
                    <div>{props.profile.contacts.facebook}</div>
                    <div>{props.profile.contacts.instagram}</div>
                    <div>{props.profile.contacts.vk}</div>
                </b>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;