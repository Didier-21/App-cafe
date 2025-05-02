import React, { useState } from 'react';
import ClientForm from './clients/ClientForm';
import ClientList from './clients/ClientList';
import { addClient, getClients } from './clients/clientActions';

function App() {
  const [clients, setClients] = useState(getClients());

  const handleAddClient = (newClient) => {
    addClient(newClient);
    setClients(getClients());
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center text-blue-600 mt-10">Bienvenido a Cafe App</h1>
      <div className="max-w-4xl mx-auto mt-10">
        <ClientForm onSubmit={handleAddClient} />
        <ClientList clients={clients} />
      </div>
    </div>
  );
}

export default App;
