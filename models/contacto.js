const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Primer_Contacto = sequelize.define('Primer_Contacto', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true
    },
    id_contacto:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
  },
    phone:{
        type: DataTypes.INTEGER,
        allowNull: true
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



  module.exports=  Primer_Contacto