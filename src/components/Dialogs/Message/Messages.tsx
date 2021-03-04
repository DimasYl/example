import s from "../Dialogs.module.css";
import React from "react";

type MesagesPropsType = {
    message: string
}

export function Messages(props: MesagesPropsType) {
    return <div className={s.message}>{props.message}</div>
}
