const formFields = [
  { id: 'nombre_Cuartel', label: 'Nombre del Cuartel', type: 'text' },
  { id: 'area', label: 'Área (m²)', type: 'number' },
  { id: 'marco_plantacion', label: 'Marco de plantación (m²)', type: 'number' },
  { id: 'cant_paltos', label: 'Cantidad de paltos', type: 'number' },
  { id: 'tipo_planta', label: 'Tipo de planta', type: 'text' },
  {
    id: 'factor_area_sombreada',
    label: 'Factor de corrección debido al área sombreada',
    type: 'number',
  },
  {
    id: 'eficiencia_riego',
    label: 'Eficiencia de aplicación de riego',
    type: 'number',
  },
  { id: 'caudal_emisor', label: 'Caudal del emisor (L/h)', type: 'number' },
  {
    id: 'numero_emisores_planta',
    label: 'Número de emisores por planta',
    type: 'number',
  },
  {
    id: 'coeficiente_uniformidad',
    label: 'Coeficiente de Uniformidad',
    type: 'number',
  },
  {
    id: 'retencion_agua_suelo',
    label: 'Capacidad de retención de agua del suelo (mm/mm)',
    type: 'number',
  },
  {
    id: 'profundidad_raices',
    label: 'Profundidad de raíces (m)',
    type: 'number',
  },
  { id: 'umbral_riego', label: 'Umbral de riego', type: 'number' },
  {
    id: 'porcentaje_suelo_emisores',
    label: 'Porcentaje de suelo mojado por los emisores',
    type: 'number',
  },
  {
    id: 'piedras_perfil_suelo',
    label: 'Fracción de piedras presentes en el perfil de suelo',
    type: 'number',
  },
];

export default formFields;
