import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type DialogsItemsPropsType = {
    name: string
    id: number
}

export function DialogItems(props: DialogsItemsPropsType) {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id} className={s.active}>{props.name}</NavLink>
        </div>
    )
}

