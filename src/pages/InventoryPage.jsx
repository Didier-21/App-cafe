import React, { useEffect, useState } from "react";
import InventoryForm from "../components/inventory/InventoryForm";
import InventoryList from "../components/inventory/InventoryList";
import SelectPurchasesModal from "../components/inventory/SelectPurchasesModal";

import {
  getInventario,
  saveInventario,
  updateInventario,
  deleteInventario,
} from "../components/inventory/inventoryActions";

import { getAllPurchases } from "../components/coffeePurchases/coffeeActions";

const InventoryPage = () => {
  const [inventario, setInventario] = useState([]);
  const [loteEditando, setLoteEditando] = useState(null);

  const [mostrarModalCompras, setMostrarModalCompras] = useState(false);
  const [comprasDisponibles, setComprasDisponibles] = useState([]);
  const [comprasSeleccionadas, setComprasSeleccionadas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const inventarioData = await getInventario();
      setInventario(inventarioData);

      const comprasData = await getAllPurchases();
      setComprasDisponibles(comprasData);
    };
    fetchData();
  }, []);

  const handleGuardar = async (nuevoLote) => {
    const loteConCompras = {
      ...nuevoLote,
      compras: comprasSeleccionadas,
      fechaCreacion: nuevoLote.fechaCreacion || new Date().toISOString(),
    };

    if (loteEditando) {
      const loteConId = { ...loteConCompras, id: loteEditando.id };
      await updateInventario(loteConId);
      setInventario((prev) =>
        prev.map((lote) => (lote.id === loteEditando.id ? loteConId : lote))
      );
      setLoteEditando(null);
    } else {
      const loteConId = { ...loteConCompras, id: Date.now() };
      await saveInventario(loteConId);
      setInventario((prev) => [...prev, loteConId]);
    }

    setComprasSeleccionadas([]);
  };

  const handleEliminar = async (id) => {
    await deleteInventario(id);
    setInventario((prev) => prev.filter((lote) => lote.id !== id));
  };

  const handleEditar = (lote) => {
    setLoteEditando(lote);
    setComprasSeleccionadas(lote.compras || []);
  };

  const handleConfirmarCompras = (compras) => {
    setComprasSeleccionadas(compras);
    setMostrarModalCompras(false); // cierro modal al confirmar
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Inventario</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setMostrarModalCompras(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          type="button"
        >
          Compras
        </button>
      </div>

      <InventoryForm
        onSave={handleGuardar}
        loteEditando={loteEditando}
        setLoteEditando={setLoteEditando}
        comprasSeleccionadas={comprasSeleccionadas} // cambio de nombre para claridad
      />

      <InventoryList
        inventario={inventario}
        onDelete={handleEliminar}
        onEdit={handleEditar}
      />

      <SelectPurchasesModal
        isOpen={mostrarModalCompras}
        onClose={() => setMostrarModalCompras(false)}
        onSelect={handleConfirmarCompras} // ✅ Nombre correcto
        compras={comprasDisponibles}
      />

    </div>
  );
};

export default InventoryPage;
