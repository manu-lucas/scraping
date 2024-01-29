const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TitularRepresentante = sequelize.define('TitularRepresentante', {
    rut_titular: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rut_representants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


  (async () => {
    await sequelize.sync({});
    console.log('Modelo User sincronizado con la base de datos.');
  })();



module.exports = TitularRepresentante