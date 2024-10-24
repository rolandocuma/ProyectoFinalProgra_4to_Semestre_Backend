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
            validate: {
                is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/  
            },
        },

        apellidos_empleado: {
            type: Sequelize.STRING(80),
            allowNull: false,
            validate: {
                is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
            }
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
            validate: {
                min: 18,
                max: 55 
            }
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
            type: Sequelize.ENUM('M', 'F'),
            allowNull: false
        },

        correo_electronico: {
            type: Sequelize.STRING(150),
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true  // valida que el correo electrónico sea valido
            }
        },

        telefono: {
            type: Sequelize.INTEGER,
            validate: {
                min: 10000000,  // valida que el telefono tenga al menos 8 dígitos
                max: 99999999   // valida que el telefono no exceda 8 dígitos
            }
        },

        direccion: {
            type: Sequelize.STRING(100),
            allowNull: true  // permitir que este campo sea nulo si es necesario
        },

    });

    return Empleados;
}