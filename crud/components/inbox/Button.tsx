import styles from './Button.module.css'

export default function Button({ children, type, title, btnClass, action }: { children: React.ReactNode, type: "button" | "submit", title: string, btnClass?: string, action?: React.MouseEventHandler<HTMLButtonElement> }) {
    return <button onClick={action} type={type} title={title} className={`${styles.btn} ${btnClass ? styles[btnClass] : null}`}>{children}</button>
}
