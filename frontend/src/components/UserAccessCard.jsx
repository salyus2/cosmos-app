import React from 'react';

const cardStyle = {
  maxWidth: 360,
  margin: "48px auto",
  padding: "32px 28px",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #181c25 70%, #2e99e6 150%)",
  boxShadow: "0 8px 32px 0 #0006, 0 0 0 2px #43f9ff33 inset",
  color: "#e1ecfa",
  fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
  letterSpacing: "0.04em",
  position: "relative",
  overflow: "hidden"
};

const glowStyle = {
  position: "absolute",
  top: -80,
  left: -80,
  width: 200,
  height: 200,
  background: "radial-gradient(circle, #43f9ff55 0%, transparent 80%)",
  filter: "blur(8px)",
  zIndex: 0,
  pointerEvents: "none"
};

const titleStyle = {
  fontSize: "1.7rem",
  fontWeight: 700,
  color: "#43f9ff",
  marginBottom: "22px",
  textShadow: "0 0 8px #2e99e6, 0 0 16px #181c25"
};

const labelStyle = {
  color: "#b0e0ff",
  fontWeight: 600,
  textTransform: "uppercase",
  fontSize: "0.95rem",
  marginBottom: "2px",
  letterSpacing: "0.09em"
};

const valueStyle = {
  fontSize: "1.25rem",
  fontWeight: 500,
  color: "#f3f7ff",
  marginBottom: "18px"
};

const UserAccessCard = ({ user }) => {
  if (!user) return <div style={{textAlign:"center", color:"#fff"}}>Cargando...</div>;

  return (
    <div style={cardStyle}>
      <div style={glowStyle}></div>
      <div style={{position:"relative", zIndex:1}}>
        <div style={titleStyle}>Acceso Espacial</div>
        <div>
          <div style={labelStyle}>Nombre</div>
          <div style={valueStyle}>{user.username}</div>
        </div>
        <div>
          <div style={labelStyle}>Facción</div>
          <div style={valueStyle}>{user.faction}</div>
        </div>
      </div>
    </div>
  );
};

export default UserAccessCard;