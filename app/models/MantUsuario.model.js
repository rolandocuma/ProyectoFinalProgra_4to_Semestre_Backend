module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, //pensar como hacer que en el login si ese empleado no es admin no podrá ingresar y que salga "este no es un usuario de admin aunque sepa la contraseña de admin"
        nombres_apellidos: {
            type: Sequelize.STRING(160), 
            allowNull: true,
            validate: {
                is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
            } 
        },

        area: {
            type: Sequelize.ENUM('administrador', 'empleado'),
            allowNull: true, 
        },
        // por este lado si se deberia de ingresar la contraseña que es de admin o la contraseña de empleado
        password: {
            type: Sequelize.STRING,
            allowNull: true, 
        },
    });

    return Usuario;
};