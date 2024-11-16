import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../services/http.service";

export default function LocalesRegistro({ AccionABMC, Item, Grabar, Volver }) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: {
    ...Item,
    fecha_apertura: Item.fecha_apertura.split(" ")[0]
  } });
  const onSubmit = (data) => {
    Grabar(data);
  };

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    getAllEmpleados();
  }, []);

  // TODO: Llevar a un servicio aparte (proveedores.service.js)
  const getAllEmpleados = async () => {
    try {
      const response = await httpService.get("http://localhost:3000/api/empleados", {
        params: {},
      });

      setEmpleados(response.data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!");
    }
  };

  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre_loc */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre_loc">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre_loc", {
                  required: { value: true, message: "Nombre Local es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre Local debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre Local debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.nombre_loc ? "is-invalid" : "")}
              />
              {errors?.nombre_loc && touchedFields.nombre_loc && (
                <div className="invalid-feedback">{errors?.nombre_loc?.message}</div>
              )}
            </div>
          </div>

          {/* campo Direccion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="direccion">
                Direccion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("direccion", {
                  required: { value: true, message: "Direccion es requerida" },
                  minLength: {
                    value: 4,
                    message: "Direccion debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Direccion debe tener como máximo 55 caracteres",
                  },
                })}
                className={"form-control " + (errors?.direccion ? "is-invalid" : "")}
              />
              <div className="invalid-feedback">{errors?.direccion?.message}</div>
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

          {/* campo fecha_apertura */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_apertura">
                Fecha Apertura<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_apertura", {
                  required: { value: true, message: "Fecha de Apertura es requerido" },
                })}
                className={"form-control " + (errors?.fecha_apertura ? "is-invalid" : "")}
              />
              <div className="invalid-feedback">{errors?.fecha_apertura?.message}</div>
            </div>
          </div>

          {/* campo id_empleado */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="id_empleado">
                ID Empleado<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("id_empleado", {
                  required: { value: true, message: "ID del empleado es requerido" },
                })}
                className={"form-control " + (errors?.id_empleado ? "is-invalid" : "")}
              >
                <option value="" key={1}></option>
                {empleados?.map((x) => (
                  <option value={x.id_empleado} key={x.id_empleado}>
                    {x.id_empleado}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors?.id_empleado?.message}</div>
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
