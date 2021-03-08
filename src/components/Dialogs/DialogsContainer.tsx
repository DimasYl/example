import React from 'react'
import {
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/store";

type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}
type mapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBodyCreator: (body: string) => void
}
const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBodyCreator: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
}


const DialogsContainer
    = connect<mapStateToPropsType,mapDispatchToPropsType,{},RootReduxState>(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
