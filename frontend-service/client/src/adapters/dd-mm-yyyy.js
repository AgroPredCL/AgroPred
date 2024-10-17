// Función para formatear la fecha en "dd-mm-aaaa"
export function formatearFecha(fecha) {
  const dateObj = new Date(fecha);
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = dateObj.getFullYear();
  return `${dia}-${mes}-${anio}`;
}

/**
 * Función para formatear una fecha y hora en "dd mmm, yyyy - HH:MM"
 * @param {Date} fecha - Fecha y hora a formatear.
 * @returns {string} - Fecha formateada como "dd mmm, yyyy - HH:MM".
 */
export function formatearFechaHora(fecha) {
  const dateObj = new Date(fecha);

  // Día
  const dia = String(dateObj.getDate()).padStart(2, '0');

  // Meses en formato abreviado
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const mesAbreviado = meses[dateObj.getMonth()]; // Obtener mes abreviado

  // Año
  const anio = dateObj.getFullYear();

  // Hora y minutos
  const horas = String(dateObj.getHours()).padStart(2, '0');
  const minutos = String(dateObj.getMinutes()).padStart(2, '0');

  // Formatear la fecha y la hora
  return `${dia} ${mesAbreviado}, ${anio} - ${horas}:${minutos}`;
}
