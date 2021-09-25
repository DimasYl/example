import React from 'react'
import style from './News.module.css'

export const News = () => {
    return (
        <div className={style.news}>
            <h2>Свежие новости - <a href={'https://news.ru'} target={'_blank'}>Здесь</a></h2>
            {/*<button>OK</button>*/}
        </div>
    )
}

