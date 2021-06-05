import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootReduxState} from "../../redux/redux-store";

 const Login = (props:any) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


export const LoginForm = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input} validate={[required]} name={'email'} placeholder={'Email'}/>
        </div>
        <div>
            <Field component={Input} validate={[required]} name={'password'} placeholder={'Password'} type={'password'}/>
        </div>
        <div>
            <Field component={Input}  name={'rememberMe'} type={"checkbox"}/> remember me
        </div>
        <div>
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
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

const mapStateToProps = (state: RootReduxState): MapStateToPropsType => ({
     isAuth: state.auth.isAuth
})

export default connect<MapStateToPropsType,MapDispatchToPropsType,{},RootReduxState>(mapStateToProps,{login})(Login)