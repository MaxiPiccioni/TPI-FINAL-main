import httpService from "./http.service";
import {config} from "../../config";
const urlResource = config.urlResourceProductos;
// mas adelante podemos usar un archivo de configuracion para el urlResource


async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombre: Nombre, Activo:true, Pagina },
  });

  // TODO: Devolver unicamente resp.data
  // TODO: Agregar campo "activo" al backend
  
  return resp.data.map((item) => ({
    ...item,
    activo: true
  }));
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.id_producto);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.id_producto);
}


async function Grabar(item) {
  if (item.id_producto === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.id_producto, item);
  }
}


export const productosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
