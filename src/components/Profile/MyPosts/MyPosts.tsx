import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, Field} from "redux-form";
import {ProfilePageType} from "../../../redux/profile-reducer";


type MyPostsType = {
    profilePage: ProfilePageType
    addPost: (newPostBody: string) => void
}


export const MyPosts: React.FC<MyPostsType> = (props) => {
    let profilePage = props.profilePage
    let postsElement = profilePage.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount}/>)

    let addPost = (values: any) => {
        // alert(values.newPostBody)
        props.addPost(values.newPostBody)
    }

    return (
        <div className={s.postsBlok}>
            <h3>My posts</h3>
           <MyPostReduxForm onSubmit={addPost} />
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}


export const MyPostForm = (props: any) => {

    return  <form onSubmit={props.handleSubmit}>
        <Field component={'textarea'} name={'newPostBody'} placeholder={'Enter post'}/>
        <button>Add post</button>
    </form>
}

const MyPostReduxForm = reduxForm({form: 'MyPost'})(MyPostForm)