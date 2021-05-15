import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'


const ProfileInfo = (props: ProfilePropsType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div >*/}
            {/*    <img className={s.image}*/}
            {/*        src='https://i.pinimg.com/originals/5a/df/1b/5adf1b97742a65d0a3c98299c545570b.jpg'*/}
            {/*        alt={'photo'}/>*/}
            {/*</div>*/}
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
            <ProfileStatus status={'Hello my friends'}/>
        </div>
    )
}

export default ProfileInfo;