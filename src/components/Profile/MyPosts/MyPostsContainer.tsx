import React from 'react';
import {addPostActionCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {ProfilePageType} from "../../../redux/store";
import {RootReduxState} from "../../../redux/redux-store";

type mapStateToPropsType = {
    profilePage: ProfilePageType
}

type mapDispatchToPropsType = {
    addPost: () => void
    postChange: (body: string) => void
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        postChange: (body: string) => {
            dispatch(updateNewPostTextCreator(body))
        }
    }
}

export const MyPostsContainer =
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, RootReduxState>(mapStateToProps, mapDispatchToProps)(MyPosts)
