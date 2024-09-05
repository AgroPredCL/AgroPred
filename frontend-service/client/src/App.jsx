import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/Home';
import EstadoCuarteles from './pages/EstadoCuarteles';
import Page404 from './pages/Page404';
import Header from './components/Header';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                <Route index element={<HomePage />} />
                <Route path="cuarteles" element={<EstadoCuarteles />} />
                <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
