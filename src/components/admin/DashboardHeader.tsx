import React from 'react'
import { SearchIcon, BellIcon, UserIcon } from 'lucide-react'
export function DashboardHeader() {
    return (
        <header className="bg-gray-800 border-b border-gray-700">
            <div className="h-16 px-8 flex items-center justify-between">
                <div className="flex items-center flex-1">
                    <span className="text-xl font-bold text-blue-500">AI+</span>
                    <span className="text-xl font-bold text-white ml-1">Admin</span>
                    <div className="ml-8 flex-1 max-w-2xl">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-white">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                        <UserIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    )
}
