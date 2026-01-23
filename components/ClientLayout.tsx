"use client";
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

    if (isAuthPage) {
        return (
            <>
                {children}
                <ToastContainer position="bottom-right" theme="colored" />
            </>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
}
