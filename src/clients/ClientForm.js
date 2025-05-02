import React, { useState, useEffect } from 'react';

const ClientForm = ({ onSave, selectedClient, onCancelEdit }) => {
  const [client, setClient] = useState({
    name: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    if (selectedClient) {
      setClient(selectedClient);
    } else {
      setClient({ name: '', address: '', phone: '' });
    }
  }, [selectedClient]);

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!client.name || !client.phone) return;

    onSave(client);
    setClient({ name: '', address: '', phone: '' });
  };

  const handleCancel = () => {
    setClient({ name: '', address: '', phone: '' });
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <input name="name" placeholder="Nombre" value={client.name} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="address" placeholder="Dirección" value={client.address} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="phone" placeholder="Teléfono" value={client.phone} onChange={handleChange} className="w-full p-2 border rounded" />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {client.id ? 'Actualizar' : 'Agregar'}
        </button>
        {client.id && (
          <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ClientForm;
