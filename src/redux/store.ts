import profileReducer, {ProfileType} from "./profile-reducer";
import dialogsReducer, {ActionTypes} from "./dialog-reducer";

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsType = {
    name: string
    id: number
}
export type MessageType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType | null
    status: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
}
type Sidebar = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: Sidebar
}

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void
}

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 10},
                {id: 2, message: 'It\'s my first post', likesCount: 25},
                {id: 3, message: 'Blabla', likesCount: 25},
                {id: 4, message: 'Dada', likesCount: 25}
            ],
            newPostText: 'it-kamasutra.com',
            profile: null,
            status: ''
        },
        dialogsPage: {
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
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}



export default store