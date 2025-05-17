import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import moment from "moment";

const SelectPurchasesModal = ({ isOpen, onClose, onSelect, compras }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [seleccionarTodas, setSeleccionarTodas] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFechaInicio("");
      setFechaFin("");
      setComprasFiltradas([]);
      setSeleccionadas([]);
      setSeleccionarTodas(false);
    }
  }, [isOpen]);

  const filtrarCompras = () => {
    if (!fechaInicio || !fechaFin) return;
    const inicio = moment(fechaInicio);
    const fin = moment(fechaFin);
    const filtradas = compras.filter((compra) => {
      const fechaCompra = moment(compra.fecha);
      return fechaCompra.isBetween(inicio, fin, null, "[]");
    });
    setComprasFiltradas(filtradas);
    setSeleccionadas([]);
    setSeleccionarTodas(false);
  };

  const toggleSeleccion = (id) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter((sid) => sid !== id));
    } else {
      setSeleccionadas([...seleccionadas, id]);
    }
  };

  const toggleSeleccionTodas = () => {
    if (seleccionarTodas) {
      setSeleccionadas([]);
      setSeleccionarTodas(false);
    } else {
      const todosIds = comprasFiltradas.map((c) => c.id);
      setSeleccionadas(todosIds);
      setSeleccionarTodas(true);
    }
  };

  const confirmar = () => {
    const seleccion = comprasFiltradas.filter((c) => seleccionadas.includes(c.id));
    onSelect(seleccion);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full">
          <Dialog.Title className="text-xl font-bold mb-4">Seleccionar compras</Dialog.Title>

          <div className="flex gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm">Desde:</label>
              <input
                type="datetime-local"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Hasta:</label>
              <input
                type="datetime-local"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="border rounded p-2"
              />
            </div>
            <button
              onClick={filtrarCompras}
              className="bg-blue-600 text-white px-4 py-2 rounded self-end"
            >
              Filtrar
            </button>
          </div>

          {comprasFiltradas.length > 0 ? (
            <>
              <div className="overflow-x-auto max-h-64 overflow-y-auto border rounded">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2">
                        <input
                          type="checkbox"
                          checked={seleccionarTodas}
                          onChange={toggleSeleccionTodas}
                        />
                      </th>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Cliente</th>
                      <th className="p-2 text-left">Tipo de café</th>
                      <th className="p-2 text-left">Kilos</th>
                      <th className="p-2 text-left">$/kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comprasFiltradas.map((compra) => (
                      <tr key={compra.id} className="border-t">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={seleccionadas.includes(compra.id)}
                            onChange={() => toggleSeleccion(compra.id)}
                          />
                        </td>
                        <td className="p-2">{moment(compra.fecha).format("YYYY-MM-DD HH:mm")}</td>
                        <td className="p-2">{compra.nombreCliente || compra.clienteNombre}</td>
                        <td className="p-2">{compra.tipoCafe}</td>
                        <td className="p-2">{compra.kilos}</td>
                        <td className="p-2">${compra.precioPorKilo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded border">
                  Cancelar
                </button>
                <button
                  onClick={confirmar}
                  className="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Confirmar selección
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-4">No hay compras en el rango seleccionado.</p>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SelectPurchasesModal;
