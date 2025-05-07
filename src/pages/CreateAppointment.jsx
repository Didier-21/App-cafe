import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const CreateAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({});

  const [appointment, setAppointment] = useState({
    id: '',
    clientId: '',
    clientName: '',
    coffeeType: '',
    kilos: '',
    date: '',
    time: '',
    note: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedAppointments = await localforage.getItem('appointments');
      const storedClients = await localforage.getItem('clients');
      setAppointments(storedAppointments || []);
      setClients(storedClients || []);
    };
    fetchData();
  }, []);

  const saveAppointments = async (newAppointments) => {
    await localforage.setItem('appointments', newAppointments);
    setAppointments(newAppointments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date(); // Fecha y hora actuales
    const selectedDate = new Date(appointment.date); // Fecha seleccionada
    const selectedTime = new Date(`${appointment.date}T${appointment.time}:00`); // Fecha y hora combinadas

    // Aseguramos que la fecha no sea anterior a hoy
    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      setErrors((prev) => ({
        ...prev,
        date: 'La fecha debe ser hoy o una fecha futura.',
      }));
      return;
    }

    // Si la fecha es hoy, verificamos que la hora seleccionada sea posterior a la hora actual
    if (selectedDate >= currentDate.setHours(0, 0, 0, 0) && selectedDate.toDateString() === currentDate.toDateString()) {
      if (selectedTime <= currentDate) {
        setErrors((prev) => ({
          ...prev,
          time: 'La hora debe ser una hora futura.',
        }));
        return;
      }
    }

    setErrors({}); // Limpiar errores si todo está bien

    // Validaciones generales de los otros campos
    if (
      !appointment.clientId ||
      !appointment.coffeeType ||
      !appointment.kilos ||
      !appointment.date ||
      !appointment.time
    ) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const newAppointment = {
      ...appointment,
      id: appointment.id || uuidv4(),
    };

    const updatedAppointments = appointment.id
      ? appointments.map((a) => (a.id === appointment.id ? newAppointment : a))
      : [...appointments, newAppointment];

    saveAppointments(updatedAppointments);
    setAppointment({
      id: '',
      clientId: '',
      clientName: '',
      coffeeType: '',
      kilos: '',
      date: '',
      time: '',
      note: '',
    });
    setShowSuggestions(false);
  };

  const handleEdit = (a) => {
    setAppointment(a);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    saveAppointments(updated);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Programar Cita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🔍 Buscador de clientes */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={appointment.clientName || ''}
            onChange={(e) => {
              const value = e.target.value;
              setAppointment({ ...appointment, clientName: value });
              const matched = clients.filter((client) =>
                client.name.toLowerCase().includes(value.toLowerCase())
              );
              setFilteredClients(matched);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full border p-2 rounded"
          />
          {showSuggestions && filteredClients.length > 0 && (
            <ul className="absolute z-10 bg-white border mt-1 w-full max-h-48 overflow-y-auto rounded shadow">
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  onClick={() => {
                    setAppointment({
                      ...appointment,
                      clientId: client.id,
                      clientName: client.name,
                    });
                    setShowSuggestions(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {client.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ☕ Tipo de café */}
        <select
          value={appointment.coffeeType}
          onChange={(e) => setAppointment({ ...appointment, coffeeType: e.target.value })}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Selecciona tipo de café</option>
          <option value="seco">Café Seco</option>
          <option value="mojado">Café Mojado</option>
          <option value="oreado">Café Oreado</option>
          <option value="pasilla">Pasilla</option>
          <option value="pasilla-mojada">Pasilla Mojada</option>
          <option value="cascota">Cascota</option>
        </select>

        {/* 🔢 Cantidad de kilos */}
        <input
          type="number"
          placeholder="Cantidad en kilos"
          value={appointment.kilos}
          onChange={(e) => setAppointment({ ...appointment, kilos: parseInt(e.target.value, 10) || '' })}
          required
          className="w-full border p-2 rounded"
        />

        {/* 📅 Fecha */}
        <input
          type="date"
          value={appointment.date}
          onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
          required
          className="w-full border p-2 rounded"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

        {/* ⏰ Hora */}
        <input
          type="time"
          value={appointment.time}
          onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
          required
          className="w-full border p-2 rounded"
        />
        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

        {/* 📝 Nota */}
        <input
          type="text"
          placeholder="Nota (máx 25 caracteres)"
          maxLength={25}
          value={appointment.note}
          onChange={(e) => setAppointment({ ...appointment, note: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {appointment.id ? 'Actualizar' : 'Guardar'} Cita
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Citas Programadas</h3>
      <ul className="space-y-2">
        {appointments.map((a) => (
          <li key={a.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <strong>{a.clientName}</strong> - {a.coffeeType} - {a.kilos}kg<br />
              {a.date} {a.time}
              {a.note && <div className="text-sm text-gray-500">Nota: {a.note}</div>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(a)} className="text-blue-600 hover:underline">Editar</button>
              <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateAppointment;
