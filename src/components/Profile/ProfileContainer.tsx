import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';


type MapStateToPropsType = {
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType | null) => void
}

type ProfilePropsType = MapStateToPropsType & MapDispatchPropsType

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if(!userId){
            userId = '2'
        }
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/profile/` + userId
        ).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}



let mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent =  withRouter(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchPropsType,{},RootReduxState>
(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);