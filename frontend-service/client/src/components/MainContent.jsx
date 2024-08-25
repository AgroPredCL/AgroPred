import React from 'react';
import NutritionalPrediction from './NutritionalPrediction.jsx';
import HealthStatus

from './HealthStatus.jsx';
const MainContent = () => {
  return (
    <main className="flex-1 p-4">
      <HealthStatus />
        <NutritionalPrediction />
    </main>
  );
};

export default MainContent;

