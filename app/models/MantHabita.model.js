module.exports = (sequelize, Sequelize) => {
    const Habitaciones = sequelize.define('habitacion', {	
        id_habitacion: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        disponibilidad: {
            type: Sequelize.ENUM('disponible','ocupado','pendiente'),
            allowNull: false,
        },

        numero_camas: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 3 
            }
        },

        precio_noche: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },

        descuento: {
            type: Sequelize.DECIMAL(5, 2),  // Cambiado a DECIMAL para permitir porcentajes de descuento
            allowNull: true  // permite que este campo sea nulo si no hay descuento
        },

        piso_delaHabitacion: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 10 
            }
        },

        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Habitaciones;
}