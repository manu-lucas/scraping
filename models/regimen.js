const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Regimen_Tributario = sequelize.define('Regimen_Tributario', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contabilidad:{
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    // Other model options go here
  });

  
(async () => {
  await sequelize.sync({});
  console.log('Modelo User sincronizado con la base de datos.');
})();



  module.exports=  Regimen_Tributario