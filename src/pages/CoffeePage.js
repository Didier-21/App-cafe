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

  // Carga inicial y cada vez que cambie el array
  useEffect(() => {
    setPurchases(getAllPurchases());
  }, []);

  const refresh = () => setPurchases(getAllPurchases());

  const handleSave = purchase => {
    savePurchase(purchase);
    refresh();
    setSelectedPurchase(null);
  };

  const handleEdit = purchase => {
    setSelectedPurchase(purchase);
  };

  const handleDelete = id => {
    deletePurchase(id);
    refresh();
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
