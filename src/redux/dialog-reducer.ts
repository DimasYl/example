export type ActionTypes = SendMessageActionType

type SendMessageActionType = {
    type: 'SEND_MESSAGE'
    newMessageBody: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
}
export type DialogsType = {
    name: string
    id: number
}
export type MessageType = {
    id: number
    message: string
}

const SEND_MESSAGE = "SEND_MESSAGE"

let initialState: DialogsPageType = {
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
    ]
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionTypes) => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}]
            }

        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody: string): SendMessageActionType => ({
    type: SEND_MESSAGE,
    newMessageBody
})


export default dialogsReducer