import React, { useEffect, useState } from "react";
import { calcularDatosDesdeCompras } from "./utils/inventoryUtils";

const InventoryForm = ({ onSave, loteEditando, setLoteEditando, comprasSeleccionadas }) => {
  const [formulario, setFormulario] = useState({
    tipoCafe: "",
    kilos: "",
    precioPorKilo: "",
    ubicacion: "",
    observaciones: "",
  });

  const [datosDesdeCompras, setDatosDesdeCompras] = useState(null);

  useEffect(() => {
    if (loteEditando) {
      setFormulario(loteEditando);
      if (loteEditando.compras && loteEditando.compras.length > 0) {
        const tipos = [...new Set(loteEditando.compras.map(c => c.tipoCafe))];
        const { kilosTotales, precioPromedio } = calcularDatosDesdeCompras(loteEditando.compras);
        setDatosDesdeCompras({
          tipoCafe: tipos[0],
          kilos: kilosTotales,
          precio: precioPromedio,
        });
      } else {
        setDatosDesdeCompras(null);
      }
    } else {
      setFormulario({
        tipoCafe: "",
        kilos: "",
        precioPorKilo: "",
        ubicacion: "",
        observaciones: "",
      });
      setDatosDesdeCompras(null);
    }
  }, [loteEditando]);

  useEffect(() => {
    if (comprasSeleccionadas && comprasSeleccionadas.length > 0) {
      const tipos = [...new Set(comprasSeleccionadas.map(c => c.tipoCafe))];
      const { kilosTotales, precioPromedio } = calcularDatosDesdeCompras(comprasSeleccionadas);
      setDatosDesdeCompras({
        tipoCafe: tipos[0],
        kilos: kilosTotales,
        precio: precioPromedio,
      });
    } else {
      setDatosDesdeCompras(null);
    }
  }, [comprasSeleccionadas]);

  useEffect(() => {
    if (datosDesdeCompras) {
      setFormulario((prev) => ({
        ...prev,
        tipoCafe: datosDesdeCompras.tipoCafe,
        kilos: datosDesdeCompras.kilos,
        precioPorKilo: datosDesdeCompras.precio,
      }));
    }
  }, [datosDesdeCompras]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formulario.tipoCafe ||
      !formulario.kilos ||
      !formulario.precioPorKilo ||
      !formulario.ubicacion
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onSave({
      ...formulario,
      kilos: parseInt(formulario.kilos),
      precioPorKilo: parseFloat(formulario.precioPorKilo),
      compras: comprasSeleccionadas || [],
    });

    setFormulario({
      tipoCafe: "",
      kilos: "",
      precioPorKilo: "",
      ubicacion: "",
      observaciones: "",
    });

    setLoteEditando(null);
    setDatosDesdeCompras(null);
  };

  return (
    <div className="mb-6">
      {comprasSeleccionadas && comprasSeleccionadas.length > 0 && (
        <div className="mb-4 p-3 border rounded bg-gray-50 text-gray-800">
          <p className="font-semibold mb-2">Compras seleccionadas:</p>
          <ul className="list-disc list-inside text-sm mb-2">
            {comprasSeleccionadas.map((compra, index) => (
              <li key={index}>
                {compra.tipoCafe} – {compra.kilos} kg a ${parseFloat(compra.precio).toFixed(2)} /kg
              </li>
            ))}
          </ul>
          <div className="text-sm font-medium mt-2">
            <p>
              <strong>Kilos totales:</strong>{" "}
              {comprasSeleccionadas.reduce((total, c) => total + parseFloat(c.kilos || 0), 0)}
            </p>
            <p>
              <strong>Precio promedio:</strong>{" "}
              {(() => {
                const totalKilos = comprasSeleccionadas.reduce(
                  (acc, c) => acc + parseFloat(c.kilos || 0),
                  0
                );
                const totalCosto = comprasSeleccionadas.reduce(
                  (acc, c) => acc + (parseFloat(c.kilos || 0) * parseFloat(c.precio || 0)),
                  0
                );
                return totalKilos ? `$${(totalCosto / totalKilos).toFixed(2)}` : "$0.00";
              })()}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium">Tipo de café</label>
          <select
            name="tipoCafe"
            value={formulario.tipoCafe}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="Café seco">Café seco</option>
            <option value="Café mojado">Café mojado</option>
            <option value="Café oreado">Café oreado</option>
            <option value="Pasilla">Pasilla</option>
            <option value="Pasilla mojada">Pasilla mojada</option>
            <option value="Cascota">Cascota</option>
            <option value="En proceso de secado">En proceso de secado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Kilos</label>
          <input
            type="number"
            name="kilos"
            value={formulario.kilos}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Precio por kilo</label>
          <input
            type="number"
            step="0.01"
            name="precioPorKilo"
            value={formulario.precioPorKilo}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Ubicación</label>
          <select
            name="ubicacion"
            value={formulario.ubicacion}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Seleccionar ubicación</option>
            <option value="Bodega">Bodega</option>
            <option value="Plancha casa">Plancha casa</option>
            <option value="Plancha 3">Plancha 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Observaciones</label>
          <input
            type="text"
            name="observaciones"
            maxLength={30}
            value={formulario.observaciones}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Guardar
          </button>
          {loteEditando && (
            <button
              type="button"
              onClick={() => {
                setFormulario({
                  tipoCafe: "",
                  kilos: "",
                  precioPorKilo: "",
                  ubicacion: "",
                  observaciones: "",
                });
                setLoteEditando(null);
                setDatosDesdeCompras(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
