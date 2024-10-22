module.exports = (sequelize, Sequelize) => {
    const Tipo_Habitacion = sequelize.define("tipo_habitaciones", {
        id_tipoHabitacion: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo_habitacion: {
            type: Sequelize.ENUM('simple', 'ejecutiva', 'presidencial')
        },

        descripcion: {
            type: Sequelize.STRING(150),
            validate: {
                is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/i,
                notEmpty: true,
            }
        },
    });
    return Tipo_Habitacion;
};