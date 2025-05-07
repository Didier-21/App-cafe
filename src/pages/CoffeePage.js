// src/pages/CoffeePage.js
import React, { useState, useEffect } from 'react';
import CoffeeForm from '../components/coffeePurchases/CoffeeForm';
import CoffeeList from '../components/coffeePurchases/CoffeeList';
import {
  getAllPurchases,
  savePurchase,
  deletePurchase
} from '../components/coffeePurchases/coffeeActions';

export default function CoffeePage() {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      const data = await getAllPurchases();
      setPurchases(data);
    };
    fetchPurchases();
  }, []);

  const refresh = async () => {
    const updated = await getAllPurchases();
    setPurchases(updated);
  };

  const handleSave = async (purchase) => {
    await savePurchase(purchase);
    await refresh();
    setSelectedPurchase(null);
  };

  const handleEdit = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const handleDelete = async (id) => {
    await deletePurchase(id);
    await refresh();
  };

  const handleCancelEdit = () => {
    setSelectedPurchase(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <CoffeeForm
        onSave={handleSave}
        selectedPurchase={selectedPurchase}
        onCancelEdit={handleCancelEdit}
      />
      <CoffeeList
        purchases={purchases}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
