import React from 'react'


export default function Header({ user, onToggleView, viewMode, onNewTask }) {
return (
<header className="w-full bg-white border-b p-4 sticky top-0 z-10">
<div className="max-w-7xl mx-auto flex items-center justify-between">
<div className="flex items-center gap-3">
<h1 className="text-2xl font-bold">Dashboard</h1>
<button
onClick={onToggleView}
className="ml-3 px-3 py-1.5 rounded-xl border hover:bg-gray-50"
>
{viewMode === 'grid' ? '🔲 Grid' : '📄 List'}
</button>
<button
onClick={onNewTask}
className="ml-2 px-3 py-1.5 rounded-xl bg-black text-white hover:opacity-90"
>
+ New Task
</button>
</div>
<div className="flex items-center gap-3">
{user?.photoURL ? (
<img src={user.photoURL} className="w-9 h-9 rounded-full object-cover" />
) : (
<div className="w-9 h-9 rounded-full bg-gray-200 grid place-items-center">👤</div>
)}
<div className="text-sm">
<div className="font-semibold leading-4">{user?.name || 'Guest'}</div>
<div className="text-gray-500 text-xs">Welcome back 👋</div>
</div>
</div>
</div>
</header>
)
}