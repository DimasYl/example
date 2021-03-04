import {PostType, ProfilePageType} from "./store";
import {ChangeEvent} from "react";

export type ActionTypes = AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType

type AddPostActionType = {
    type: 'ADD-POST'
}

type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string

}

type UpdateNewMessageBodyActionType = {
    type: "UPDATE_NEW_MESSAGE_BODY"
    body: string
}

type SendMessageActionType = {
    type: 'SEND_MESSAGE'
}



const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT =  "UPDATE-NEW-POST-TEXT"

const profileReducer = (state: ProfilePageType, action: ActionTypes) => {
    switch (action.type){
        case ADD_POST :
            let newPost: PostType = {
                id: 5, message: state.newPostText, likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state

    }
}

export const addPostActionCreator = (): ActionTypes => ({type: ADD_POST})//ТАКОЙ СИНТАКСИС
export const updateNewPostTextCreator = (e: ChangeEvent<HTMLTextAreaElement>): ActionTypes => ({
    type: UPDATE_NEW_POST_TEXT, newText: e.currentTarget.value
})


export default profileReducer