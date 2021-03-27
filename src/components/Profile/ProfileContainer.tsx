import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";


type MapStateToPropsType = {
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType | null) => void
}

type ProfilePropsType = MapStateToPropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/profile/2`
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

export default connect<MapStateToPropsType, MapDispatchPropsType,{},RootReduxState>
(mapStateToProps, {setUserProfile})(ProfileContainer);