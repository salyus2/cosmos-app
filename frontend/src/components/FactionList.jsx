import React from "react";
import FactionCard from "./FactionCard";
import "./FactionList.css";

export default function FactionList({ factions }) {
  if (!factions?.length) return <p>No hay facciones disponibles.</p>;
  return (
    <div className="faction-list">
      {factions.map((faction) => (
        <FactionCard key={faction._id || faction.name} faction={faction} />
      ))}
    </div>
  );
}