import axios from "axios";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "9796e0df-7156-4180-913f-3e6c30a4c76a"
    }
})

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 5){
        return instanse.get(
            `/users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return response.data
        })
    },
    followed(id: number){
        return instanse.post(
            `/follow/${id}`, {}
        ).then(response => {
            return response.data
        })
    },
    unfollowed(id: number){
        return instanse.delete(
            `/follow/${id}`).then(response => {
            return response.data
        })
    },
    getProfile(userId: number){
        console.warn('Obsolete method. Please profileApi object')
       return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number){
        return instanse.get(`/profile/` + userId)
    },
    getStatus(userId: number) {
        return instanse.get(`/profile/status/` + userId )
    },
    updateStatus(status: string) {
        return instanse.put(`/profile/status`,{status: status})
    }
}

export const authAPI = {
    me(){
        return instanse.get(`/auth/me`).then(response => {
            return response.data
        })
    },
   login(email: string,password: string,rememberMe: boolean = false) {
        return instanse.post(`/auth/login`, {email, password, rememberMe})
   },
   logout() {
    return instanse.delete(`/auth/login`)
    }
}
