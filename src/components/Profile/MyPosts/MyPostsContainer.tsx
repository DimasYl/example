import React from 'react';
import {addPostActionCreator, ProfilePageType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootReduxState} from "../../../redux/redux-store";

type mapStateToPropsType = {
    profilePage: ProfilePageType
}

type mapDispatchToPropsType = {
    addPost: (newPostBody: string) => void

}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        addPost: (newPostBody: string) => {
            dispatch(addPostActionCreator(newPostBody))
        }
    }
}

export const MyPostsContainer =
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, RootReduxState>(mapStateToProps, mapDispatchToProps)(MyPosts)
