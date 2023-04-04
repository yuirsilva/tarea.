'use client'
import styles from './page.module.css'

import { signIn } from 'next-auth/react'

import Greeting from '@/components/login/Greeting'

export default function Login() {
    return (
        <main className={styles.main}>
            <div className={styles.formContainer}>
                <Greeting />

                <button className={styles.googleSign} onClick={() => signIn('google', { callbackUrl: '/inbox' })}>Sign in using Google</button>
            </div>
        </main>
    )
}
