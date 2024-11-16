import React, { useState, useEffect } from "react";
import moment from "moment";
import modalDialogService from "../services/modalDialog.service";
import LocalesBuscar from "./LocalesBuscar";
import LocalesListado from "./LocalesListado";
import LocalesRegistro from "./LocalesRegistro";
import { localesService } from "../services/locales.service";

function Locales() {
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
    const data = await localesService.Buscar(Nombre, null, _pagina);

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
    const data = await localesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(local) {
    BuscarPorId(local, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(local) {
    if (!local.activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(local, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        id_local : 0,
        nombre_loc : "",
        direccion : "",
        telefono : "",
        fecha_apertura : moment().format("YYYY-MM-DD"),
        id_empleado : 0,     
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
        await localesService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await localesService.Grabar(item);
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
          Locales <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>

        {AccionABMC === "L" && (
          <LocalesBuscar
            Nombre={Nombre}
            setNombre={setNombre}
            Activo={Activo}
            setActivo={setActivo}
            Buscar={Buscar}
            Agregar={Agregar}
          />
        )}
        {AccionABMC === "L" && Items?.length > 0 && (
          <LocalesListado
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
          <LocalesRegistro {...{ AccionABMC, Item, Grabar, Volver }} />
        )}
      </div>
    </div>
  );
}
export { Locales };
