import React from 'react'
import style from './Music.module.css'

export const Music = () => {
    return (
        <div className={style.music}>
            <h2>Новая музыка на - <a href='https://zaycev.net' target={'_blank'}>zaicev.net</a></h2>
        </div>
    )
}

