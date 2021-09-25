import React from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Messages} from "./Message/Messages";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


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

let maxlength10 = maxLengthCreator(20)

export const DialogsForm = (props: any) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
        <Field component={Textarea} validate={[required, maxlength10]} name={'newMessageBody'} placeholder={'Your message'}/>
        <button>Send</button>
        </div>
        </form>
}

const DialogsReduxForm = reduxForm({form: 'Dialogs'})(DialogsForm)

export default Dialogs