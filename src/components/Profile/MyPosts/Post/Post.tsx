import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likesCount: number
}

const Post = (props: PostPropsType) => {

    return (
        <div className={s.dialog}>
            <img src='https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg'  alt={''}/>
            { props.message }
            <div>
                <span>like</span> { props.likesCount }
            </div>
        </div>
    )
}

export default Post;