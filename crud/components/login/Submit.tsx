import styles from './Submit.module.css'

export default function Submit({ text }: { text: string }) {
    return <button type="submit" className={styles.submitButton}>{text}</button>
}
