import React from 'react'
import {
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/dialog-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {


    return (
        <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState().dialogsPage

                    const onSendMessageClick = () => {
                        store.dispatch(sendMessageCreator())
                    }
                    const onNewMessageChange = (body: string) => {

                        store.dispatch(updateNewMessageBodyCreator(body))
                    }
                    return (
                        <Dialogs sendMessage={onSendMessageClick} state={state}
                                 updateNewMessageBodyCreator={onNewMessageChange}/>
                    )
                }
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer