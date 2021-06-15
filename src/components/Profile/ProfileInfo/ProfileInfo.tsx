import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import userPhoto from '../../../assets/images/user.jpg'
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileDataForm} from "./ProfileDataForm";


const ProfileInfo = (props: ProfilePropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const gotoEditMode = () => {
        setEditMode(true)
    }

    return (
        <div>
            {/*<div >*/}
            {/*    <img className={s.image}*/}
            {/*        src='https://i.pinimg.com/originals/5a/df/1b/5adf1b97742a65d0a3c98299c545570b.jpg'*/}
            {/*        alt={'photo'}/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img alt={''} src={props.profile.photos.large || userPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode ?
                    <ProfileDataForm profile={props.profile}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                   gotoEditMode={gotoEditMode}/>
                }
            </div>
            <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

export type ProfileDataPropsType = {
    profile: ProfileType
    isOwner?: boolean
    gotoEditMode?: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, gotoEditMode}) => {
    return  <div>
        {isOwner && <div><button onClick={gotoEditMode}>Redacting</button></div>}

        <h3>Full Name - {profile.fullName}</h3>
        <div><b>Looking for a job - {profile.lookingForAJob ? 'yes' : 'no'}</b></div>
        <div><b>My professional skills</b> - {profile.lookingForAJobDescription}</div>
        <div><b> Contacts: {Object.keys(profile.contacts).map(key => {
            // @ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}</b></div>
    </div>
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div  className={s.contacts}><b>{contactTitle}</b> : {contactValue}</div>
}


export default ProfileInfo;