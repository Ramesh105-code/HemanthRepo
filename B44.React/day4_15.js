import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserEdit from "./components/UserEdit";
import "./App.css";

const App = () => {
  const [editingUser, setEditingUser] = useState(null);

  const refresh = () => window.location.reload();

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="app">
      <h1>Multi-User Data Management</h1>
      {editingUser ? (
        <UserEdit
          user={editingUser}
          onCancel={handleCancelEdit}
          onUserUpdated={refresh}
        />
      ) : (
        <>
          <UserForm onUserAdded={refresh} />
          <UserList onEdit={handleEdit} onDelete={refresh} />
        </>
      )}
    </div>
  );
};

export default App;
