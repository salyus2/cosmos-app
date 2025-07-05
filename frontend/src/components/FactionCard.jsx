import React from "react";
import "./FactionCard.css";

export default function FactionCard({ faction }) {
  return (
    <div className="faction-card">
      <h2>{faction.name}</h2>
      <p>{faction.description}</p>
    </div>
  );
}