export const getClients = () => {
  return JSON.parse(localStorage.getItem('clients')) || [];
};

export const saveClient = (client) => {
  const clients = getClients();
  client.id = Date.now();
  clients.push(client);
  localStorage.setItem('clients', JSON.stringify(clients));
};

export const deleteClient = (id) => {
  const clients = getClients().filter(client => client.id !== id);
  localStorage.setItem('clients', JSON.stringify(clients));
};

export const updateClient = (updatedClient) => {
  const clients = getClients().map(client =>
    client.id === updatedClient.id ? updatedClient : client
  );
  localStorage.setItem('clients', JSON.stringify(clients));
};
