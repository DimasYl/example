import React from 'react';
import {addPostActionCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";


export const MyPostsContainer = () => {


    return (
        <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState().profilePage

                    const addPost = () => {
                        store.dispatch(addPostActionCreator())
                    }
                    const onPostChange = (body: string) => {
                        store.dispatch(updateNewPostTextCreator(body))

                    }
                    return (
                        <MyPosts state={state} addPost={addPost} postChange={onPostChange}/>
                    )
                }
            }
        </StoreContext.Consumer>
    )
}

