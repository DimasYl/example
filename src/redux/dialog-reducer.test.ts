import dialogsReducer, {DialogsPageType, sendMessageCreator} from "./dialog-reducer";

let state: DialogsPageType =  {
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
it('send message ', ()=> {
    let action = sendMessageCreator('Samurai')

    let newState = dialogsReducer(state,action)

    expect(newState.messages.length).toBe(6)
    expect(newState.messages[5].message).toBe('Samurai')
})


