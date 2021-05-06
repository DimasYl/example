import React from 'react';

type ProfileStatusPropsType = {
    status : string
}

const ProfileStatus = (props: ProfileStatusPropsType) => {
    return (
        <div>
            <div>
                <span>{props.status}</span>
            </div>
            <div>
                <input value={props.status} />
            </div>
        </div>
    )
}

export default ProfileStatus;