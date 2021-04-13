import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {RootReduxState} from "../../redux/redux-store";
import {authAPI} from "../../api/api";

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType>{

    componentDidMount(){
        authAPI.authorized().then((data) => {
        if(data.resultCode === 0){
            let {id,login,email} = data.data
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