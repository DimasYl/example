import {profileAPI, usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./redux-store";

export type ActionTypes =
    AddPostActionType
    | UpdateNewPostTextActionType
    | SendMessageActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType
    | savePhotoSuccessActionType

type AddPostActionType = {
    type: 'ADD-POST'
    newPostBody: string
}

type DeletePostActionType = {
    type: 'DELETE_POST'
    id: number
}

type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string

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

type PhotosType = {
    small: string
    large: string
}
type savePhotoSuccessActionType = {
    type:  typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
}

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

export type ContactType = {
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
    photos: PhotosType
}


let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 10},
        {id: 2, message: 'It\'s my first post', likesCount: 25},
        {id: 3, message: 'Hello', likesCount: 25},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionTypes): ProfilePageType => {
    // @ts-ignore
    switch (action.type) {
        case ADD_POST : {
            let newPost: PostType = {
                id: 5, message: action.newPostBody, likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case DELETE_POST:
            return {...state, posts: [...state.posts.filter(p => p.id !== action.id)]}
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostBody: string): AddPostActionType => ({type: ADD_POST, newPostBody})
export const deletePost = (id: number): DeletePostActionType => ({type: DELETE_POST, id})
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})


export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType => (
    {type: SET_USER_PROFILE, profile})

export const setStatus = (status: string): SetStatusActionType => (
    {type: SET_STATUS, status})


type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let profileData = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(profileData))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data))
    }
}


export default profileReducer