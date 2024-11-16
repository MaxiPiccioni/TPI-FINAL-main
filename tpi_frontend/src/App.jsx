import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
import  ModalDialog  from "./components/ModalDialog";
import { Productos } from "./components/productos/Productos";
import { ProductosJWT } from "./components/productosJWT/ProductosJWT";
import RequireAuth from "./components/RequiereAuth" ;
import  Login  from "./login/Login";
import { Proveedores } from "./components/proveedores/Proveedores";
import { Locales } from "./components/locales/Locales";
import { Empleados } from "./components/empleados/Empleados";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog/>
        <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
              <Route path="/productos" element={<Productos/>} />
              <Route path="/productosjwt" element={
              <RequireAuth> <ProductosJWT /> </RequireAuth>}/>
              <Route path="/proveedores" element={<Proveedores/>} />
              <Route path="/locales" element={<Locales/>} />
              <Route path="/empleados" element={<Empleados/>} />
          <Route path="/login/:componentFrom" element={<Login />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
