export function Estado({ estado, valor }) {
    const getEstadoStyles = (estado) => {
      switch (estado.toLowerCase()) {
        case 'deficiente':
          return 'bg-deficiente';
        case 'bajo':
          return 'bg-bajo';
        case 'adecuado':
          return 'bg-adecuado';
        case 'alto':
          return 'bg-alto';
        case 'excesivo':
          return 'bg-excesivo';
        default:
          return 'bg-gray-300'; // Color por defecto si estado no es reconocido
      }
    };
  
    const estadoStyles = getEstadoStyles(estado);
  
    return (
      <span className={`${estadoStyles} text-white px-2 py-1 rounded`}>
        {valor}
      </span>
    );
  }