import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId, onClose, onUserUpdated }) => {
  const [user, setUser] = useState(null);
  const [factions, setFactions] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [faction, setFaction] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchFactions();
    // eslint-disable-next-line
  }, [userId]);

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:4000/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
    setUsername(data.username);
    setFaction(data.faction);
  };

  const fetchFactions = async () => {
    const res = await fetch('http://localhost:4000/api/factions');
    const data = await res.json();
    setFactions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (username !== user.username) payload.username = username;
    if (faction !== user.faction) payload.faction = faction;
    if (password) payload.password = password;

    const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      setMessage({ type: 'success', text: data.message });
      setPassword('');
      onUserUpdated && onUserUpdated();
      fetchUser();
    } else {
      setMessage({ type: 'error', text: data.message || 'Error al actualizar usuario' });
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 12px #0002', maxWidth: 420 }}>
      <h3>Editar usuario</h3>
      {message && (
        <div
          style={{
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            padding: 10,
            marginBottom: 18,
            borderRadius: 5
          }}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 6, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Nueva contraseña (opcional):</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 6, marginTop: 4 }}
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Facción:</label>
          <select
            value={faction}
            onChange={e => setFaction(e.target.value)}
            required
            style={{ width: '100%', padding: 6, marginTop: 4 }}
          >
            <option value="">Selecciona facción</option>
            {factions.map(fac => (
              <option value={fac.name} key={fac._id}>
                {fac.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" onClick={onClose} style={{ background: '#ccc', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>
            Cerrar
          </button>
          <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;