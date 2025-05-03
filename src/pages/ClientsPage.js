// src/pages/ClientsPage.js
import React, { useState, useEffect } from 'react';
import ClientForm from '../components/clients/ClientForm';
import ClientList from '../components/clients/ClientList';
import { getClients, saveClient, deleteClient, updateClient } from '../components/clients/clientActions';


export default function ClientsPage() {
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Clientes</h1>
      <ClientForm onSave={handleSave} selectedClient={selectedClient} onCancelEdit={cancelEdit} />
      <ClientList clients={clients} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
