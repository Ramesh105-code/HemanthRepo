import React from 'react'
import TaskCard from './TaskCard'


export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus, viewMode }) {
if (!tasks?.length) {
return <div className="text-center text-gray-500 py-10">No tasks found. Add one! 🎯</div>
}


if (viewMode === 'list') {
return (
<div className="space-y-3">
{tasks.map((t) => (
<TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} viewMode="list" />
))}
</div>
)
}


return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{tasks.map((t) => (
<TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} viewMode="grid" />
))}
</div>
)
}