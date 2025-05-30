import React, { useEffect, useState } from "react";
import { getClients } from "../clients/clientActions";

export default function AppointmentForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    clientId: "",
    coffeeType: "",
    kilos: "",
    date: "",
    time: "",
    note: "",
  });

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const clientList = await getClients();
      setClients(clientList);
    };
    loadClients();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        clientId: "",
        coffeeType: "",
        kilos: "",
        date: "",
        time: "",
        note: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.clientId ||
      !formData.coffeeType ||
      !formData.kilos ||
      !formData.date ||
      !formData.time
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const client = clients.find((c) => c.id === formData.clientId);
    const clientName = client ? client.name : "Sin nombre"; // Aseguramos que `client.name` esté disponible

    onSave({
      ...formData,
      kilos: parseInt(formData.kilos, 10),
      nombreCliente: clientName, // Aseguramos que se pase correctamente
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="clientId" className="block font-semibold">Cliente:</label>
        <select
          id="clientId"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">Seleccionar cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="coffeeType" className="block font-semibold">Tipo de café:</label>
        <select
          id="coffeeType"
          name="coffeeType"
          value={formData.coffeeType}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">Seleccionar tipo</option>
          <option value="café seco">Café seco</option>
          <option value="café mojado">Café mojado</option>
          <option value="café oreado">Café oreado</option>
          <option value="pasilla">Pasilla</option>
          <option value="pasilla mojada">Pasilla mojada</option>
          <option value="cascota">Cascota</option>
        </select>
      </div>

      <div>
        <label htmlFor="kilos" className="block font-semibold">Cantidad (kg):</label>
        <input
          id="kilos"
          type="number"
          name="kilos"
          value={formData.kilos}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block font-semibold">Fecha:</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block font-semibold">Hora:</label>
        <input
          id="time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="note" className="block font-semibold">Nota (opcional):</label>
        <input
          id="note"
          type="text"
          name="note"
          value={formData.note}
          onChange={handleChange}
          maxLength={25}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {formData.id ? "Actualizar" : "Guardar"}
        </button>
        {formData.id && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
