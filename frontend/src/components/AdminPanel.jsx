import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [factions, setFactions] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [faction, setFaction] = useState('');
  const [message, setMessage] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchFactions();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:4000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const fetchFactions = async () => {
    const res = await fetch('http://localhost:4000/api/factions');
    const data = await res.json();
    setFactions(data);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, faction })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage({ type: 'success', text: 'Usuario creado correctamente' });
      setUsername('');
      setPassword('');
      setFaction('');
      fetchUsers();
    } else {
      setMessage({ type: 'error', text: data.message || 'Error al crear usuario' });
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`¿Eliminar usuario ${username}?`)) {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchUsers();
      } else {
        setMessage({ type: 'error', text: data.message || 'Error al eliminar usuario' });
      }
    }
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleCloseProfile = () => {
    setEditingUserId(null);
  };

  const handleUserUpdated = () => {
    fetchUsers();
  };

  return (
    <div style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}>
      <h2>Panel de administración</h2>

      {message && (
        <div
          style={{
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            padding: 10,
            marginBottom: 24,
            borderRadius: 5
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleCreateUser} style={{ marginBottom: 32 }}>
        <h3>Crear nuevo usuario</h3>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <select
          value={faction}
          onChange={e => setFaction(e.target.value)}
          required
          style={{ marginRight: 10 }}
        >
          <option value="">Selecciona facción</option>
          {factions.map(fac => (
            <option value={fac.name} key={fac._id}>
              {fac.name}
            </option>
          ))}
        </select>
        <button type="submit">Crear usuario</button>
      </form>

      <h3>Usuarios existentes</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Usuario</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Facción</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.username}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.faction}</td>
              <td style={{ border: '1px solid #ccc', padding: 8, display: 'flex', gap: 8 }}>
                <button
                  onClick={() => handleEditUser(user._id)}
                  style={{
                    color: 'white',
                    background: 'orange',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: '4px 12px'
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id, user.username)}
                  style={{
                    color: 'white',
                    background: 'red',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: '4px 12px'
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal o ficha de edición */}
      {editingUserId && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: '#0008',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <UserProfile
            userId={editingUserId}
            onClose={handleCloseProfile}
            onUserUpdated={handleUserUpdated}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;