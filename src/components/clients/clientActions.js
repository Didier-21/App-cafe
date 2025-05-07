import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const CLIENTS_KEY = 'clients';

export const getClients = async () => {
  const clients = await localforage.getItem(CLIENTS_KEY);
  return clients || [];
};

export const saveClient = async (client) => {
  const clients = await getClients();
  client.id = Date.now(); // o usa uuidv4() si quieres ID único más robusto
  clients.push(client);
  await localforage.setItem(CLIENTS_KEY, clients);
};

export const deleteClient = async (id) => {
  const clients = await getClients();
  const updated = clients.filter(client => client.id !== id);
  await localforage.setItem(CLIENTS_KEY, updated);
};

export const updateClient = async (updatedClient) => {
  const clients = await getClients();
  const updated = clients.map(client =>
    client.id === updatedClient.id ? updatedClient : client
  );
  await localforage.setItem(CLIENTS_KEY, updated);
};
