const express = require("express");
const router = express.Router()
const { writeFileSync } = require("fs");  // Agrega esta línea para importar writeFileSync
// const Titular = require("../models/titular");
// const Representante = require("../models/representante")
// const Actividad = require("../models/actividad")
// const Periodos = require("../models/periodos.js")
// const sequelize = require("../config/db");
const runAllUsers = require("../modules/main.js")

router.post("/", async (req, res) => {
  const { rut, password } = req.body;
  const number= Number.parseInt(rut)
  
  /* -----*/
  const data = await runAllUsers(rut, password)
    res.status(200).json(data);
  /* -------- */
  // const titular = await Titular.findOne({ where: { rut:  number } });
  // if (titular) {
  //   const titularWithRepresentante = await Titular.findOne({
  //     where: {
  //       rut: number
  //     },
  //     include: [
  //       {
  //         model: Representante,
         
  //         // Puedes agregar atributos específicos de Representante que deseas incluir
  //         // attributes: ['name', 'otroAtributo']
  //       },
  //       {
  //         model: Actividad
  //       },
  //     { model:Periodos

  //     }
  //     ]
  //   });
  //   console.log('E',titularWithRepresentante.toJSON());

  // } else {
  //   console.log('El titular no está en la base de datos. Puedes crearlo.');
    

  // }
  
  /* -------- */

  //  const imagen= data[3].screenshot;

  //  const filePath = 'screenshot.png';
  //  writeFileSync(filePath, imagen, 'base64');

});



module.exports = router