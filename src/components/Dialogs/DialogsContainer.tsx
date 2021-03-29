import React from 'react'
import {
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/store";

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBodyCreator: (body: string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
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
    = connect<MapStateToPropsType,MapDispatchToPropsType,{},RootReduxState>(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
