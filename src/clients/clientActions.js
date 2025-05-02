const STORAGE_KEY = 'clients';

export const getClients = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addClient = (client) => {
  const clients = getClients();
  clients.push(client);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

