import React, { useState } from 'react'
import { db, storage } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'


export default function ProfileForm({ user, setUser }) {
const [name, setName] = useState(user?.name || '')
const [file, setFile] = useState(null)
const [saving, setSaving] = useState(false)


const onSubmit = async (e) => {
e.preventDefault()
setSaving(true)
try {
let photoURL = user?.photoURL || ''
if (file) {
const ref = storageRef(storage, `avatars/defaultUser/${Date.now()}-${file.name}`)
await uploadBytes(ref, file)
photoURL = await getDownloadURL(ref)
}
const payload = { name: name.trim() || 'Guest', photoURL }
await setDoc(doc(db, 'users', 'defaultUser'), payload, { merge: true })
setUser(payload)
alert('Profile updated ')
} catch (e) {
console.error(e)
alert('Failed to update profile')
} finally {
setSaving(false)
}
}


return (
<div className="max-w-xl">
<h2 className="text-xl font-semibold mb-4">Profile</h2>
<form onSubmit={onSubmit} className="space-y-4">
<div>
<label className="block text-sm font-medium mb-1">Name</label>
<input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
</div>
<div>
<label className="block text-sm font-medium mb-1">Profile Picture</label>
<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} />
</div>
<button disabled={saving} className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60">{saving ? 'Saving…' : 'Save Profile'}</button>
</form>
</div>
)
}