import React from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <Link
                  href="/admin/dashboard"
                  className="block p-3 rounded hover:bg-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/admin/questions"
                  className="block p-3 rounded hover:bg-gray-700 transition-colors"
                >
                  Questions
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/admin/users"
                  className="block p-3 rounded bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Users
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/admin/results"
                  className="block p-3 rounded hover:bg-gray-700 transition-colors"
                >
                  Results
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Logout button or link */}
        <div className="mt-auto">
          <Link
            href="/admin/logout"
            className="block p-3 rounded hover:bg-gray-700 transition-colors text-red-400"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
