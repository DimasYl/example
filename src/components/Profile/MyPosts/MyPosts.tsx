import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ActionTypes, addPostActionCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import {PostType} from "../../../redux/store";


type MyPostsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}


export const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)


    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTextCreator(e))

    }

    return (
        <div className={s.postsBlok}>
            <h3>My posts</h3>
            <div>
                <textarea onChange={onPostChange} value={props.newPostText}>AddPost </textarea>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

