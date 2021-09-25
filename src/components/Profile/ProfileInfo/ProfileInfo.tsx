import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import userPhoto from '../../../assets/images/wedmak2.jpg'
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileDataForm} from "./ProfileDataForm";




const ProfileInfo = (props: ProfilePropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }


    const gotoEditMode = () => {
        setEditMode(true)
    }

    return (
        <div>

            <div className={s.descriptionBlock}>
                <img alt={''} src={props.profile.photos.large || userPhoto} className={s.photo}/>
                <div className={s.forMe}>
                    {props.isOwner}
                    {editMode ?
                        <ProfileDataForm profile={props.profile}/>
                        : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                       gotoEditMode={gotoEditMode}/>
                    }
                </div>

                {/*<div className={s.about}>*/}
                {/*<h3>About me:</h3>*/}
                {/*<div>Front-End Developer</div>*/}
                {/*</div>*/}
            </div>
            <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus} />

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
    return <div>
        {isOwner && <div>
            {/*<button onClick={gotoEditMode}>Redacting</button>*/}
        </div>}

        <h3>{profile.fullName}</h3>
        <div><b> My contacts: {Object.keys(profile.contacts).map(key => {
            // @ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}</b></div>
    </div>
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contacts}><b>{contactTitle}</b> -{contactValue}</div>
}


export default ProfileInfo;