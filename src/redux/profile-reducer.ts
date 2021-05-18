import {PostType} from "./store";
import {profileAPI, usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./redux-store";

export type ActionTypes =
    AddPostActionType
    | UpdateNewPostTextActionType
    | UpdateNewMessageBodyActionType
    | SendMessageActionType
    | SetUserProfileActionType
    | SetStatusActionType

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

type SetUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: ProfileType | null
}
type SetStatusActionType = {
    type: "SET_STATUS"
    status: string
}

type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType | null
    status: string
}

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"


type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: {
        small: string
        large: string
    }
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 10},
        {id: 2, message: 'It\'s my first post', likesCount: 25},
        {id: 3, message: 'Blabla', likesCount: 25},
        {id: 4, message: 'Dada', likesCount: 25}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST : {
            let newPost: PostType = {
                id: 5, message: state.newPostText, likesCount: 0
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: state.status
            }
        default:
            return state
    }
}

export const addPostActionCreator = (): AddPostActionType => ({type: ADD_POST})

export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType => (
    {type: SET_USER_PROFILE, profile})

export const setStatus = (status: string): SetStatusActionType => (
    {type: SET_STATUS, status})

export const updateNewPostTextCreator = (body: string): UpdateNewPostTextActionType => ({
    type: UPDATE_NEW_POST_TEXT, newText: body
})

type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionTypes>

export const getUserProfile = (userId: number): ThunkType => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getStatus = (userId: number): ThunkType => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}

export const updateStatus = (status: string): ThunkType => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(response.data))
            }
        })
}

export default profileReducer