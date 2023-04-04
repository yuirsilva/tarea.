'use client'
import styles from './page.module.css'

import { Canvas } from '@react-three/fiber'

import Header from '@/components/mainpage/Header'
import Cta from '@/components/mainpage/Cta'
import Experience from './Experience'

export default function Home() {
    return <>
        <Header fixed='fixed'>
            <Cta text='Sign in' />
        </Header>
        <main className={styles.main}>
            <div className={styles.lowerDiv}>
                <h1>Your main task.</h1>
                <Cta text='Try it out -&gt;' addClass='lowerCta' />
            </div>

            <div className={styles.canvasWrap}>
                <Canvas
                    camera={{
                        fov: 20
                    }}
                >
                    <Experience />
                </Canvas>
            </div>
        </main>
    </>
}
