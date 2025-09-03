import React, { useEffect, useState } from 'react'


const handleSubmit = (e) => {
e.preventDefault()
onSubmit({
title: title.trim(),
description: description.trim(),
status,
dueDate: dueDate ? new Date(dueDate) : null,
})
}


return (
<div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
<div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
<div className="flex items-center justify-between p-4 border-b">
<h3 className="text-lg font-semibold">{initial ? 'Edit Task' : 'Add Task'}</h3>
<button onClick={onClose} className="text-gray-500">✖</button>
</div>
<form onSubmit={handleSubmit} className="p-4 space-y-4">
<div>
<label className="block text-sm font-medium mb-1">Title</label>
<input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-xl px-3 py-2" required />
</div>
<div>
<label className="block text-sm font-medium mb-1">Description</label>
<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-xl px-3 py-2 min-h-[90px]" />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<div>
<label className="block text-sm font-medium mb-1">Status</label>
<select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded-xl px-3 py-2">
<option>Pending</option>
<option>Completed</option>
</select>
</div>
<div>
<label className="block text-sm font-medium mb-1">Due Date</label>
<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
</div>
</div>
<div className="flex justify-end gap-2">
<button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl border">Cancel</button>
<button type="submit" className="px-3 py-1.5 rounded-xl bg-black text-white">{initial ? 'Save Changes' : 'Add Task'}</button>
</div>
</form>
</div>
</div>
)
