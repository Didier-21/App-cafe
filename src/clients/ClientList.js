import React from 'react';

function ClientList({ clients }) {
  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-2">Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <ul className="list-disc pl-4">
          {clients.map((client, index) => (
            <li key={index}>
              <strong>{client.name}</strong> - {client.phone} ({client.address})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientList;

