import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {RootReduxState} from "../../redux/redux-store";

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType>{

    componentDidMount(){
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials: true
            }
        ).then(response => {
        if(response.data.resultCode === 0){
            let {id,login,email} = response.data.data
            this.props.setAuthUserData(id,email,login)
        }
        })
    }
    render() {
        return <Header {...this.props}/>
    }
}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    setAuthUserData: (userId: string
        | null,email: string | null,login: string | null)=>void
}
let mapStateToProps = (state:RootReduxState): MapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}


export default connect <MapStateToPropsType,MapDispatchToPropsType,{},RootReduxState>
(mapStateToProps,{setAuthUserData})(HeaderContainer);