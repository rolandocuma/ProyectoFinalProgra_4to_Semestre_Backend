module.exports = (sequelize, Sequelize) => {
    const Empleados = sequelize.define('empleado', {	
        id_empleado: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombres_empleado: {
            type: Sequelize.STRING(80),
            allowNull: false,
        },

        apellidos_empleado: {
            type: Sequelize.STRING(80),
            allowNull: false,
        },

        puesto_laboral: {
            type: Sequelize.STRING(60),
            allowNull: false,
        },

        experiencia_Laboral: {
            type: Sequelize.STRING(60),
            allowNull: true
        },

        edad_empleado: {
            type: Sequelize.INTEGER,
        },

        dpi: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 13,
                max: 13
            }
        },

        fecha_contratacionEmpleado: {
            type: Sequelize.DATE,
            allowNull: false 
        },

        sexo: {
            type: Sequelize.STRING('M', 'F'),
            allowNull: false
        },

        correo_electronico: {
            type: Sequelize.STRING(150),
            allowNull: false, 
        },

        telefono: {
            type: Sequelize.INTEGER,
        },

        direccion: {
            type: Sequelize.STRING(100),
            allowNull: true  // permitir que este campo sea nulo si es necesario
        },

    });

    return Empleados;
}