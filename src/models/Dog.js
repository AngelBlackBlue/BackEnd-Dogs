const { DataTypes, UUIDV4 } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,

    },
    image: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    years: {
      type: DataTypes.STRING(),
      allowNull: false,
    }

  }, { timestamps: false });

};
