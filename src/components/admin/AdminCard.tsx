import React from 'react'
interface AdminCardProps {
    title: string
    children: React.ReactNode
    className?: string
}
export function AdminCard({ title, children, className = '' }: AdminCardProps) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
            <h2 className="text-lg font-semibold text-gray-100 mb-4">{title}</h2>
            {children}
        </div>
    )
}
