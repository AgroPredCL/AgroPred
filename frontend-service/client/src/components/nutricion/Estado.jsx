export function Estado({ estado, valor }) {
    const getEstadoStyles = (estado) => {
      switch (estado.toLowerCase()) {
        case 'deficiente':
          return 'bg-yellow-500';
        case 'bajo':
          return 'bg-yellow-300';
        case 'adecuado':
          return 'bg-green-500';
        case 'alto':
          return 'bg-orange-500';
        case 'excesivo':
          return 'bg-red-500';
        default:
          return 'bg-gray-300'; // Default color if estado is not recognized
      }
    };
  
    const estadoStyles = getEstadoStyles(estado);
  
    return (
      <span className={`${estadoStyles} text-white px-2 py-1 rounded`}>
        {valor}
      </span>
    );
  }