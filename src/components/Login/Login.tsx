import React from 'react'
import {Field, reduxForm} from "redux-form";

export const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


export const LoginForm = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={'input'} name={'login'} placeholder={'Login'}/>
        </div>
        <div>
            <Field component={'input'} name={'password'} placeholder={'Password'}/>
        </div>
        <div>
            <Field component={'input'} name={'rememberMe'} type={"checkbox"}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm)
