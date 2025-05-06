import React, { useState, useEffect } from 'react';
import axios from 'axios';

const firebaseURL = "https://your-firebase-db.firebaseio.com/users.json"; // Replace with your Firebase URL

const UserManagementSystem = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState({ id: '', name: '', email: '' });
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from Firebase
  const fetchUsers = async () => {
    try {
      const response = await axios.get(firebaseURL);
      const fetchedUsers = Object.keys(response.data || {}).map((key) => ({
        id: key,
        ...response.data[key],
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      setError('Error fetching users: ' + error.message);
    }
  };

  // Add a new user to Firebase
  const addUser = async (e) => {
    e.preventDefault();
    if (!validateForm(newUser)) return;

    try {
      const response = await axios.post(firebaseURL, newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      setError('Error adding user: ' + error.message);
    }
  };

  // Edit an existing user
  const editUserData = async (e) => {
    e.preventDefault();
    if (!validateForm(editUser)) return;

    try {
      await axios.patch(`https://your-firebase-db.firebaseio.com/users/${editUser.id}.json`, {
        name: editUser.name,
        email: editUser.email,
      });
      setEditUser({ id: '', name: '', email: '' });
      fetchUsers();
    } catch (error) {
      setError('Error editing user: ' + error.message);
    }
  };

  // Delete a user from Firebase
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://your-firebase-db.firebaseio.com/users/${id}.json`);
      fetchUsers();
    } catch (error) {
      setError('Error deleting user: ' + error.message);
    }
  };

  // Validate form fields
  const validateForm = (user) => {
    if (!user.name || !user.email) {
      setError('Name and Email are required.');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(user.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <div>
      <h1>User Management System</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={addUser}>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      {editUser.id && (
        <form onSubmit={editUserData}>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}

      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name} - {user.email}</span>
            <button onClick={() => setEditUser({ id: user.id, name: user.name, email: user.email })}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagementSystem;