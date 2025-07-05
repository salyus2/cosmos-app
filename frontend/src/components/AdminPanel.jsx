import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [factions, setFactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [faction, setFaction] = useState('');
  const [message, setMessage] = useState(null);

  // Cargar facciones y usuarios al montar el componente
  useEffect(() => {
    fetch('http://localhost:4000/api/factions')
      .then(res => res.json())
      .then(data => setFactions(data))
      .catch(() => setFactions([]));

    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, faction }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage({ type: 'success', text: `Usuario creado: ${data.user.username}` });
      setUsername('');
      setPassword('');
      setFaction('');
      fetchUsers();
    } else {
      setMessage({ type: 'error', text: data.message || 'Error al crear usuario' });
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Panel de administración</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Facción:</label>
          <select
            value={faction}
            onChange={e => setFaction(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          >
            <option value="">Selecciona una facción</option>
            {factions.map(fac => (
              <option key={fac._id} value={fac.name}>{fac.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ width: '100%' }}>Crear usuario</button>
      </form>
      {message && (
        <div style={{
          marginTop: 15,
          padding: 10,
          color: message.type === 'success' ? 'green' : 'red',
          border: `1px solid ${message.type === 'success' ? 'green' : 'red'}`,
          borderRadius: 4
        }}>
          {message.text}
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h3>Usuarios existentes</h3>
      {users.length === 0 ? (
        <div>No hay usuarios.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Usuario</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Facción</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.username}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.faction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;