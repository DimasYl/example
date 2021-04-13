import axios from "axios";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "67826485-0736-4a8b-bcb2-5e0a03d704b3"
    }
})

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 5){
        return instanse.get(
            `users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return response.data
        })
    }
}
export const authAPI = {
    authorized(){
        return instanse.get(
            `auth/me`
        ).then(response => {
            return response.data
        })
    }
}

export const followAPI = {
    followed(id: number){
        return instanse.post(
            `follow/${id}`, {}
        ).then(response => {
            return response.data
        })
    },
    unfollowed(id: number){
        return instanse.delete(
            `follow/${id}`).then(response => {
            return response.data
        })
    }
}
