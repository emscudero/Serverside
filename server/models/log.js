module.exports = (sequelize, DataTypes) => {

    const Log = sequelize.define('log', {
    description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       definitions:{
            type: DataTypes.STRING,
            allowNull: false,
        },
       results:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        /*owner_properties:{
            type: DataTypes.INTEGER,
        }*/
        owner:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

return Log;
};