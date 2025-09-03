import React from 'react'


export default function TaskCard({ task, onEdit, onDelete, onToggleStatus, viewMode }) {
const dateVal = task?.dueDate?.toDate ? task.dueDate.toDate() : task?.dueDate
const due = dateVal ? new Date(dateVal).toLocaleDateString() : '—'


return (
<div className={`border rounded-2xl p-4 bg-white shadow-sm ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
<div className={viewMode === 'list' ? 'flex-1 pr-4' : ''}>
<div className="flex items-center gap-2 mb-1">
<span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{task.status}</span>
<h3 className="text-lg font-semibold">{task.title}</h3>
</div>
<p className="text-gray-600 text-sm mb-2">{task.description}</p>
<p className="text-gray-500 text-xs">Due: {due}</p>
</div>
<div className="flex items-center gap-2 mt-3 md:mt-0">
<button onClick={() => onToggleStatus(task)} className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">
{task.status === 'Completed' ? 'Mark Pending' : 'Mark Done'}
</button>
<button onClick={() => onEdit(task)} className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">Edit</button>
<button onClick={() => onDelete(task)} className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
</div>
</div>
)
}