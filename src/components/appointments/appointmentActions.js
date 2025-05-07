import localforage from 'localforage';

const APPOINTMENTS_KEY = 'appointments';

// Obtener citas
export const getAppointments = async () => {
  try {
    const appointments = await localforage.getItem(APPOINTMENTS_KEY);
    return appointments || [];
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return [];
  }
};

// Guardar nueva cita
export const saveAppointment = async (appointment) => {
  try {
    const appointments = await getAppointments();
    appointments.push(appointment);
    await localforage.setItem(APPOINTMENTS_KEY, appointments);
  } catch (error) {
    console.error('Error al guardar la cita:', error);
  }
};

// Actualizar cita existente
export const updateAppointment = async (updatedAppointment) => {
  try {
    const appointments = await getAppointments();
    const index = appointments.findIndex((appt) => appt.id === updatedAppointment.id);
    if (index !== -1) {
      appointments[index] = updatedAppointment;
      await localforage.setItem(APPOINTMENTS_KEY, appointments);
    }
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
  }
};

// Eliminar cita
export const deleteAppointment = async (id) => {
  try {
    const appointments = await getAppointments();
    const updatedAppointments = appointments.filter((appt) => appt.id !== id);
    await localforage.setItem(APPOINTMENTS_KEY, updatedAppointments);
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
  }
};
