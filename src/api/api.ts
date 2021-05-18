import axios from "axios";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "67826485-0736-4a8b-bcb2-5e0a03d704b3"
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
        console.warn('Obsolete method profileApi object')
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

export const auth = {
    me(){
        return instanse.get(
            `auth/me`
        ).then(response => {
            return response.data
        })
    }
}