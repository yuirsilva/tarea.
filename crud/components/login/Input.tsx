'use client'
import styles from './Input.module.css'

export default function Input({ type, placeholder, change, name, value }: { type: string, name: string, placeholder: string, change: React.ChangeEventHandler<HTMLInputElement>, value: string }) {
    return <input className={styles.input} required onChange={change} name={name} type={type} placeholder={placeholder} />
}
