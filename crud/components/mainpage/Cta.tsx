import styles from './Cta.module.css'
import Link from 'next/link'

export default function Cta({ text, addClass }: { text: string, addClass?: string }) {
    return <Link className={`${styles.cta} ${addClass ? styles[addClass] : null}`} href='/login'>{text}</Link>
}
