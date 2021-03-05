import React from 'react';
import { addPostActionCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import {ReduxStoreType} from "../../../redux/redux-store";
import {MyPosts} from "./MyPosts";


type MyPostsType = {
    store: ReduxStoreType
}


export const MyPostsContainer: React.FC<MyPostsType> = (props) => {
    let state = props.store.getState().profilePage

    const addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }
    const onPostChange = (body: string) => {
        props.store.dispatch(updateNewPostTextCreator(body))

    }

    return <MyPosts state={state} addPost={addPost} postChange={onPostChange}/>
}

