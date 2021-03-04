import {DialogsPageType} from "./store";

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

const UPDATE_NEW_MESSAGE_BODY =  "UPDATE_NEW_MESSAGE_BODY"
const SEND_MESSAGE =  "SEND_MESSAGE"

const dialogsReducer = (state: DialogsPageType, action: ActionTypes) => {
    switch (action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
        default:
            return state
    }
 }

export const updateNewMessageBodyCreator = (body: string): ActionTypes => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body
})
export const sendMessageCreator = (): ActionTypes => ({type: SEND_MESSAGE})


export default dialogsReducer