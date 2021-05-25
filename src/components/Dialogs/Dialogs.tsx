import React from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Messages} from "./Message/Messages";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, reduxForm} from "redux-form";


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let dialogsPage = props.dialogsPage
    let dialogsElement = dialogsPage.dialogs.map(d => <DialogItems name={d.name} key={d.id} id={d.id}/>)
    let messagesElement = dialogsPage.messages.map(m => <Messages message={m.message} key={m.id}/>)



    let addMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <DialogsReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}

export const DialogsForm = (props: any) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
        <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
        <button>Send</button>
        </div>
        </form>
}

const DialogsReduxForm = reduxForm({form: 'Dialogs'})(DialogsForm)

export default Dialogs