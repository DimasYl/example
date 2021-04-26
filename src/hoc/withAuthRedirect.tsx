import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {RootReduxState} from "../redux/redux-store";


type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: RootReduxState):MapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component<MapStateToPropsForRedirectType, any>{
        render() {
            if(!this.props.isAuth) return  <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }

    return connect<MapStateToPropsForRedirectType,{},{},RootReduxState>(mapStateToPropsForRedirect)(RedirectComponent)
}

