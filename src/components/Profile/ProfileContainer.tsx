import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/redux-store";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';


type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
}

type ProfilePropsType = MapStateToPropsType & MapDispatchPropsType

type PathParamsType = {
    userId: any
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {

        let userId = this.props.match.params.userId
        if(!userId){
            userId = 2
        }
       this.props.getUserProfile(userId)
    }

    render() {
        if(!this.props.isAuth) return <Redirect to='/login'/>

        return <Profile {...this.props} profile={this.props.profile}/>
    }
}



let mapStateToProps = (state: RootReduxState):MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth

    }
}

let WithUrlDataContainerComponent =  withRouter(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchPropsType,{},RootReduxState>
(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);