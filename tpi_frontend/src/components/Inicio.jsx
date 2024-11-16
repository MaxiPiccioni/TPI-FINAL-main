import { Link } from "react-router-dom";
import React from "react";

function Inicio() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", fontFamily: "'Roboto', sans-serif", backgroundImage: "url('https://img.freepik.com/foto-gratis/vista-aerea-rosquillas-frescas-fila-sobre-fondo-rosa_23-2147909305.jpg?semt=ais_hybrid')", backgroundSize: "cover" }}>
      <div className="p-5 rounded" style={{ backgroundColor: "pink", width: "900px", height: "600px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold", fontFamily: "'Arial', sans-serif" }}>El Rincón de lo Dulce</h1>
        <p style={{ textAlign: "left" }}>Esta página está diseñada para la gestión de productos de un comercio de venta de productos dulces.</p>
        <p style={{ textAlign: "left" }}>
          Los ítems para los empleados son:
          - Productos 
          - Locales 
        </p>
        <p style={{ textAlign: "left" }}>
          Los ítems para los administradores son:
          - Proveedores 
          - Empleados
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          <Link to="/productos" className="btn btn-lg btn-primary" style={{ backgroundColor: "violet" }}>
            <i className="fa fa-search"> </i> Ver Productos
          </Link>
          <Link to="/proveedores" className="btn btn-lg btn-primary" style={{ backgroundColor: "violet" }}>
            <i className="fa fa-search"> </i> Ver Proveedores
          </Link>
          <Link to="/locales" className="btn btn-lg btn-primary" style={{ backgroundColor: "violet" }}>
            <i className="fa fa-search"> </i> Ver Locales
          </Link>
          <Link to="/empleados" className="btn btn-lg btn-primary" style={{ backgroundColor: "violet" }}>
            <i className="fa fa-search"> </i> Ver Empleados
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Inicio };
