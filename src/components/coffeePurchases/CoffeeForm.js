// src/components/coffeePurchases/CoffeeForm.js
import React, { useState, useEffect } from 'react';

const tiposCafe = [
  '', // obliga a seleccionar
  'Café Mojado',
  'Café Oreado',
  'Café Seco',
  'Pasilla',
  'Pasilla Mojada',
  'Cascota',
];

export default function CoffeeForm({ onSave, selectedPurchase, onCancelEdit }) {
  const [form, setForm] = useState({
    nombreCliente: '',
    tipo: '',
    peso: '',
    precio: '',
    ubicacion: '',
    nota: '',
  });
  const [errors, setErrors] = useState({});

  // Carga para edición
  useEffect(() => {
    if (selectedPurchase) {
      setForm(selectedPurchase);
    } else {
      setForm({
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
  

  // Validaciones
  const validate = () => {
    const errs = {};
    if (!form.nombreCliente.trim() || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,40}$/.test(form.nombreCliente))
      errs.nombreCliente = 'Solo letras (máx 40 caracteres)';
    if (!form.tipo) errs.tipo = 'Debe seleccionar tipo de café';
    if (!form.peso || isNaN(form.peso)) errs.peso = 'Peso numérico requerido';
    if (!form.precio || isNaN(form.precio)) errs.precio = 'Precio numérico requerido';
    if (!form.ubicacion.trim() || !/^[A-Za-z0-9 ]{1,25}$/.test(form.ubicacion))
      errs.ubicacion = 'Hasta 25 caracteres (letras y números)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Cálculo de peso neto
  const calcularPesoNeto = (peso, tipo) => {
    if (['Café Mojado', 'Pasilla Mojada', 'Cascota'].includes(tipo)) {
      return +(peso * 0.92).toFixed(2);
    }
    return +peso;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const pesoNeto = calcularPesoNeto(parseFloat(form.peso), form.tipo);
    const total = +(pesoNeto * parseFloat(form.precio)).toFixed(2);
  
    const nuevaCompra = {
      ...form,
      peso: parseFloat(form.peso),
      precio: parseFloat(form.precio),
      pesoNeto: parseFloat(pesoNeto.toFixed(1)),
      total,
      fecha: selectedPurchase ? form.fecha : new Date().toISOString(),
      id: selectedPurchase?.id ?? undefined,
    };
  
    onSave(nuevaCompra);
  
    setForm({
      nombreCliente: '',
      tipo: '',
      peso: '',
      precio: '',
      ubicacion: '',
      nota: '',
      fecha: '',
    });
    setErrors({});
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">
        {selectedPurchase ? 'Editar Compra' : 'Registrar Compra de Café'}
      </h2>

      <div>
        <label className="block font-medium">Nombre del Cliente</label>
        <input
          type="text"
          value={form.nombreCliente}
          onChange={e => setForm({ ...form, nombreCliente: e.target.value })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.nombreCliente && <p className="text-red-500 text-sm">{errors.nombreCliente}</p>}
      </div>

      <div>
        <label className="block font-medium">Tipo de Café</label>
        <select
          value={form.tipo}
          onChange={e => setForm({ ...form, tipo: e.target.value })}
          className="mt-1 w-full border px-3 py-2 rounded"
        >
          {tiposCafe.map((t, i) => (
            <option key={i} value={t}>{t || '-- Seleccione --'}</option>
          ))}
        </select>
        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Peso (Kg)</label>
          <input
            type="number"
            step="0.01"
            value={form.peso}
            onChange={e => setForm({ ...form, peso: e.target.value })}
            className="mt-1 w-full border px-3 py-2 rounded"
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
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
        </div>
      </div>

      <div>
        <label className="block font-medium">Ubicación</label>
        <input
          type="text"
          value={form.ubicacion}
          onChange={e => setForm({ ...form, ubicacion: e.target.value })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.ubicacion && <p className="text-red-500 text-sm">{errors.ubicacion}</p>}
      </div>

      <div>
        <label className="block font-medium">Nota (opcional)</label>
        <textarea
          value={form.nota}
          onChange={e => setForm({ ...form, nota: e.target.value })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
      </div>

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
