module.exports = (sequelize, Sequelize) => {
    const TipoProdServ = sequelize.define("tipoProdServicio", {
        id_tipoProdServ: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productos: {
            type: Sequelize.ARRAY(Sequelize.ENUM('kit_higiene', 'kit_accesiorios_y_confort_Premium', 'set_gourmet_vinos')),
            allowNull: false,
        },
        servicios: {
            type: Sequelize.ARRAY(Sequelize.ENUM('servicio_bar', 'servicio_spa', 'servicio_entretenimiento', 'servicio_comida', 'servicio_wifi')),
            allowNull: false,
        },
    });
    return TipoProdServ;
};