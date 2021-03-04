import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfilePageType} from "../../redux/store";
import {ActionTypes} from "../../redux/dialog-reducer";

type ProfileCompPageType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionTypes) => void
}

const Profile: React.FC<ProfileCompPageType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
                />
        </div>
    )
}

export default Profile;