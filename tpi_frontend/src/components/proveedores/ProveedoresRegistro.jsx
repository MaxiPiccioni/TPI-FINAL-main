import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../services/http.service";

export default function ProveedoresRegistro({ AccionABMC, Item, Grabar, Volver }) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: {
    ...Item,
    fecha_registro: Item.fecha_registro.split(" ")[0]
  } });
  const onSubmit = (data) => {
    Grabar(data);
  };

  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    getAllProveedores();
  }, []);

  // TODO: Llevar a un servicio aparte (proveedores.service.js)
  const getAllProveedores = async () => {
    try {
      const response = await httpService.get("http://localhost:3000/api/proveedores", {
        params: {},
      });

      setProveedores(response.data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!");
    }
  };

  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          
          {/* campo nombre empresa*/}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre_empresa">
                Nombre Empresa<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre_empresa", {
                  required: { value: true, message: "Nombre Empresa es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre Empresa debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre Empresa debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.nombre_empresa ? "is-invalid" : "")}
              />
              {errors?.nombre_empresa && touchedFields.nombre_empresa && (
                <div className="invalid-feedback">{errors?.nombre_empresa?.message}</div>
              )}
            </div>
          </div>

          {/* campo nombre proveedor */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre_proveedor">
                Nombre Proveedor<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre_proveedor", {
                  required: { value: true, message: "Nombre Proveedor es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre Proveedor debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre Proveedor debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.nombre_proveedor ? "is-invalid" : "")}
              />
              {errors?.nombre_proveedor && touchedFields.nombre_proveedor && (
                <div className="invalid-feedback">{errors?.nombre_proveedor?.message}</div>
              )}
            </div>
          </div>

            {/* campo telefono */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="telefono">
                Telefono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("telefono", {
                  required: { value: true, message: "Telefono es requerido" },
                  minLength: {
                    value: 4,
                    message: "Telefono debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 15,
                    message: "Telefono debe tener como máximo 15 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.telefono ? "is-invalid" : "")}
              />
              {errors?.telefono && touchedFields.telefono && (
                <div className="invalid-feedback">{errors?.telefono?.message}</div>
              )}
            </div>
          </div>

          {/* campo fecha_registro */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_registro">
                Fecha Registro<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_registro", {
                  required: { value: true, message: "Fecha de Registro es requerido" },
                })}
                className={"form-control " + (errors?.fecha_registro ? "is-invalid" : "")}
              />
              <div className="invalid-feedback">{errors?.fecha_registro?.message}</div>
            </div>
          </div>


          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select {...register("Activo")} className="form-control" disabled>
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button type="button" className="btn btn-warning" onClick={() => Volver()}>
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}
