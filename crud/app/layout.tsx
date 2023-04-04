import './globals.css'

import QueryClientWrapper from '@/components/mainpage/QueryClient'
import Session from '@/components/mainpage/Session'
import { Inter } from 'next/font/google'

export const metadata = {
    title: 'Tarea.',
    description: 'Task app created with Next.js 13',
}


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <Session>
                    <QueryClientWrapper>
                        {children}
                    </QueryClientWrapper>
                </Session>
            </body>
        </html>
    )
}
