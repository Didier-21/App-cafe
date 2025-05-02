import React from 'react';

const ClientList = ({ clients, onDelete, onEdit }) => {
  return (
    <ul className="space-y-2">
      {clients.map(client => (
        <li key={client.id} className="p-3 border rounded flex justify-between items-center">
          <div>
            <p className="font-bold">{client.name}</p>
            <p>{client.address}</p>
            <p>{client.phone}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(client)} className="px-2 py-1 bg-yellow-500 text-white rounded">Editar</button>
            <button onClick={() => onDelete(client.id)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ClientList;

