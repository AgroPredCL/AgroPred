import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/Home';
import EstadoCuarteles from './pages/EstadoCuarteles';
import Page404 from './pages/Page404';
import Header from './components/Header';
import Recomendation from './components/recomendacion_fertilizantes/Recomendaciones'; //Aquí se importa el componente Recomendation que tiene la sección de recomendaciones de fertilizantes para agregarlo a EstadoCuarteles

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                <Route index element={<HomePage />} />
                <Route path="cuarteles" element={<EstadoCuarteles />} />
                <Route path="*" element={<Page404 />} />
                <Route path="recomendaciones" element={<Recomendation />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
