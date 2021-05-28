import React from 'react'
import styles from './FormsControls.module.css'

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

// @ts-ignore
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    // @ts-ignore
    return <FormControl {...props}> <textarea {...input} {...restProps} /></FormControl>
}

// @ts-ignore
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    // @ts-ignore
    return <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
}