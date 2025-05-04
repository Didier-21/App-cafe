// src/components/coffeePurchases/CoffeeForm.js
import React, { useState, useEffect } from 'react';

export default function CoffeeForm({ onSave, selectedPurchase, onCancelEdit }) {
  const [form, setForm] = useState({
    productor: '',
    cantidad: '',
    precio: '',
    fecha: '',
    ubicacion: '',
    nota: ''
  });

  useEffect(() => {
    if (selectedPurchase) {
      setForm(selectedPurchase);
    } else {
      setForm({
        productor: '',
        cantidad: '',
        precio: '',
        fecha: '',
        ubicacion: '',
        nota: ''
      });
    }
  }, [selectedPurchase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.productor || !form.cantidad || !form.precio || !form.fecha || !form.ubicacion) {
      alert("Todos los campos obligatorios deben ser completados.");
      return;
    }

    onSave({
      ...form,
      cantidad: parseFloat(form.cantidad),
      precio: parseFloat(form.precio),
    });

    setForm({
      productor: '',
      cantidad: '',
      precio: '',
      fecha: '',
      ubicacion: '',
      nota: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">
        {selectedPurchase ? 'Editar Compra' : 'Agregar Compra'}
      </h2>

      <div className="grid gap-2">
        <input
          name="productor"
          value={form.productor}
          onChange={handleChange}
          placeholder="Nombre del productor"
          className="border p-2 rounded"
          required
        />
        <input
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          placeholder="Cantidad (kg)"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio ($)"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          type="date"
          className="border p-2 rounded"
          required
        />
        <input
          name="ubicacion"
          value={form.ubicacion}
          onChange={handleChange}
          placeholder="Ubicación"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="nota"
          value={form.nota}
          onChange={handleChange}
          placeholder="Nota (opcional)"
          className="border p-2 rounded"
        />

        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {selectedPurchase ? 'Actualizar' : 'Guardar'}
          </button>
          {selectedPurchase && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}



