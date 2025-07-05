// Servicio para consumir la API de facciones
const API_URL = "http://localhost:4000/api/factions"; // Ajusta si tu backend usa otra URL/puerto

export async function getFactions() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener las facciones");
  }
  return response.json();
}
