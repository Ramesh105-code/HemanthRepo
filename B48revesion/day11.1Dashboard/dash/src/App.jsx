import React, { useMemo, useState } from 'react'
console.error(e)
alert('Operation failed')



const handleDelete = async (task) => {
if (!confirm('Delete this task?')) return
try {
await deleteDoc(doc(db, 'tasks', task.id))
} catch (e) {
console.error(e)
alert('Failed to delete')
}
}


const handleToggleStatus = async (task) => {
try {
const next = task.status === 'Completed' ? 'Pending' : 'Completed'
await updateDoc(doc(db, 'tasks', task.id), { status: next, updatedAt: serverTimestamp() })
} catch (e) {
console.error(e)
}
}


return (
<div className="min-h-screen bg-gray-50">
<Header user={localUser} onToggleView={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} viewMode={viewMode} onNewTask={openAddModal} />


<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-0 md:gap-6 p-4">
<Sidebar active={active} setActive={setActive} onAddTask={openAddModal} />


<main className="min-h-[60vh] p-2 md:p-0">
{active === 'profile' ? (
<ProfileForm user={localUser} setUser={setLocalUser} />
) : (
<>
{loading ? (
<div className="text-center text-gray-500 py-10">Loading tasks…</div>
) : (
<TaskList tasks={filtered} onEdit={openEditModal} onDelete={handleDelete} onToggleStatus={handleToggleStatus} viewMode={viewMode} />
)}
</>
)}
</main>
</div>


<ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddOrEdit} initial={editing} />
</div>
)
