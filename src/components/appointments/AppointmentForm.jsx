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
    if (!formData.clientId || !formData.coffeeType || !formData.kilos || !formData.date || !formData.time) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    onSave({ ...formData, kilos: parseInt(formData.kilos, 10) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block font-semibold">Cliente:</label>
        <select
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
        <label className="block font-semibold">Tipo de café:</label>
        <select
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
        <label className="block font-semibold">Cantidad (kg):</label>
        <input
          type="number"
          name="kilos"
          value={formData.kilos}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Fecha:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Hora:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Nota (opcional):</label>
        <input
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
