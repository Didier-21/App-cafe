import React, { useState, useEffect } from 'react';

const ClientForm = ({ onSave, selectedClient, onCancelEdit }) => {
  const [client, setClient] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedClient) {
      setClient(selectedClient);
    } else {
      setClient({ name: '', address: '', phone: '' });
    }
    setErrors({});
  }, [selectedClient]);

  const validate = () => {
    const newErrors = {};

    if (!client.name.trim() || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,50}$/.test(client.name)) {
      newErrors.name = 'Nombre obligatorio, solo letras (máx 50 caracteres)';
    }

    if (!client.address.trim() || client.address.length > 40) {
      newErrors.address = 'Dirección obligatoria (máx 40 caracteres)';
    }

    if (!/^\d{10}$/.test(client.phone)) {
      newErrors.phone = 'Teléfono obligatorio, 10 dígitos numéricos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    onSave(client);
    setClient({ name: '', address: '', phone: '' });
    setErrors({});
  };

  const handleCancel = () => {
    setClient({ name: '', address: '', phone: '' });
    setErrors({});
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 bg-white p-4 rounded shadow">
      {/* Nombre */}
      <div>
        <label className="block font-medium">Nombre *</label>
        <input
          name="name"
          placeholder="Nombre"
          value={client.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Dirección */}
      <div>
        <label className="block font-medium">Dirección *</label>
        <input
          name="address"
          placeholder="Dirección"
          value={client.address}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block font-medium">Teléfono *</label>
        <input
          name="phone"
          placeholder="Teléfono"
          value={client.phone}
          onChange={handleChange}
          maxLength="10"
          className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Botones */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {client.id ? 'Actualizar' : 'Agregar'}
        </button>
        {client.id && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ClientForm;
