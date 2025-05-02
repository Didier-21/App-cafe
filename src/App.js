import React, { useState, useEffect } from 'react';
import ClientForm from './clients/ClientForm';
import ClientList from './clients/ClientList';
import { getClients, saveClient, deleteClient, updateClient } from './clients/clientActions';

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const handleSave = (client) => {
    if (client.id) {
      updateClient(client);
    } else {
      saveClient(client);
    }
    setClients(getClients());
    setSelectedClient(null);
  };

  const handleDelete = (id) => {
    deleteClient(id);
    setClients(getClients());
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
  };

  const cancelEdit = () => {
    setSelectedClient(null);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda de Clientes</h1>
      <ClientForm onSave={handleSave} selectedClient={selectedClient} onCancelEdit={cancelEdit} />
      <ClientList clients={clients} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;


  