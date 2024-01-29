const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Representante = require('./representante')
const Actividad = require("./actividad")
const Periodos = require("./periodos")
const Regimen= require("./regimen")
const  Contacto = require("./contacto")


const Titular = sequelize.define('Titular', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING, // Agregar una coma aquí
    allowNull: false // allowNull defaults to true
  },
  rut: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,

  }



}, {
  timestamps: false,
  freezeTableName: true,

  // Other model options go here
});

Titular.belongsToMany(Representante, { through: 'TitularRepresentante', foreignKey: 'rut_titular',timestamps: false });
Representante.belongsToMany(Titular, { through: 'TitularRepresentante', foreignKey: 'rut_representants',timestamps: false });
Titular.hasOne(Actividad, { foreignKey: 'rut_titular' });
Actividad.belongsTo(Titular, { foreignKey: 'rut_titular' });
Titular.hasOne(Periodos, { foreignKey: 'rut_titular' });
Periodos.belongsTo(Titular, { foreignKey: 'rut_titular' });
Titular.hasOne(Regimen,{foreignKey: 'rut_titular' });
Regimen.belongsTo(Titular, { foreignKey: 'rut_titular' });
Titular.belongsToMany(Contacto,{through: 'ContactoTitular', foreignKey: 'rut_titular' });
Contacto.belongsToMany(Titular, { through: 'ContactoTitular', foreignKey: 'id_contacto' });


  (async () => {
    await sequelize.sync({});
    console.log('Modelo User sincronizado con la base de datos.');
  })();



module.exports = Titular