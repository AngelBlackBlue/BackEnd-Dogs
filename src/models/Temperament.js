const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('Temperament', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        temperament: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, { timestamps: false });

}