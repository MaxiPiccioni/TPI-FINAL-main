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

        <Link to="/productos" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Productos
        </Link>
        <h1> </h1>
        <Link to="/proveedores" className="btn btn-lg btn-primary" style={{backgroundColor: "green"}}>
          <i className="fa fa-search"> </i>  Ver Proveedores
        </Link>
      </div>

    );
  }
  export { Inicio };
  