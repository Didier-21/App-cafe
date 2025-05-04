// src/pages/CoffeePage.js
import React, { useState, useEffect } from 'react';
import CoffeeForm from '../components/coffeePurchases/CoffeeForm';
import CoffeeList from '../components/coffeePurchases/CoffeeList';

import { getAllPurchases, savePurchase, deletePurchase } from '../components/coffeePurchases/coffeeActions';


export default function CoffeePage() {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    setPurchases(getAllPurchases());
  }, []);

  const handleSave = (purchase) => {
    if (purchase.id) {
      savePurchase(purchase);
    } else {
      savePurchase(purchase);
    }
    setPurchases(getAllPurchases()); // refrescar la lista
    setSelectedPurchase(null); // limpiar selección
  };

  const handleDelete = (id) => {
    deletePurchase(id);
    setPurchases(getAllPurchases());
  };

  const handleEdit = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const cancelEdit = () => {
    setSelectedPurchase(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registro de Compras de Café</h1>
      <CoffeeForm onSave={handleSave} selectedPurchase={selectedPurchase} onCancelEdit={cancelEdit} />
      <CoffeeList purchases={purchases} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}


