import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'i18n Editor',
    description: 'App used to generate i18n files',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <main className={'flex h-screen w-screen justify-center'}>
            {children}
            <Toaster />
        </main>
        </body>
        </html>
    )
}
