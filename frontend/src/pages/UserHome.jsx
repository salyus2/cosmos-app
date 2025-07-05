import React, { useEffect, useState } from 'react';
import UserAccessCard from '../components/UserAccessCard';

const UserHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulación de obtención de datos de usuario autenticado
    // Puedes cambiar esto por fetch a tu backend o contexto global
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    // Ejemplo real:
    // fetch('/api/users/me').then(...)
  }, []);

  return (
    <div style={{minHeight:"100vh", background:"linear-gradient(130deg, #0a0e17 65%, #2e99e6 150%)"}}>
      <UserAccessCard user={user} />
    </div>
  );
};

export default UserHome;