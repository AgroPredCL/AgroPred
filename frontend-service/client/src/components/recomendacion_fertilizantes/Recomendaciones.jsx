import { useEffect, useState } from 'react';
import { fetchData } from '../../../fetchData'; // Asegúrate de que fetchData maneje las URLs dinámicamente
import { Seccion } from '../UI/Seccion';

const apiUrl = import.meta.env.VITE_API_URL;

const Recomendation = () => {
  const [dataRecomendaciones, setDataRecomendaciones] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await fetchData(`${apiUrl}/recomendacion/fertilizante`);
        setDataRecomendaciones(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar las recomendaciones.</p>;

  return (
    <Seccion titulo='Recomendaciones Fertilizantes'>
      <h2>Recomendaciones para el nitrógeno: {dataRecomendaciones?.nitrogeno}</h2>
      <h2>Recomendaciones para el potasio: {dataRecomendaciones?.potasio}</h2>
      <h2>Recomendaciones para el fósforo: {dataRecomendaciones?.fosforo}</h2>
    </Seccion>
  );
};

export default Recomendation;
