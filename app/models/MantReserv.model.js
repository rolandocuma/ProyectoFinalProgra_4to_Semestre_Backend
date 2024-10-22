module.exports = (sequelize, Sequelize) => {
  const Reservas = sequelize.define('reserva', {	
      id_reserva: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },

      nombres_reserva: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
              is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/  // valida solo letras con acentos, la ñ, y espacios
          }
      },

      apellidos_reserva: {
          type: Sequelize.STRING(80),
          allowNull: false,  // Asegura que el campo no sea nulo
          validate: {
              is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
          }
      },

      sexo: {
          type: Sequelize.ENUM('M', 'F'),
          allowNull: false
      },

      correo_electronico: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: true,  // valida que el correo electrónico sea unico
          validate: {
              isEmail: true  // valida que el correo electrónico sea válido
          }
      },

      telefono: {
          type: Sequelize.INTEGER,
          validate: {
              min: 10000000,  // Asegura que el teléfono tenga al menos 8 dígitos 
              max: 99999999   // Asegura que el teléfono no pase de 8 dígitos
          }
      },

      dpi: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
            len: [13, 13]
        }
    },


      tipo_habitacion: {
        type: Sequelize.ENUM('simple', 'ejecutiva', 'presidencial')
    },

      num_viajeros: {
          type: Sequelize.INTEGER,
          validate: {
              min: 1,    // valor mínimo
              max: 10    // vlor máximo de 10
          }
      },

      fecha_entrada: {
          type: Sequelize.DATE,
          allowNull: false
      },

      fecha_salida: {
          type: Sequelize.DATE,
          allowNull: false
      },

      tipo_pago: {
          type: Sequelize.INTEGER,
          validate: {
              isIn: [[1, 2]]  // 1=efectivo y 2=tarjeta
          }
      },

      copyrightby: {
          type: Sequelize.STRING,
          defaultValue: 'UMG Antigua'
      }
  });

  return Reservas;
}