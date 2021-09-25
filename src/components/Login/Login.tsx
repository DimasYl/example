import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootReduxState} from "../../redux/redux-store";
import s from './Login.module.css'




const Login = (props: any) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return <div className={s.loginContainer}>
        <h1 style={{color: '#e6dede'}}>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}
                        // captchaUrl={props.captchaUrl}
        />
    </div>
}



export const LoginForm = (props: any) => {

    return <form onSubmit={props.handleSubmit}>

        {/*{createField('Email', 'email', [required], Input)}*/}

        <Field component={Input} validate={[required]} name={'email'} placeholder={'Email'}/>

        {/*{createField('Password', 'password', [required], Input)}*/}
        <Field component={Input} validate={[required]} name={'password'} placeholder={'Password'} type={'password'}/>

        <div>
            <Field component={Input} name={'rememberMe'} type={"checkbox"}/> remember me
        </div>
        <div>
            {props.captchaUrl && <img alt={''} src={props.captchaUrl}/>}
            <div>
                {props.error}
            </div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm)

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const mapStateToProps = (state: RootReduxState): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootReduxState>(mapStateToProps, {login})(Login)