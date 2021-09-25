import React from 'react'
import styles from './FormsControls.module.css'
import {Field} from "redux-form";

// @ts-ignore
export const FormControl = ({input, meta, child, ...props}) => {

    const hasError = meta.touched && meta.error

    return <div className={styles.formControl + ' ' + (hasError? styles.error : '')}>
        <div>
            {props.children}
        </div>
        <div>
            {hasError && <span>{meta.error} </span>}
        </div>
    </div>
}


export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps} /></FormControl>
}


export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props

    return <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
}
export const createField = (placeholder: string, name: string, validators: any, component: any, props = {}, text = '') => {
    <div>
        <Field placeholder={placeholder}
        name={name} validate={validators}
               component={component}
            {...props}
        />{text}
    </div>
}