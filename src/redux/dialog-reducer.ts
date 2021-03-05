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

let initialState =  {
    dialogs: [
        {name: 'Dimych', id: 1},
        {name: 'Andrey', id: 2},
        {name: 'Sveta', id: 3},
        {name: 'Sasha', id: 4},
        {name: 'Victor', id: 5},
        {name: 'Valera', id: 6}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is yuor it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionTypes) => {
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