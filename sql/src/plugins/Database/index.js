import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import models from '../../app/models/index.js';

const Sqldb = fp(async function sqldb(fastify) {

    const sequelize = 
          new Sequelize(
            fastify.config.database.db, 
            fastify.config.database.user, 
            fastify.config.database.password,
            fastify.config.database
          );

    let db = {}

    Object.values(models).forEach(m => {
      const model = m(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    })

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;

    fastify.decorate('sqldb', db);

});

export default Sqldb;
