import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../services/http.service";

export default function EmpleadosRegistro({ AccionABMC, Item, Grabar, Volver }) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: {
    ...Item,
    fecha_nacimiento: Item.fecha_nacimiento.split(" ")[0]
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
          
          {/* campo nombre_empleado*/}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre_empleado">
                Nombre Empleado<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre_empleado", {
                  required: { value: true, message: "Nombre Empleado es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre Empleado debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre Empleado debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.nombre_empleado ? "is-invalid" : "")}
              />
              {errors?.nombre_empleado && touchedFields.nombre_empleado && (
                <div className="invalid-feedback">{errors?.nombre_empleado?.message}</div>
              )}
            </div>
          </div>

          {/* campo sexo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="sexo">
                Sexo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("sexo", {
                  required: { value: true, message: "Sexo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Sexo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Sexo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.sexo ? "is-invalid" : "")}
              />
              {errors?.sexo && touchedFields.sexo && (
                <div className="invalid-feedback">{errors?.sexo?.message}</div>
              )}
            </div>
          </div>

          {/* campo fecha_nacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_nacimiento">
                Fecha Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_nacimiento", {
                  required: { value: true, message: "Fecha de Nacimiento es requerido" },
                })}
                className={"form-control " + (errors?.fecha_nacimiento ? "is-invalid" : "")}
              />
              <div className="invalid-feedback">{errors?.fecha_nacimiento?.message}</div>
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
