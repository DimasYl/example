import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ProfilePageType} from "../../../redux/store";


type MyPostsType = {
    profilePage: ProfilePageType
    addPost: () => void
    postChange: (body: string) => void
}


export const MyPosts: React.FC<MyPostsType> = (props) => {
    let profilePage = props.profilePage
    let newPost = profilePage.newPostText
    let postsElement = profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)


    const addPost = () => {
        props.addPost()
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.postChange(body)

    }

    return (
        <div className={s.postsBlok}>
            <h3>My posts</h3>
            <div>
                <textarea onChange={onPostChange} value={newPost}>AddPost </textarea>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

