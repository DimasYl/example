import React from 'react'
import {connect} from "react-redux";
import {
    follow,
    followSuccess,
    getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow,
    unfollowSuccess,
    UsersType
} from "../../redux/users-reducer";
import {RootReduxState} from "../../redux/redux-store";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUser,
} from "../../redux/users-selector";


type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchToPropsType = {
    followSuccess: (userId: number) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
    unfollowSuccess: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        // const {currentPage, pageSize} = this.props
        // this.props.getUsers(currentPage, pageSize)
        //вот так круче по феншую что выше
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                users={this.props.users}
                followSuccess={this.props.followSuccess}
                unfollowSuccess={this.props.unfollowSuccess}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }

}


let mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: Array<UsersType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


// export default withAuthRedirect(connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootReduxState>
// (mapStateToProps, {follow, unfollow, followSuccess, unfollowSuccess,
//     setCurrentPage, toggleFollowingProgress, getUsers
//     })(UsersContainer))
//

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootReduxState>
    (mapStateToProps, {
        follow, unfollow, followSuccess, unfollowSuccess,
        setCurrentPage, toggleFollowingProgress, getUsers
    }),
    withAuthRedirect)(UsersContainer)