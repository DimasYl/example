import preloader from "../../../assets/images/preloader.gif";
import React from "react";

export const Preloader = () => {
    return (
        <img alt={''} style={{width: '150px', height: '70px'}} src={preloader}/>
    )
}