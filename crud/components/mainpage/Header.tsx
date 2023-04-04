import styles from './Header.module.css'

import Link from "next/link"

export default function Header({fixed, children}: {fixed?: string, children: React.ReactNode}) {
    return (
        <header className={`${styles.header} ${fixed ? styles[fixed] : null}`}>
            <Link className={styles.logo} href="#">Tarea.</Link>
            <nav>
                {children}
            </nav>
        </header>
    )
}
