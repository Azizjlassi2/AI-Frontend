import React from 'react';
import { User, Bell } from 'lucide-react';
import { ClientSidebar } from './ClientSidebar';
export function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-500">
                AI<span className="text-gray-100">+</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>;
}