import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiUsers, FiUser, FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ cerrarSesion, closeSidebar }) => {
  return (
    <div className="sidebar fixed bg-white h-screen w-64 transition-all duration-300 ease-in-out">
      <div className="p-4">
        <h1 className="font-bold text-2xl text-sky-700 mb-4 text-center">
          Administrador de Pacientes{" "}
        </h1>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/admin"
              className="text-gray-800 text-sm uppercase font-bold flex items-center"
              onClick={closeSidebar}
            >
              <FiUsers className="mr-2" /> Pacientes
            </Link>
          </li>
          <li>
            <Link
              to="/admin/perfil"
              className="text-gray-800 text-sm uppercase font-bold flex items-center"
              onClick={closeSidebar}
            >
              <FiUser className="mr-2" /> Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/admin/listado"
              className="text-gray-800 text-sm uppercase font-bold flex items-center"
              onClick={closeSidebar}
            >
              <FiUser className="mr-2" /> Listado Pacientes
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="text-gray-800 text-sm uppercase font-bold flex items-center"
              onClick={() => {
                cerrarSesion();
                closeSidebar();
              }}
            >
              <FiLogOut className="mr-2" /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Header = () => {
  const { cerrarSesion } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="bg-indigo-600">
      <header className="container mx-auto py-4 px-8">
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-white text-sm"
            onClick={toggleSidebar}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="font-bold text-2xl text-indigo-200">
            Administrador de Pacientes de{" "}
            <span className="text-white font-black">Veterinaria</span>
          </h1>
          {/* Agrega cualquier otro contenido que desees en la parte derecha */}
        </div>
      </header>
      {sidebarOpen && (
        <Sidebar cerrarSesion={cerrarSesion} closeSidebar={closeSidebar} />
      )}
    </div>
  );
};

export default Header;
