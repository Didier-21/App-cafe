// src/components/coffeePurchases/CoffeeForm.js
import React, { useState, useEffect } from 'react';
import { getClients } from '../clients/clientActions'; // Ajusta si tu ruta es distinta
import localforage from 'localforage';

const tiposCafe = [
  '', 'Café Mojado', 'Café Oreado', 'Café Seco',
  'Pasilla', 'Pasilla Mojada', 'Cascota',
];

export default function CoffeeForm({ onSave, selectedPurchase, onCancelEdit }) {
  const [form, setForm] = useState({
    clienteId: '',
    nombreCliente: '',
    tipo: '',
    peso: '',
    precio: '',
    ubicacion: '',
    nota: '',
    fecha: '',
  });
  const [errors, setErrors] = useState({});
  const [clientes, setClientes] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Carga de clientes desde localforage
  useEffect(() => {
    const cargarClientes = async () => {
      const stored = await localforage.getItem('clients');
      const todos = stored || await getClients();
      setClientes(todos);
    };
    cargarClientes();
  }, []);

  // Prellenado para edición
  useEffect(() => {
    if (selectedPurchase) {
      setForm(selectedPurchase);
    } else {
      setForm({
        clienteId: '',
        nombreCliente: '',
        tipo: '',
        peso: '',
        precio: '',
        ubicacion: '',
        nota: '',
        fecha: '',
      });
    }
    setErrors({});
  }, [selectedPurchase]);

  const validate = () => {
    const errs = {};
    if (!form.clienteId) errs.nombreCliente = 'Debe seleccionar un cliente válido';
    if (!form.tipo) errs.tipo = 'Debe seleccionar tipo de café';
    if (!form.peso || isNaN(form.peso)) errs.peso = 'Peso numérico requerido';
    if (!form.precio || isNaN(form.precio)) errs.precio = 'Precio numérico requerido';
    if (!form.ubicacion.trim() || !/^[A-Za-z0-9 ]{1,25}$/.test(form.ubicacion))
      errs.ubicacion = 'Hasta 25 caracteres (letras y números)';
    if (form.nota.length > 25)
      errs.nota = 'Máx. 25 caracteres';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const calcularPesoNeto = (peso, tipo) => {
    return ['Café Mojado', 'Pasilla Mojada', 'Cascota'].includes(tipo)
      ? +(peso * 0.92).toFixed(2)
      : +peso;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    const pesoNeto = calcularPesoNeto(parseFloat(form.peso), form.tipo);
    const total = +(pesoNeto * parseFloat(form.precio)).toFixed(2);

    const nuevaCompra = {
      ...form,
      peso: parseFloat(form.peso),
      precio: parseFloat(form.precio),
      pesoNeto,
      total,
      fecha: selectedPurchase ? form.fecha : new Date().toISOString(),
      id: selectedPurchase?.id ?? undefined,
    };

    onSave(nuevaCompra);

    setForm({
      clienteId: '',
      nombreCliente: '',
      tipo: '',
      peso: '',
      precio: '',
      ubicacion: '',
      nota: '',
      fecha: '',
    });
    setErrors({});
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">
        {selectedPurchase ? 'Editar Compra' : 'Registrar Compra de Café'}
      </h2>

      {/* 🔍 Buscador de clientes */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={form.nombreCliente}
          onChange={(e) => {
            const value = e.target.value;
            setForm({ ...form, nombreCliente: value });
            const matched = clientes.filter(client =>
              client.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredClients(matched);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full border p-2 rounded"
        />
        {showSuggestions && filteredClients.length > 0 && (
          <ul className="absolute z-10 bg-white border mt-1 w-full max-h-48 overflow-y-auto rounded shadow">
            {filteredClients.map(client => (
              <li
                key={client.id}
                onClick={() => {
                  setForm({
                    ...form,
                    clienteId: client.id,
                    nombreCliente: client.name
                  });
                  setShowSuggestions(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {client.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ☕ Tipo de café */}
      <div>
        <label className="block font-medium">Tipo de Café</label>
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className={`mt-1 w-full border px-3 py-2 rounded ${errors.tipo ? 'border-red-500' : ''}`}
        >
          {tiposCafe.map((t, i) => (
            <option key={i} value={t}>{t || '-- Seleccione --'}</option>
          ))}
        </select>
        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
      </div>

      {/* Peso y Precio */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Peso (Kg)</label>
          <input
            type="number"
            step="0.01"
            value={form.peso}
            onChange={e => setForm({ ...form, peso: e.target.value })}
            className={`mt-1 w-full border px-3 py-2 rounded ${errors.peso ? 'border-red-500' : ''}`}
          />
          {errors.peso && <p className="text-red-500 text-sm">{errors.peso}</p>}
        </div>
        <div>
          <label className="block font-medium">Precio por Kilo ($)</label>
          <input
            type="number"
            step="0.01"
            value={form.precio}
            onChange={e => setForm({ ...form, precio: e.target.value })}
            className={`mt-1 w-full border px-3 py-2 rounded ${errors.precio ? 'border-red-500' : ''}`}
          />
          {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
        </div>
      </div>

      {/* Ubicación */}
      <div>
        <label className="block font-medium">Ubicación</label>
        <input
          type="text"
          value={form.ubicacion}
          onChange={e => setForm({ ...form, ubicacion: e.target.value })}
          className={`mt-1 w-full border px-3 py-2 rounded ${errors.ubicacion ? 'border-red-500' : ''}`}
        />
        {errors.ubicacion && <p className="text-red-500 text-sm">{errors.ubicacion}</p>}
      </div>

      {/* Nota */}
      <div>
        <label className="block font-medium">Nota (opcional)</label>
        <textarea
          value={form.nota}
          maxLength={25}
          onChange={e => setForm({ ...form, nota: e.target.value })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.nota && <p className="text-red-500 text-sm">{errors.nota}</p>}
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-2">
        {selectedPurchase && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {selectedPurchase ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
