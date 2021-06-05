import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {ProfilePageType} from "../../../redux/profile-reducer";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type MyPostsType = {
    profilePage: ProfilePageType
    addPost: (newPostBody: string) => void
}


export const MyPosts = React.memo((props: MyPostsType) => {
    console.log('MyPosts RENDER')
    console.log(props)

    let postsElement = props.profilePage.posts.map(p => <Post message={p.message} key={p.id}
                                                              likesCount={p.likesCount}/>)

    let addPost = (values: any) => {
        // alert(values.newPostBody)
        props.addPost(values.newPostBody)
    }

    return (
        <div className={s.postsBlok}>
            <h3>My posts</h3>
            <MyPostReduxForm onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
});

let maxlength10 = maxLengthCreator(10)

export const MyPostForm = (props: any) => {

    return  <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={'newPostBody'} placeholder={'Enter text'} validate={[required, maxlength10]}/>
        <button>Add post</button>
    </form>
}

const MyPostReduxForm = reduxForm({form: 'MyPost'})(MyPostForm)