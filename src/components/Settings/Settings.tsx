import React from 'react'
import style from './Settings.module.css'

export const Settings = () => {

    return (
        <div className={style.settings}>
            <h3>Цветовая гамма</h3>
            <button>Light theme</button>
            <button style={{background: 'black', color: 'white'}}>Dark theme</button>
        </div>
    )
}

