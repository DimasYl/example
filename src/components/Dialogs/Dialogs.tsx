import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Messages} from "./Message/Messages";
import {DialogsPageType} from "../../redux/store";

type DialogsPropsType = {
    sendMessage: () => void
    state: DialogsPageType
    updateNewMessageBodyCreator: (body: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let state = props.state
    let dialogsElement = state.dialogs.map(d => <DialogItems name={d.name} id={d.id}/>)
    let messagesElement = state.messages.map(m => <Messages message={m.message}/>)

    let newMessageBody = state.newMessageBody
    const onSendMessageClick = () => {
        props.sendMessage()
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.updateNewMessageBodyCreator(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div><textarea value={newMessageBody} placeholder={'Enter your message'} onChange={onNewMessageChange}/>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs