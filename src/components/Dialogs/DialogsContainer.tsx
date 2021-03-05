import React from 'react'
import {
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/dialog-reducer";
import {ReduxStoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";

type DialogsPropsType = {
    store: ReduxStoreType
}

const DialogsContainer: React.FC<DialogsPropsType> = (props) => {
    let state = props.store.getState().dialogsPage

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (body: string) => {

        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <Dialogs sendMessage={onSendMessageClick} state={state} updateNewMessageBodyCreator={onNewMessageChange}/>
    )
}

export default DialogsContainer