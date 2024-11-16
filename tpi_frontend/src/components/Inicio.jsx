import { Link } from "react-router-dom";


function Inicio() {
    return (
      <div className="mt-4 p-5 rounded" style={{ backgroundColor: "pink" }}>
        <h1>El Rincón de lo Dulce</h1>
        <p>Esta página está diseñada para la gestión de productos de un comercio de venta de productos dulces.</p>
        <p>
          Los ítems para los empleados son:
          - Productos 
          - Locales 
        </p>
        <p>
          Los ítems para los administradores son:
          - Proveedores 
          - Empleados
        </p>

        <Link to="/productos" className="btn btn-lg btn-primary" style={{backgroundColor: "violet"}}>
          <i className="fa fa-search"> </i>  Ver Productos
        </Link>
        &emsp;
        &emsp;
        <Link to="/proveedores" className="btn btn-lg btn-primary" style={{backgroundColor: "violet"}}>
          <i className="fa fa-search"> </i>  Ver Proveedores
        </Link>
        &emsp;
        &emsp;
        <Link to="/locales" className="btn btn-lg btn-primary" style={{backgroundColor: "violet"}}>
          <i className="fa fa-search"> </i>  Ver Locales
        </Link>
        &emsp;
        &emsp;
        <Link to="/empleados" className="btn btn-lg btn-primary" style={{backgroundColor: "violet"}}>
          <i className="fa fa-search"> </i>  Ver Empleados
        </Link>
        
      </div>

    );
  }
  export { Inicio };
  