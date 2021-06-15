import React from "react";
import {reduxForm} from "redux-form";

export const ProfileDataForm = (props: any ) => {
    return(
    <form onSubmit={props.handleSubmit}>
        {/*<div><button onClick={()=>{}}>save</button></div>*/}

        <div><b>Full Name</b>:
            {/*<Field component={Input} validate={[]} name={'fullName'} placeholder={'Full name'}/>*/}
        </div>
        <div><b>Looking for a job - {props.profile.lookingForAJob ? 'yes' : 'no'}</b></div>
        <div><b>My professional skills</b> - {props.profile.lookingForAJobDescription}</div>
        {/*<div><b> Contacts: {Object.keys(props.profile.contacts).map(key => { // @ts-ignore*/}
        {/*    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>*/}
        {/*})}</b></div>*/}
    </form>
    )
}

// @ts-ignore
const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm