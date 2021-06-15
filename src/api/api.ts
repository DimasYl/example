import axios from "axios";
import {ProfileType} from "../redux/profile-reducer";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "9796e0df-7156-4180-913f-3e6c30a4c76a"
    }
})

type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}



type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type FollowedResponseType = {
    resultCode: ResultCodeEnum
    messages: string
    data: {

    }
}
export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 5){
        return instanse.get<GetUsersResponseType>(
            `/users?page=${currentPage}&count=${pageSize}`
        ).then(res => res.data)
    },
    followed(id: number){
        return instanse.post<FollowedResponseType>(
            `/follow/${id}`, {}
        ).then(response => {
            return response.data
        })
    },
    unfollowed(id: number){
        return instanse.delete<FollowedResponseType>(
            `/follow/${id}`).then(response => {
            return response.data
        })
    },
    getProfile(userId: number){
        console.warn('Obsolete method. Please profileApi object')
       return profileAPI.getProfile(userId)
    }
}

type GetProfileResponseType = ProfileType

export const profileAPI = {
    getProfile(userId: number){
        return instanse.get<GetProfileResponseType>(`/profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instanse.get(`/profile/status/` + userId )
    },
    updateStatus(status: string) {
        return instanse.put<FollowedResponseType>(`/profile/status`,{status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instanse.put(`/profile/photo`, formData,{
            headers: {
                'Content- Type' : 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instanse.put('/profile', profile)
    }
}

export enum ResultCodeEnum {
    Success,
    Error,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired= 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}

type LogoutResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export const authAPI = {
    me(){
        return instanse.get<MeResponseType>(`/auth/me`).then(res => res.data)
    },
   login(email: string,password: string,rememberMe: boolean = false, captcha: null | string = null) {
        return instanse.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(res=>res.data)
   },
   logout() {
    return instanse.delete<LogoutResponseType>(`/auth/login`).then(res => res.data)
    }
}

type GetCaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instanse.get<GetCaptchaResponseType>(`/security/get-captcha-url`).then(res=> res.data)
    }
}
