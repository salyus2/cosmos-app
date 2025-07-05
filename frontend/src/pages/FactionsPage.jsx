import React, { useEffect, useState } from "react";
import { getFactions } from "../services/factionService";
import FactionList from "../components/FactionList";

export default function FactionsPage() {
  const [factions, setFactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getFactions()
      .then(setFactions)
      .catch(() => setError("Error cargando facciones"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando facciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Facciones</h1>
      <FactionList factions={factions} />
    </div>
  );
}