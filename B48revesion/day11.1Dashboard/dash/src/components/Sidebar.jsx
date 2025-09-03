import React from 'react'


export default function Sidebar({ active, setActive, onAddTask }) {
const items = [
{ key: 'all', label: 'All Tasks', icon: '📋' },
{ key: 'completed', label: 'Completed Tasks', icon: '✅' },
{ key: 'pending', label: 'Pending Tasks', icon: '⏳' },
{ key: 'profile', label: 'Profile', icon: '👤' },
]


return (
<aside className="w-full md:w-64 bg-white border-r h-full p-4 flex flex-col gap-2">
<h2 className="text-xl font-bold mb-2">Tasky</h2>
{items.map((item) => (
<button
key={item.key}
onClick={() => setActive(item.key)}
className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-gray-100 transition ${
active === item.key ? 'bg-gray-100 font-semibold' : ''
}`}
>
<span className="text-lg">{item.icon}</span>
<span>{item.label}</span>
</button>
))}
<div className="mt-auto">
<button
onClick={onAddTask}
className="w-full py-2 rounded-xl bg-black text-white hover:opacity-90"
>
+ Add Task
</button>
</div>
</aside>
)
}