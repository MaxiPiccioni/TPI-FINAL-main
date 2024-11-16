const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const db = require("../base-orm/sequelize-init");
const { Op } = require("sequelize");




// GET para todos los empleados
router.get("/api/empleados", async function (req, res, next) {
  try {
    const { nombre } = req.query;

    let whereCondition = {};

    if (nombre) {
      whereCondition = {
        nombre_empleado: {
          [Op.like]: `%${nombre}%`,
        },
      };
    }

    let data = await db.Empleados.findAll({
      where: whereCondition,
      attributes: ["id_empleado", "nombre_empleado", "sexo", "fecha_nacimiento"],
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});


// GET para los proveedores filtrados por id
router.get("/api/empleados/:id", async function (req, res) {
  try {
    const empleado = await db.Empleados.findByPk(req.params.id);
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en la consulta", error });
  }
});


// POST para crear un nuevo empleado
// En este POST, no se valida el empleado. Se asume que el empleado es único por ID
router.post('/api/empleados/', async (req, res) => {
  const { nombre_empleado, sexo, fecha_nacimiento } = req.body;

  let nuevoEmpleado = {
    nombre_empleado,
    sexo,
    fecha_nacimiento,
  };

  try {
    const empleadoCreado = await db.Empleados.create(nuevoEmpleado);

    res.status(201).json(empleadoCreado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el empleado', error });
  }
});


// PUT para modificar un empleado
router.put('/api/empleados/:id', async (req, res) => {
  const { id } = req.params; 
  const { nombre_empleado, sexo, fecha_nacimiento } = req.body;

  try {
      const empleado = await db.Empleados.findByPk(id);
      
      if (empleado) {
          empleado.nombre_empleado = nombre_empleado;
          empleado.sexo = sexo;
          empleado.fecha_nacimiento = fecha_nacimiento;

          await empleado.save();
          res.json({ message: 'Empleado actualizado', empleado });
      } else {
          res.status(404).json({ message: 'Empleado no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el empleado', error });
  }
});


// DELETE para eliminar un empleado
router.delete('/api/empleados/:id', async (req, res) => {
  const { id } = req.params; 

  try {
      const empleado = await db.Empleados.findByPk(id);
      
      if (empleado) {
          await empleado.destroy();
          res.json({ message: 'Empleado eliminado' });
      } else {
          res.status(404).json({ message: 'Empleado no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el empleado', error });
  }
});


//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/empleadosJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Empleados.findAll({
      attributes: [
        "id_empleado",
        "nombre_empleado",
        "sexo",
        "fecha_nacimiento",
      ],
      order: [["nombre_empleado", "ASC"]],
    });
    res.json(items);
  }
);

module.exports = router;