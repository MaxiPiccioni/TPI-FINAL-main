import React, { useState, useEffect } from "react";
import moment from "moment";
import modalDialogService from "../services/modalDialog.service";
import ProveedoresBuscar from "./ProveedoresBuscar";
import ProveedoresListado from "./ProveedoresListado";
import ProveedoresRegistro from "./ProveedoresRegistro";
import { proveedoresService } from "../services/proveedores.service";

function Proveedores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    Buscar(Pagina); // La función 'Buscar' manejará la lógica de paginación y búsqueda
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await proveedoresService.Buscar(Nombre, null, _pagina);

    modalDialogService.BloquearPantalla(false);

    setItems(data);
    setRegistrosTotal(data.length);

    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await proveedoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(proveedor) {
    BuscarPorId(proveedor, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(proveedor) {
    if (!proveedor.activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(proveedor, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        id_proveedor: 0,
        nombre_empresa: "",
        nombre_proveedor: "",
        telefono: "",
        fecha_registro: moment().format("YYYY-MM-DD"),
        
    });
    alert("preparando el Alta...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " + (item.Activo ? "desactivar" : "activar") + " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await proveedoresService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await proveedoresService.Grabar(item);
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert("Registro " + (AccionABMC === "A" ? "agregado" : "modificado") + " correctamente.");
    }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="container">
        <div className="tituloPagina">
          Proveedores <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>

        {AccionABMC === "L" && (
          <ProveedoresBuscar
            Nombre={Nombre}
            setNombre={setNombre}
            Activo={Activo}
            setActivo={setActivo}
            Buscar={Buscar}
            Agregar={Agregar}
          />
        )}
        {AccionABMC === "L" && Items?.length > 0 && (
          <ProveedoresListado
            Items={Items}
            Consultar={Consultar}
            Modificar={Modificar}
            ActivarDesactivar={ActivarDesactivar}
            RegistrosTotal={RegistrosTotal}
            Buscar={Buscar}
            Paginas={Paginas}
            Pagina={Pagina}
          />
        )}
        {AccionABMC === "L" && Items?.length === 0 && (
          <div className="alert alert-info mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            No se encontraron registros...
          </div>
        )}

        {/* Formulario de alta/modificacion/consulta */}
        {(AccionABMC === "A" || AccionABMC === "M") && (
          <ProveedoresRegistro {...{ AccionABMC, Item, Grabar, Volver }} />
        )}
      </div>
    </div>
  );
}
export { Proveedores };
