const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contacto_Titular = sequelize.define('ContactoTitular', {
    whatssapp:{ 
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    email:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },

    rut_titular: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_contacto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


  (async () => {
    await sequelize.sync({});
    console.log('Modelo User sincronizado con la base de datos.');
  })();



module.exports = Contacto_Titular