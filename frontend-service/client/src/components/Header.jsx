import { Outlet, Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isActive = (path) => {
      return location.pathname === path ? "text-pred border-b-2 border-b-pred" : "text-gray-700";
  };

  return(
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex-shrink-0 flex items-center">
            <img src="/Logo-horizontal.png" alt="AgroPred Logo" className="h-10 ml-2" />
          </div>
            <nav className="flex-grow flex justify-center">
              <Link to="/" className={`${isActive("/")} mx-2 hover:text-pred`}>Inicio</Link>
              <Link to="/cuarteles" className={`${isActive("/cuarteles")} mx-2 hover:text-pred`}>Estado Cuarteles</Link>
              <Link to="/" className="mx-2 hover:text-pred">Gestión Predio</Link>
              <Link to="/" className="mx-2 hover:text-pred">Gestión Empleados</Link>
              <Link to="/" className="mx-2 hover:text-pred">Soporte</Link>
            </nav>
          </div>
        </header>

      <Outlet />
    </>
    
  );
}

export default Header;
