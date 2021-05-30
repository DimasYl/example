import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {RootReduxState} from "../../redux/redux-store";

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType>{


    render() {
        return <Header {...this.props}/>
    }
}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logout: () => void
}
let mapStateToProps = (state:RootReduxState): MapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}


export default connect <MapStateToPropsType,MapDispatchToPropsType,{},RootReduxState>
(mapStateToProps,{logout})(HeaderContainer);